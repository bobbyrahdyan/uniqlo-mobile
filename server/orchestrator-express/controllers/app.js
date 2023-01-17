const axios = require("axios");
const Redis = require("ioredis");
const baseUrl = "http://localhost:4002/products";

const redis = new Redis({
    host: "redis-19863.c295.ap-southeast-1-1.ec2.cloud.redislabs.com",
    port: 19863,
    password: "BhWyYUYSgtYQCAFuNLvTF1I4IjZs7gqh",
});

class Controller {
  static async createProduct(req, res, next) {
    try {
      const { body } = req;
      const { data } = await axios.post(baseUrl, body);

      const productsCache = await redis.get("products");
      if (productsCache) {
        const cache = JSON.parse(productsCache);
        cache.push(data.data);
        await redis.set("products", JSON.stringify(cache));
      }

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readProducts(req, res, next) {
    try {
      const productsCache = await redis.get("products");
      if (productsCache) {
        // console.log('ini dari cache');
        const data = JSON.parse(productsCache, null, 2);
        res.status(200).json(data);
        return;
      }
    //   console.log('ini dari database')
      const { data } = await axios.get(baseUrl);
      await redis.set("products", JSON.stringify(data));
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readProductDetail(req, res, next) {
    try {
      const { id } = req.params;
      const productsCache = await redis.get("products");
      let data = {};
      if (productsCache) {
        // console.log('ini dari cache');
        data = JSON.parse(productsCache).filter((el) => el.id === +id)[0];
      } else {
        // console.log('ini dari database')
        const readProductDetail = await axios.get(baseUrl + "/" + id);
        data = readProductDetail.data;
      }
      const { authorId } = data;
      const { data: user } = await axios.get(
        "http://localhost:4001" + "/" + authorId
      );
      data.User = user.data;
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const { data } = await axios.put(baseUrl + "/" + id, body);
      const productsCache = await redis.get("products");
      if (productsCache) {
        const cache = JSON.parse(productsCache);
        const idx = cache.map((el) => el.id).indexOf(+id);
        console.log(idx);
        for (const key in data.data) {
          cache[idx][key] = data.data[key];
        }
        await redis.set("products", JSON.stringify(cache));
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.delete(baseUrl + "/" + id);

      const productsCache = await redis.get("products");
      if (productsCache) {
        const cache = JSON.parse(productsCache).filter((el) => el.id !== +id);
        await redis.set("products", JSON.stringify(cache));
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
