const router = require('express').Router()
const {Product, Review} = require('../db/models')

module.exports = router

// GET /products --> Getting the list of all the products
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

// GET /products/:productId -- Getting a specific product
router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {id: req.params.productId},
      returning: true,
      include: 'category'
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

// PUT /products/:productId -- Updating a specific product's details
router.put('/:productId', async (req, res, next) => {
  try {
    await Product.update(req.body, {
      where: {id: req.params.productId},
      returning: true
    })
    const updatedProduct = await Product.findById(req.params.productId, {
      include: 'category'
    })
    res.json(updatedProduct)
  } catch (error) {
    next(error)
  }
})

// POST /products/:productId -- Creating a new product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body, {
      returning: true
    })

    const newProductWithCategoryDetails = await Product.findById(
      newProduct.id,
      {
        include: 'category'
      }
    )
    res.json(newProductWithCategoryDetails)
  } catch (error) {
    next(error)
  }
})

// All th reviews related to an specific product
// GET /products/:productId/reviews
router.get('/:productId/reviews', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.productId
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// POST /products/:productId/reviews
router.post('/:productId/reviews', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)

    if (!product) {
      res.sendStatus(404)
    } else {
      let newreview = await Review.create(req.body, {
        returning: true
      })
      newreview.productId = req.params.productId
      newreview.userId = req.user.id
      res.json(newreview)
    }
  } catch (err) {
    next(err)
  }
})
