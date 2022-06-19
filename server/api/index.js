const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/shoppingcarts", require("./shoppingcarts"));

router.use((req, res, next) => {
  console.log(req.body)
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
