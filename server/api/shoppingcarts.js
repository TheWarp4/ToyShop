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

router.post("/", async (req, res, next) => {
  try {
    const shoppingcarts = await ShoppingCart.findAll();
    res.json(shoppingcarts);
  } catch (err) {
    next(err);
  }
});
