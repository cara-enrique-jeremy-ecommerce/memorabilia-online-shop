const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')

// Model's Associations

Product.belongsTo(Category, {as: 'category'})
Category.hasMany(Product)

// Creates a cart model which associates userId's and productId's
Product.belongsToMany(User, {through: 'cart'})
// Product.belongsToMany(User, {through: 'wishlist'}) // FOR TESTING

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Product,
  Order
}
