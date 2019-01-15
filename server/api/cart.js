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
    req.session.cart = {}
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

// try {
//   // let found = false
//   // let index = 0
//   // if (Array.isArray(req.session.cart)) {
//   //   req.session.cart.forEach( (elem, index) => {
//   //     if (elem.id === r)
//   //   })
//   // }

//   req.session.cart = [...req.session.cart, req.body[0]]
//   // if (req.session.cart) {
//   //   req.session.cart = req.body
//   // } else {
//   //   req.session.cart = {[req.body.id]: req.body}
//   // }
//   res.json(req.session.cart)
// } catch (error) {
//   next(error)
// }
