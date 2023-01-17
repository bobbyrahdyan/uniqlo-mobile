const { MongoClient } = require("mongodb");
const { hashPass } = require("../helpers/bcrypt");
const uri =
  "mongodb+srv://bobbyrahdyan:12345@cluster0.t9tdchi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db("uniqlo_db");
const cmd = process.argv[2];

async function seedUser() {
  try {
    const Users = db.collection("Users");
    const data = require("../data.json").Users.map((el) => {
      delete el.id;
      el.password = hashPass(el.password);
      return {
        ...el,
      };
    });

    const insertUser = await Users.insertMany(data);
    console.log(insertUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

async function deleteUser() {
  try {
    const Users = db.collection("Users");
    const deleteUser = await Users.deleteMany({});
    console.log(deleteUser);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

switch (cmd) {
  case "undo":
    deleteUser();
    break;

  default:
    seedUser();
    break;
}
