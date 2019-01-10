const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: 'category',
      order: [['id', 'ASC']]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne(req.body, {
      where: {id: req.params.productId},
      returning: true
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {id: req.params.productId},
      returning: true
    })
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})
