const { User, Product, Image, Category, sequelize } = require("../models");

class Controller {
  static async getProducts(req, res, next) {
    try {
      const getProducts = await Product.findAll({
        include: [Category, Image],
        order: [["updatedAt", "DESC"]],
      });

      res.status(200).json(getProducts);
    } catch (error) {
      next(error);
    }
  }

  static async getProductDetail(req, res, next) {
    try {
      const { id } = req.params;
      const getProductsDetail = await Product.findByPk(id, {
        include: [Category, Image],
      });

      if (!getProductsDetail) {
        throw { name: "Not found" };
      }

      res.status(200).json(getProductsDetail);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { product, images } = req.body;

      await sequelize.transaction(async (t) => {
        const addProduct = await Product.create(product, { transaction: t });

        if (images) {
          const bulkImg = images.map((el) => ({
            ...el,
            productId: addProduct.id,
          }));

          await Image.bulkCreate(bulkImg, { transaction: t });
        }

        const findProducts = await Product.findByPk(addProduct.id, {
          include: [Category, Image],
          transaction: t,
        });

        res.status(201).json({
          message: `Success create new product ${addProduct.name}`,
          data: findProducts,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { product, images } = req.body;

      await sequelize.transaction(async (t) => {
        const findProducts = await Product.findByPk(id, { transaction: t });

        if (!findProducts) {
          throw { name: "Not found" };
        }

        await Product.update(product, { where: { id }, transaction: t });

        if (images) {
          const bulkImg = images.map((el) => ({
            ...el,
            productId: id,
          }));
          
          await Image.bulkCreate(bulkImg, {
            updateOnDuplicate: ["id", "imgUrl"],
            transaction: t,
          });
        }

        const findNewProducts = await Product.findByPk(id, {
          include: [Category, Image],
          transaction: t,
        });

        res.status(200).json({
          message: `Success update product`,
          data: findNewProducts,
        });
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      await sequelize.transaction(async (t) => {
        const findProduct = await Product.findByPk(id, { transaction: t });

        if (!findProduct) {
          throw { name: "Not found" };
        }

        await Image.destroy({ where: { productId: id }, transaction: t });
        await Product.destroy({ where: { id }, transaction: t });

        res.status(200).json({ message: `Success delete product ${findProduct.name}` });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
