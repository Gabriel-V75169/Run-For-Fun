const db = require('./connection');
const { User, Race, Distance } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Distance', 'distances');
  await cleanDB('Race', 'races');
  await cleanDB('User', 'users');

  const distances = await Distance.insertMany([
    { name: '5k' },
    { name: '10k' },
    { name: '12k' },
    { name: 'Half-Marathon' },
    { name: 'Marathon' }
  ]);

  console.log('categories seeded');

  const races = await Race.insertMany([
    {
      name: '12 Ks of Christmas',
      description:
        'A fun, festive romp through the 12 Ks of Christmas. A great gift for the runner in your life!',
      image: '/images/12KsSNOW_2048x2048.jpg',
      distance: distances[2]._id,
      price: 25.99,
      quantity: 500

    },
    {
      name: 'The Infinity Gauntlet',
      description:
        'A race medal worthy of the Mad Titan himself. This medal is sure to be the crown jewel of your collection.',
      image: '/images/InfinityGauntlet(4).jpg',
      distance: distances[3]._id,
      price: 25.99,
      quantity: 500
    },
    {
      name: 'Marathon Challenge',
      description:
        'A tough race consisting of 26 grueling miles. Put yourself to the ultimate test!',
      image: '/images/MarathonChallenge.png',
      price: 25.99,
      quantity: 500,
      distance: distances[4]._id,
    },
    {
      name: 'Zombie Run',
      description:
        'The dead have risen and are hungry for brains. Can you outrun them?',
      image: '/images/MZMBRN_NR.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[0]._id,
    },
    {
      name: 'Panda Run',
      description:
        'A fun run through the bamboo forest. Be sure to watch out for the pandas!',
      image: '/images/pandarun.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[1]._id,
    },
    {
      name: 'Run from Extinction',
      description:
        'Can you outrun extinction? Find out in this fun run through the ages.',
      image: '/images/runfromextinctionshopv2.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[0]._id,
    },
    {
      name: 'Gotta Run Em All',
      description:
        'Do you wanna be the very best? Like no one ever was? Then you gotta run em all!',
      image: '/images/catchemall.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[1]._id,
    },
    {
      name: 'Panda Run',
      description:
        'A fun run through the bamboo forest. Be sure to watch out for the pandas!',
      image: '/images/pandarun.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[4]._id,
    },
    {
      name: 'Run from Extinction',
      description:
        'Can you outrun extinction? Find out in this fun run through the ages.',
      image: '/images/runfromextinctionshopv2.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[4]._id,
    },
    {
      name: 'Gotta Run Em All',
      description:
        'Do you wanna be the very best? Like no one ever was? Then you gotta run em all!',
      image: '/images/catchemall.jpg',
      price: 25.99,
      quantity: 500,
      distance: distances[4]._id,
    },
    {
      name: 'The Shire Challenge',
      description:
        'A peaceful run through the Shire. Be sure to stay on the path!',
      image: '/images/SHR-Front-Medal-min.png',
      price: 25.99,
      quantity: 500,
      distance:  distances[3]._id,
    }
  ]);

  console.log('products seeded');

 await User.create({
   firstName: 'Justin',
   lastName: 'Bobrick',
   email: 'justin@testmail.com',
   password: 'password12345',
   ageRange:"18-25",
   orders: [
     {
       races: [races[0]._id, races[1]._id, races[2]._id]
     }
   ]
 });

   await User.create({
     firstName: 'Andrew',
     lastName: 'Stave',
     email: 'andrew@testmail.com',
     password: 'password12345',
     ageRange:"18-25",
   });
   console.log('users seeded');

  process.exit();
});
