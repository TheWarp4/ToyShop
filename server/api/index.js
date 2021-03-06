const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/shoppingcarts", require("./shoppingcarts"));
router.use("/ordersessions", require("./orderSessions"));

router.use((req, res, next) => {
  console.log("Express Error Handling");
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
