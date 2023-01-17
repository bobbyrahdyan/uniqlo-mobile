const { getdb } = require("../config/mongoConnection");
const { ObjectId } = require("mongodb");

class User {
  static collection() {
    const db = getdb();
    const users = db.collection("Users");
    return users;
  }

  static async create(body) {
    const result = await this.collection().insertOne(body);
    return result;
  }

  static async findAll(option) {
    const result = await this.collection()
      .find(null, option)
      .map((el) => {
        return el;
      })
      .toArray();
    return result;
  }

  static async findByPk(_id, option) {
    _id = new ObjectId(_id);
    const result = await this.collection().findOne({ _id }, option);
    return result;
  }

  static async destroy(_id) {
    _id = new ObjectId(_id);
    const result = await this.collection().deleteOne({ _id });
    return result;
  }
}

module.exports = { User };
