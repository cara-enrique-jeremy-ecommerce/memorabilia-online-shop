const router = require('express').Router()
const {Product, User} = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  try {
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

// Creating a cart property for a guest in req.session
router.post('/', (req, res, next) => {
  try {
    req.session.cart = []
    req.session.cart = req.body
    // if (req.session.cart) {
    //   req.session.cart = req.body
    // } else {
    //   req.session.cart = {[req.body.id]: req.body}
    // }
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})
