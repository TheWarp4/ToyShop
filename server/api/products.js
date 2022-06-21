const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

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
    if (+req.params.id >= 0) {
      const singleProduct = await Product.findByPk(req.params.id);
      res.json({ singleProduct });
    } else {
      const filteredProducts = await Product.findAll({
        where: {
          category: req.params.id,
        },
      });
      res.json({ filteredProducts });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await Product.create(req.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.update(req.body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
