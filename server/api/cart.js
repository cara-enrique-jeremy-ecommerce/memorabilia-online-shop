const router = require('express').Router()
const {Product, User} = require('../db/models')

module.exports = router

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const productsInCart = await Product.findAll({
//       include: [
//         {
//           model: User,
//           through: {
//             where: {userId: req.params.userId}
//           }
//         }
//       ]
//     })
//     res.json(productsInCart)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/cart/:userId', async (req, res, next) => {
//   try {
//     const addedProduct = await Product.create({userId: req.params.userId, productId: req.body.id}, {
//       returning: true
//     })
//     res.json(addedProduct)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', (req, res, next) => {
  try {
    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

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
