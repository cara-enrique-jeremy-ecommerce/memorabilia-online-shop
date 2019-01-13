const router = require('express').Router()
const {User, Order} = require('../db/models')
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

router.get('/:userId/orders', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const orders = await Order.findAll({
      where: {userId},
      include: [{all: true}]
    })
    if (req.user(userId === req.user.id || req.user.adminPrivilege)) {
      res.json(orders)
    } else {
      next(new Error('Authorization error'))
    }
  } catch (err) {
    next(err)
  }
})
