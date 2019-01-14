const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: 10,
        msg: 'Review must be at least 10 characters in length'
      }
    }
  }
})

module.exports = Review
