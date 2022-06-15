const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM(
      "LEGOS",
      "TRANSFORMERS",
      "JURASSIC",
      "BARBIE",
      "STUFFED ANIMALS"
    ),
    defaultValue: "LEGOS",
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://www.lego.com/cdn/cs/set/assets/blta93a030f7e94e881/21332.png?fit=bounds&format=png&width=1600&height=1600&dpr=1",
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Product;
