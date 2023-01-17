const router = require("express").Router();
const Controller = require("../controllers/categories");

router.get("/", Controller.getCategory);
router.post("/", Controller.addCategory);
router.put("/:id", Controller.updateCategory);
router.delete("/:id", Controller.deleteCategory);

module.exports = router;
