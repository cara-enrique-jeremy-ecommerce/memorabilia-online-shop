const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    isUnique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    isUnique: true
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: '/img/default_movie_image.jpg'
  }
})

module.exports = Category
