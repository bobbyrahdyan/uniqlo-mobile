const router = require("express").Router();
const userRouter = require("./user");
const appRouter = require("./app");

router.use("/users", userRouter);
router.use("/app", appRouter);

module.exports = router;
