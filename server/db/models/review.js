const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: 120,
        msg: 'Review must be atleast 120 characters in length'
      }
    }
  }
})

module.exports = Review
