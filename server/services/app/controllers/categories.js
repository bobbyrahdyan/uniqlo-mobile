const { Category, sequelize } = require("../models");

class Controller {
  static async getCategory(req, res, next) {
    try {
      const getCategory = await Category.findAll({
        order: [["updatedAt", "DESC"]],
      });

      res.status(200).json(getCategory);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { body } = req;

      const addCategory = await Category.create(body);

      res.status(201).json({
        message: `Success create category ${addCategory.name}`,
        data: addCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;

      await sequelize.transaction(async (t) => {
        const findCategory = await Category.findByPk(id, { transaction: t });

        if (!findCategory) {
          throw { name: "Not found" };
        }

        await Category.update(body, { where: { id }, transaction: t });

        const findNewCategory = await Category.findByPk(id, { transaction: t });

        res
          .status(200)
          .json({ message: `Category updated`, data: findNewCategory });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      await sequelize.transaction(async (t) => {
        const findCategory = await Category.findByPk(id, { transaction: t });

        if (!findCategory) {
          throw { name: "Not found" };
        }

        await Category.destroy({ where: { id }, transaction: t });

        res.status(200).json({ message: `Success delete category ${findCategory.name}` });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
