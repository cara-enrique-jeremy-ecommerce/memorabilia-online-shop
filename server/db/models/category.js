const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: Sequelize.STRING,
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://upload.wikimedia.org/wikipedia/commons/c/cd/Toyogeki-Movie_Toyooka002.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Category
