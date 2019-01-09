'use strict'

const db = require('../server/db')
const {User, Category, Product} = require('../server/db/models')

// ADDED A SMALL PRODUCT SEED TO TEST ROUTES AND MODEL
const products = [
  {
    name: 'Elder wand',
    price: 12.5,
    description:
      'This is a super special wand that can defeat he-who-must-not-be-named.'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const categories = await Promise.all([
    Category.create({
      title: 'Back to the Future',
      imageURL: '/img/back-to-the-future.png'
    }),
    Category.create({title: 'Batman', imageURL: '/img/batman.png'}),
    Category.create({title: 'Harry Potter', imageURL: '/img/harry-potter.png'}),
    Category.create({title: 'Star Wars', imageURL: '/img/star-wars.png'}),
    Category.create({title: 'Superman', imageURL: '/img/superman.jpg'}),
    Category.create({
      title: 'The Lord of the Rings',
      imageURL: '/img/the-lord-of-the-rings.png'
    }),
    Category.create({title: 'Transformers', imageURL: '/img/transformers.png'}),
    Category.create({title: 'Tron: Legacy', imageURL: '/img/tron.jpeg'}),
    Category.create({title: 'X-MEN', imageURL: '/img/x-men.png'})
  ])

  console.log(`seeded ${categories.length} categories`)

  await Promise.all(products.map(product => Product.create(product)))

  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
