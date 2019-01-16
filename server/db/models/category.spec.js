/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model fields', () => {
    let category

    beforeEach(async () => {
      category = await Category.create({
        name: 'et',
        title: 'ET',
        imageURL: 'http://via.placeholder.com/150'
      })
    })

    afterEach(() => {
      return Promise.all([Category.truncate({cascade: true})])
    })

    describe('Correct values', () => {
      it('includes `name`, `title` and `imageURL` fields', async () => {
        const savedCategory = await category.save()
        expect(savedCategory.name).to.equal('et')
        expect(savedCategory.title).to.equal('ET')
        expect(savedCategory.imageURL).to.equal(
          'http://via.placeholder.com/150'
        )
      })
    })
  }) // end describe('Model fields')
}) // end describe('Category model')
