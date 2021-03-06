const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.DECIMAL(9, 2),
    allowNull: false
  },
  description: Sequelize.TEXT,
  image: {
    type: Sequelize.STRING,
    defaultValue: '/img/default_movie_image.jpg'
  },
  quantity: Sequelize.INTEGER,
  stars: {
    type: Sequelize.INTEGER,
    validate: {min: 1, max: 5}
  }
})

module.exports = Product
