const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
  // products: {
  //   //array of product ids
  // }
})

module.exports = Order
