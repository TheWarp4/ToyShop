const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
const {
  requireToken,
  requireTokenForPutAndPostMethods,
  isUserAdmin,
} = require("./gatekeepingMiddleWare");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.json({ singleProduct });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  requireTokenForPutAndPostMethods,
  isUserAdmin,
  async (req, res, next) => {
    try {
      await Product.create(req.body.product);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:productId",
  requireToken,
  isUserAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:productId",
  requireTokenForPutAndPostMethods,
  isUserAdmin,
  async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.update(req.body.product);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
