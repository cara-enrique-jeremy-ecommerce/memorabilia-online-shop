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

  describe('POST /api/products', () => {
    it('creates a product in the DB and returns it', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({name: 'test', description: 'This is a test.', price: 19.99})
        .expect(200)

      expect(res.body.name).to.equal('test')
    })
  })

  describe('PUT /api/products', () => {
    let productToUpdate

    beforeEach(async () => {
      productToUpdate = await Product.create({
        name: 'test',
        price: 20.0
      })
    })

    it('updates a product in the DB and returns it', async () => {
      const res = await request(app)
        .put(`/api/products/${productToUpdate.id}`)
        .send({name: 'test put'})
        .expect(200)

      expect(res.body.name).to.equal('test put')
    })
  })
})
