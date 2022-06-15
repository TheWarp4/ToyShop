const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM('LEGOS', 'TRANSFORMERS', 'JURASSIC', 'BARBIE', 'STUFFED ANIMALS'),
    defaultValue: 'LEGOS',
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.google.com/aclk?sa=l&ai=DChcSEwjO9Jr08K34AhVM5uMHHV2YC0UYABADGgJ5bQ&ae=2&sig=AOD64_1kh-i_WITabs7SvkWPf2j772CLtg&adurl&ctype=5&ved=2ahUKEwjIgY308K34AhU7sXIEHbSJC6UQvhd6BAgBEFI',
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})
module.exports = Product;


