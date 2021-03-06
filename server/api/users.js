const router = require('express').Router()
const {User, Order, OrderItem, Address} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName', 'adminPrivilege']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:userId/cart --> Retrieve authenticated user's cart
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open'
      }
    })
    res.json(cart.orderitems)
  } catch (error) {
    next(error)
  }
})

// POST /api/users/:userId/cart --> Add to authenticated user's cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'open'
      },
      returning: true
    })

    const orderItem = await OrderItem.findOne({
      where: {
        orderId: order.id,
        productId: req.body.id
      }
    })

    if (!orderItem) {
      await OrderItem.create(
        {
          quantity: req.body.quantityInOrder,
          currentPrice: req.body.price,
          orderId: order[0].id,
          productId: req.body.id
        },
        {returning: true}
      )
    } else {
      orderItem.update(
        {
          quantity: req.body.quantityInOrder,
          currentPrice: req.body.price,
          orderId: order[0].id,
          productId: req.body.id
        },
        {returning: true}
      )
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const cartOrder = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open'
      }
    })
    console.log('cart order: ', cartOrder.id)
    await OrderItem.destroy({
      where: {
        orderId: cartOrder.id,
        productId: req.body.productId
      }
    })

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

// GET api/users/:userId/orders  --> History of completed orders
router.get('/:userId/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'completed'
      },
      include: [{model: Address}]
    })

    res.json(orders)

    // if (req.params.userId === req.user.id || req.user.adminPrivilege) {
    //   res.json(orders)
    // } else {
    //   const err = new Error('Authorization error')
    //   err.status = 401
    // }
  } catch (err) {
    next(err)
  }
})

// GET /users/:userId/orders/:orderId
router.get('/:userId/orders/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      where: {userId: req.params.userId}
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// GET api/:userId/addresses
router.get('/:userId/addresses', async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(addresses)
  } catch (err) {
    next(err)
  }
})
