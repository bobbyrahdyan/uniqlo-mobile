const axios = require("axios");
const Redis = require("ioredis");
const baseUrl = "http://localhost:4001";

const redis = new Redis({
    host: "redis-19863.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 19863,
    password: "BhWyYUYSgtYQCAFuNLvTF1I4IjZs7gqh",
});
class Controller {
  static async createUser(req, res, next) {
    try {
      const { body } = req;
      const { data } = await axios.post(baseUrl + "/register", body);
      const userCache = await redis.get("users");
      if (userCache) {
        const cache = JSON.parse(userCache);
        const { email, password, phoneNumber, address } = body;
        cache.push({
          _id: data.data.insertedId,
          email,
          password,
          phoneNumber,
          address,
        });
        await redis.set("users", JSON.stringify(cache));
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readAllUser(req, res, next) {
    try {
      const userCache = await redis.get("users");
      if (userCache) {
        // console.log('ini dari cache');
        const data = JSON.parse(userCache, null, 2);
        res.status(200).json(data);
        return;
      }
    //   console.log('ini dari database')
      const { data } = await axios.get(baseUrl);
      await redis.set("users", JSON.stringify(data.data));
      res.status(200).json(data.data);
    } catch (error) {
      next(error);
    }
  }

  static async readIdUser(req, res, next) {
    try {
      const { id } = req.params;
      const userCache = await redis.get("users");
      let data = {};
      if (userCache) {
        // console.log('ini dari cache');
        data = JSON.parse(userCache).filter((el) => el._id === id)[0];
      } else {
        // console.log('ini dari database')
        const readIdUser = await axios.get(baseUrl + "/" + id);
        data = readIdUser.data;
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(baseUrl + "/" + id);
      const userCache = await redis.get("users");
      if (userCache) {
        const cache = JSON.parse(userCache).filter((el) => el._id !== id);
        await redis.set("users", JSON.stringify(cache));
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
