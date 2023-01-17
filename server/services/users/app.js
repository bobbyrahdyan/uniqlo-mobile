const express = require("express");
const { connectMongo } = require("./config/mongoConnection");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routers");
const app = express();
const port = process.env.PORT || 4001;

connectMongo().then(() => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(router);
  app.use(errorHandler);

  app.listen(port, () => console.log("listen to port", port));
});
