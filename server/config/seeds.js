const db = require('./connection');
const { User, Product, Category } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('User', 'users');

  const categories = await Category.insertMany([
    { name: 'Races' },
    { name: 'Distance' }
  ]);

  console.log('categories seeded');

  const products = await Product.insertMany([
    {
      name: '12 Ks of Christmas',
      description:
        'A fun, festive romp through the 12 Ks of Christmas. A great gift for the runner in your life!',
      image: '/images/12KsSNOW_2048x2048.jpg',
      category: categories[0]._id,
      price: 25.99,
      quantity: 500

    },
    {
      name: 'The Infinity Gauntlet',
      description:
        'A race medal worthy of the Mad Titan himself. This medal is sure to be the crown jewel of your collection.',
      image: '/images/InfinityGauntlet(4).jpg',
      category: categories[0]._id,
      price: 25.99,
      quantity: 500,
      distance: "10k"
    },
    {
      name: 'Marathon Challenge',
      category: categories[1]._id,
      description:
        'A tough race consisting of 26 grueling miles. Put yourself to the ultimate test!',
      image: '/images/MarathonChallenge.png',
      price: 25.99,
      quantity: 500,
      distance: "4k"
    },
    {
      name: 'Zombie Run',
      category: categories[1]._id,
      description:
        'The dead have risen and are hungry for brains. Can you outrun them?',
      image: '/images/MZMBRN_NR.jpg',
      price: 25.99,
      quantity: 500,
      distance:"5k"
    },
    {
      name: 'The Shire Challenge',
      category: categories[1]._id,
      description:
        'A peaceful run through the Shire. Be sure to stay on the path!',
      image: '/images/SHR-Front-Medal-min.png',
      price: 25.99,
      quantity: 500,
      distance: "10k"
    }
  ]);

  console.log('products seeded');

  await User.create({
    firstName: 'Justin',
    lastName: 'Bobrick',
    email: 'justin@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Andrew',
    lastName: 'Stave',
    email: 'andrew@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
