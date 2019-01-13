const router = require('express').Router()
const {User, Product, Order, Address} = require('../db/models')

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Address}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// ==> create new users cart <== //
router.post('/:userId', async (req, res, next) => {
  try {
    const order = await Order.create({userId: req.params.userId})
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      limit: 1,
      where: {
        userId: req.params.userId
      },
      order: [['createdAt', 'DESC']]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/inCart/:cartNumber', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.cartNumber, {
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
