const router = require("express").Router();
const {
  models: { User, OrderSession, ShoppingCart, Product },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleWare");
module.exports = router;

router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "createdAt", "imageUrl"],
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", requireToken, async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId);
    res.json(singleUser);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId/orderHistory", async (req, res, next) => {
  try {
    const orderHistory = await User.findOne({
      where: {
        id: req.params.userId,
      },
      include: [
        {
          model: OrderSession,
          where: {
            status: "completed",
          },
          include: {
            model: Product,
          },
        },
      ],
    });
    if (!orderHistory) {
      res.json([]);
      return;
    }
    res.json(orderHistory.orderSessions);
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// router.get('/:userid/shoppingCart', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'username']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })
