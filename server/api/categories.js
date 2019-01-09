const router = require('express').Router()
const {Category, Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({include: Product})
    res.json(categories)
  } catch (error) {
    next(error)
  }
})
