const Sequelize = require("sequelize");
const db = require("../db");

const CartSession = db.define("cartSession", {
  sessionId: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});
module.exports = CartSession;
