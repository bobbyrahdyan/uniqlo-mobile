const { hashPass } = require("../helpers/bcrypt");
const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { body } = req;
      body.password = hashPass(body.password);
      const register = await User.create(body);
      res.status(201).json({
        data: register,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAllUser(req, res, next) {
    try {
      const findAllUser = await User.findAll({
        projection: { password: 0 },
      });
      res.status(200).json({ data: findAllUser });
    } catch (error) {
      next(error);
    }
  }

  static async findIdUser(req, res, next) {
    try {
      const { id } = req.params;
      const findIdUser = await User.findByPk(id, {
        projection: { _id: 0, username: 1 },
      });
      res.status(200).json({ data: findIdUser });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const findIdUser = await User.destroy(id);
      res.status(200).json({ data: findIdUser });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
