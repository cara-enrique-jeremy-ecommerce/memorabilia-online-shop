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

// GET /api/categories/:categoryId
router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId)
    res.json(category)
  } catch (error) {
    next(error)
  }
})
