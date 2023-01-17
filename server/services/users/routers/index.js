const router = require("express").Router();
const Controller = require("../controllers");

router.post("/register", Controller.register);
router.get("/", Controller.findAllUser);
router.get("/:id", Controller.findIdUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
