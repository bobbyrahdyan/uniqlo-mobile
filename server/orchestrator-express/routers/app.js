const router = require("express").Router();
const Controller = require("../controllers/app");

router.post("/", Controller.createProduct);
router.get("/", Controller.readProducts);
router.get("/:id", Controller.readProductDetail);
router.put("/:id", Controller.updateProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
