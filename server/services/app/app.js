require('dotenv').config()
const express = require("express");
const cors = require("cors");
const router = require("./routers");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const port = process.env.PORT || 4002;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandler);

app.listen(port, () => console.log("listening to port", port));
