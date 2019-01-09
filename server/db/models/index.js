const User = require('./user')
const Category = require('./category')
const Product = require('./product')

// Model's Associations

Product.belongsTo(Category, {as: 'category'})
Category.hasMany(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Product
}
