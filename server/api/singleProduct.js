const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router


router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id);
    res.json({singleProduct});

  }
  catch (err) {
    next(err)
  }
})
