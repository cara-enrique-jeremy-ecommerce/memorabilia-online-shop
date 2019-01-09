'use strict'

const db = require('../server/db')
const {User, Category, Product} = require('../server/db/models')

// ADDED A SMALL PRODUCT SEED TO TEST ROUTES AND MODEL
// const products = [
//   {
//     name: 'Elder wand',
//     price: 12.5,
//     description:
//       'This is a super special wand that can defeat he-who-must-not-be-named.'
//   }
// ]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const categories = await Promise.all([
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
    Category.create({title: 'X-MEN', imageURL: '/img/x-men.png'}),
    Category.create({
      title: 'Back to the Future',
      imageURL: '/img/back-to-the-future.png'
    })
  ])

  console.log(`seeded ${categories.length} categories`)

  const products = [
    {
      name: 'Kryptonite',
      price: 99.99,
      description:
        'An alien mineral that has the property of depriving Superman of his powers.',
      image: '/img/kryptonite.jpg',
      quantity: 5,
      categoryId: 4
    }, {
      name: 'Superman Cape',
      price: 19.99,
      description:
        'Save the day with this red cape. A must have attire for any superhero ensemble',
      image: '/img/supermancape.jpg',
      quantity: 50,
      categoryId: 4
    }, {
      name: 'Superman Underwear',
      price: 5.99,
      description:
        'No Superman costume is complete without the underwear...',
      image: '/img/supermanunderwear.jpg',
      quantity: 25,
      categoryId: 4
    }, {
      name: 'Clark Kent glasses',
      price: 4.99,
      description:
        'Put on these glasses and you will be magically disguised as a civilian.',
      image: '/img/kentglasses.jpg',
      quantity: 30,
      categoryId: 4
    }, {
      name: 'Stormtrooper Statue',
      price: 79.99,
      description:
        'A fullsized replica that looks so real that can fool even a Jedi master',
      image: '/img/stormtrooper.jpg',
      quantity: 14,
      categoryId: 3
    }, {
      name: 'Lightsaber',
      price: 12.99,
      description:
        'Handheld weapon that is used by the Jedi, Sith, and other Force-sensitives',
      image: '/img/lightsaber.jpg',
      quantity: 50,
      categoryId: 3
    }, {
      name: 'C3PO',
      price: 49.99,
      description:
        'A droid programmed for etiquette and protocol and fluent in more than seven million forms of communication',
      image: '/img/c3po.jpg',
      quantity: 28,
      categoryId: 3
    }, {
      name: 'R2D2',
      price: 59.99,
      description:
        'A resourceful astromech droid manufactured by Industrial Automaton with masculine programming',
      image: '/img/r2d2.jpg',
      quantity: 25,
      categoryId: 3
    }, {
      name: 'Elder wand',
      price: 12.50,
      description:
        'This is a super special wand that can defeat he-who-must-not-be-named.',
      image: '/img/elderwand.jpg',
      quantity: 50,
      categoryId: 2
    }, {
      name: 'Round glasses',
      price: 5.99,
      description:
        'Match Harry Potter with these glasses.',
      image: '/img/hpglasses.jpg',
      quantity: 100,
      categoryId: 2
    }, {
      name: 'Voldemort Costume',
      price: 19.99,
      description:
        'Scare your friends by dressing up as he-who-must-not-be-named.',
      image: '/img/voldycostume.jpg',
      quantity: 20,
      categoryId: 2
    }, {
      name: 'Batmobile',
      price: 75000.00,
      description:
        'Speed away in the quick getaway vehicle',
      image: '/img/batmobile.jpg',
      quantity: 5,
      categoryId: 1
    }, {
      name: 'Batman Mask',
      price: 7.99,
      description:
        'Disguise your identity with this mask',
      image: '/img/batmanmask.jpg',
      quantity: 20,
      categoryId: 1
    }, {
      name: 'Batsuit',
      price: 19.99,
      description:
        'Save the day as Batman with this suit',
      image: '/img/batsuit.jpg',
      quantity: 30,
      categoryId: 1
    }, {
      name: 'Tron Light Cycle',
      price: 5000,
      description:
        'Get our own high speed personal transport vehicle!',
      image: '/img/tronlightcycle.jpg',
      quantity: 25,
      categoryId: 7
    }, {
      name: 'Tron Helmet',
      price: 19.99,
      description:
        'A must have safety addition to use with the light cycle.',
      image: '/img/tronhelmet.jpg',
      quantity: 200,
      categoryId: 7
    }, {
      name: 'Identity Light Disc',
      price: 25,
      description:
        'The most fundamental piece of equipment to programs in the Tron system',
      image: '/img/identitylightdisc.jpg',
      quantity: 100,
      categoryId: 7
    }, {
      name: 'Hoverboard',
      price: 50,
      description:
        'A hover converted board-shaped vehicle',
      image: '/img/hoverboard.jpg',
      quantity: 200,
      categoryId: 9
    }, {
      name: 'DeLorean Time Machine',
      price: 100000,
      description:
        'Travel back in time with the DeLorean. Use caution in your actions, or you might not exist in the present!',
      image: '/img/delorean.jpg',
      quantity: 3,
      categoryId: 9
    }, {
      name: '1955 Red Bass Guitar',
      price: 250,
      description:
        'Play the same bass guitar that Marty McFly did to save his future!',
      image: '/img/bassguitar.jpg',
      quantity: 15,
      categoryId: 9
    }, {
      name: 'Ring of Mordor',
      price: 1000000,
      description:
        'One ring to rule them all',
      image: '/img/ringofmordor.jpg',
      quantity: 1,
      categoryId: 5
    }, {
      name: 'Green Leaf Pin',
      price: 50,
      description:
        'Signal to allies that you are a part of the Fellowship of the Ring by wearing this pin',
      image: '/img/greenleaf.jpg',
      quantity: 12,
      categoryId: 5
    }, {
      name: 'Middle Earth Map',
      price: 50,
      description:
        'Use this to navigate through middle earth.',
      image: '/img/middleearthmap.jpg',
      quantity: 20,
      categoryId: 5
    }
  ]

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
