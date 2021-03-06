const Sequelize = require("sequelize");
const db = require("../db");

const ShoppingCart = db.define("ShoppingCart", {
  itemQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
});
module.exports = ShoppingCart;
