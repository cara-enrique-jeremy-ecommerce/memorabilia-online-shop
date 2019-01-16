const router = require('express').Router()

module.exports = router

router.get('/', (req, res, next) => {
  try {
    if (req.session.cart) {
      res.json(req.session.cart)
    } else {
      res.json({})
    }
  } catch (error) {
    next(error)
  }
})

// Creating a cart property for a guest in req.session
router.post('/', (req, res, next) => {
  try {
    if (req.session.cart) {
      req.session.cart[req.body.id] = req.body
    } else {
      req.session.cart = {[req.body.id]: req.body}
    }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/', (req, res, next) => {
  try {
    delete req.session.cart[req.body.productId]
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})
