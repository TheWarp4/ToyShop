"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody123@gmail.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy123@gmail.com",
    }),
    Product.create({
      price: 49.99,
      description: "Set Number 10717",
      category: "LEGOS",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71C-nuAyCPL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      productName: "LEGO Classics Building Blocks",
    }),
    Product.create({
      price: 19.99,
      description: "Barbie Dreamtopia",
      category: "BARBIE",
      image:
        "https://albaniandubs.weebly.com/uploads/5/7/8/2/57825701/barbi-e-liqenit-te-mjellmave-2003-albanian-dubs_1.jpg",
      productName: "Barbie - Liqenit te Mjellmave",
    }),
    Product.create({
      price: 74.99,
      description: "Jurassic TREX Colossal Figure for Ages 12+",
      category: "JURASSIC",
      image:
        "https://i5.walmartimages.com/asr/b9ee23c9-d147-4853-98c7-81d539f4eb28.3aabe75528efac54c112ee83edfd1be2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      productName: "Jurassic World - TREX FIGURE",
    }),
    Product.create({
      price: 22.99,
      description: "Optimus Prime Figure for Ages 8+",
      category: "TRANSFORMERS",
      image: "https://m.media-amazon.com/images/I/81NZSeXQHDL._AC_SX522_.jpg",
      productName: "Transformers - Optimus Prime Figure",
    }),
    Product.create({
      price: 14.99,
      description: "Soft Stuffed Animal",
      category: "STUFFED ANIMALS",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Tahu98IiL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
      productName: "Squishmallow",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
