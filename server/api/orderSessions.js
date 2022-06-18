const router = require("express").Router();
const {
  models: { OrderSession },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orderSessions = await OrderSession.findAll();
    res.json(orderSessions);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const orderSession = await OrderSession.findOne({
      where: { userId: req.params.userId },
    });
    res.json(orderSession);
  } catch (err) {
    next(err);
  }
});

// router.put("/:userId", async (req, res, next) => {
//   try {
//     const shoppingcart = await ShoppingCart.findOne({
//       where: { userId: req.params.userId },
//     });
//     await shoppingcart.update(req.body);
//     res.json(shoppingcart);
//   } catch (error) {
//     next(error);
//   }
// });
