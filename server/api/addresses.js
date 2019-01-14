const router = require('express').Router()
const {Address} = require('../db/models')
module.exports = router

router.get(`/:userId`, async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  console.log('New address to post', req.body)
  // Needs to be tested

  const newAddress = await Address.create(req.body)
})
