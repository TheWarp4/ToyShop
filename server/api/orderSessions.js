const router = require("express").Router();
const {
  models: { OrderSession, User },
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
      where: { userId: req.params.userId, status: 'open' },
    });
    res.json(orderSession);
  } catch (err) {
    next(err);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const orderSession = await OrderSession.findOne({
      where: { userId: req.params.userId, status: 'open'  },
    });
    await orderSession.update(req.body)
    res.json(orderSession);
  } catch (err) {
    next(err);
  }
});

router.post("/:userId", async (req, res, next) => {
  try {
    const newOrderSession = await OrderSession.create();
    const user = await User.findByPk(req.params.userId);
    await user.addOrderSession(newOrderSession)
    res.json(newOrderSession);
  } catch (err) {
    next(err);
  }
});

