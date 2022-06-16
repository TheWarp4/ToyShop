//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const ShoppingCart = require('./models/ShoppingCart')
const CartSession = require('./models/CartSession')


// ASSOCIATIONS:
User.hasOne(ShoppingCart)
ShoppingCart.belongsTo(User)

Product.hasMany(ShoppingCart)
ShoppingCart.belongsTo(Product)

CartSession.belongsTo(ShoppingCart)
ShoppingCart.hasOne(CartSession)


module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart,
    CartSession
  },
}
