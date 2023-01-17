const express = require("express");
const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const port = 4000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => console.log("listen to port", port));
