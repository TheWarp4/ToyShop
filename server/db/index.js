//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/Product')
const ShoppingCart = require('./models/ShoppingCart')
const OrderSession = require('./models/OrderSession')


// ASSOCIATIONS:
User.hasMany(OrderSession)
OrderSession.belongsTo(User)

OrderSession.belongsToMany(Product, {through: 'ShoppingCart'})
Product.belongsToMany(OrderSession, {through: 'ShoppingCart'})


module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart,
    OrderSession
  },
}
