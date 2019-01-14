const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderitem')
const Address = require('./address')
const Review = require('./review')

// Model's Associations

User.hasMany(Address)
Address.belongsTo(User)

Product.belongsTo(Category, {as: 'category'})
Category.hasMany(Product)

User.hasMany(Order)
Order.belongsTo(User)
Order.belongsTo(Address)

Review.belongsTo(User, {as: 'user'})
Review.belongsTo(Product, {as: 'product'})
Product.hasMany(Review)
User.hasMany(Review)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)
OrderItem.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Category,
  Order,
  OrderItem,
  Product,
  Review
}
