const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isDecimal: true,
    }
  },
  description: Sequelize.TEXT,
  image: {
    type: Sequelize.STRING,
    defaultValue: '/defaultproduct.jpg'
  },
  quantity: Sequelize.INTEGER,
  stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5}
  },
  //reviews: Sequelize.TEXT
})

module.exports = Product;
