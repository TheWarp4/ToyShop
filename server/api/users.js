const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
        attributes: ['id', 'username', 'email',]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.userId)
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})

<<<<<<< HEAD
router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
=======
router.put('/:userId', async (req, res, next) => {
  try {
    console.log("USERID: ",req.params.userId, "BODY: ", req.body)
    const singleUser = await User.update(req.body, {where: {id: req.params.userId}})
    res.json(singleUser)
  } catch (err) {
    next(err)
  }
})
>>>>>>> b9c83bab50f47b72fcf98fa6d1aa2ce64ad531d0

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
