const router = require("express").Router();
const productRouter = require("./products");
const categoriesRouter = require("./categories");

router.use("/products", productRouter);
router.use("/categories", categoriesRouter);

module.exports = router;
