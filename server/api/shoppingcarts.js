const router = require("express").Router();
const {
  models: { ShoppingCart },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const shoppingcarts = await ShoppingCart.findAll();
    res.json(shoppingcarts);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const shoppingcart = await ShoppingCart.findOne({
      where: { userId: req.params.userId },
    });
    res.json(shoppingcart);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const shoppingcart = await ShoppingCart.findOne({
      where: { userId: req.params.userId },
    });
    await shoppingcart.update(req.body);
    res.json(shoppingcart);
  } catch (error) {
    next(error);
  }
});
