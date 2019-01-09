const db = require('./db')

// register models
const Category = require('./models/category')
const Product = require('./models/product')

Product.belongsTo(Category, {as: 'category'})
Category.hasMany(Product)

module.exports = db
