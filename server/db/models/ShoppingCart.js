const Sequelize = require("sequelize");
const db = require("../db");

const ShoppingCart = db.define("shoppingCart", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    }
  }
});
module.exports = ShoppingCart;
