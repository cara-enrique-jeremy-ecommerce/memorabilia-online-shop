const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  description: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    defaultValue: 'defaultproduct.jpg'
  },
  quantity: Sequelize.INTEGER,
  stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5}
  },
  reviews: Sequelize.STRING
})

module.exports = Product;
