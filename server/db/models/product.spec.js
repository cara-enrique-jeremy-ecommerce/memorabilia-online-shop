/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctValues', () => {
    let goodproduct

    beforeEach(async () => {
      goodproduct = await Product.create({
        name: 'Good product!',
        price: 9.99,
        image: 'http://via.placeholder.com/150',
        description: 'Very good product for you to buy!',
        quantity: 5
      })
    })

    it('returns "Good product!" if the product name is correct', () => {
      expect(goodproduct.name).to.be.equal('Good product!')
    })

    it('returns "http://via.placeholder.com/150" if the product image is correct', () => {
      expect(goodproduct.image).to.be.equal('http://via.placeholder.com/150')
    })
  }) // end describe('correctValues')
}) // end describe('Product model')
