const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

// Product route tests

describe('Products Route:', () => {
  before(() => {
    return db.sync({force: true})
  })

  afterEach(() => {
    return Product.truncate({cascade: true})
  })

  describe('GET /api/products', () => {
    it('returns an array', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an.instanceOf(Array)
    })
  })
})
