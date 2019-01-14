const router = require('express').Router()
const {Order, Address} = require('../db/models')

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

// GET /orders -- History?
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

// GET /orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
