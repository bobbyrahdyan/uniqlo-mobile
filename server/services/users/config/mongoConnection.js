const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://bobbyrahdyan:12345@cluster0.t9tdchi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let mongodb;

async function connectMongo() {
  try {
    const db = client.db("uniqlo_db");
    mongodb = db;
    return db;
  } catch (error) {
    console.log(error);
  }
}

function getdb() {
  return mongodb;
}

module.exports = {
  connectMongo,
  getdb,
};
