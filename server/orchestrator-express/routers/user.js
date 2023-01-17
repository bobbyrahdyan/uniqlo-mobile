const router = require("express").Router();
const Controller = require("../controllers/user");

router.post("/", Controller.createUser);
router.get("/", Controller.readAllUser);
router.get("/:id", Controller.readIdUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
