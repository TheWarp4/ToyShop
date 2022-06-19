const Sequelize = require("sequelize");
const db = require("../db");

const OrderSession = db.define("orderSession", {
  status: {
    type: Sequelize.ENUM(['open', 'completed']),
    allowNull: false,
    defaultValue: 'open',
  },
});
module.exports = OrderSession;
