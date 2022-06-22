const { faker } = require("@faker-js/faker");

faker.commerce.productDescription();
faker.commerce.price(100, 200);
faker.commerce.productName();

// "LEGOS" https://www.pennlive.com/resizer/W-M-ACGvuLR-NwYnQmIBGLhivBk=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/XE6N3UD2RJEU5LS6Q6C7K2PUTA.jpg

// BARBIE https://www.rd.com/wp-content/uploads/2015/09/GettyImages-459000267-2-scaled.jpg?resize=768,512

// JURASSIC https://m.media-amazon.com/images/I/71uD-zJwM3S._AC_SX425_.jpg

// TRANSFORMERS https://m.media-amazon.com/images/I/61-Vf1z+fSL._AC_SX425_.jpg

// STUFFED ANIMALS https://m.media-amazon.com/images/I/71oNgt0-dYL._AC_SX425_.jpg

("use strict");

const {
  db,
  models: { User, Product, OrderSession, ShoppingCart },
} = require("../server/db");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 *
 *
 */

const populateUserData = async () => {
  await Promise.all([
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
    User.create({
      username: "admin",
      password: "123",
      email: "admin@gmail.com",
      type: "admin",
    }),
  ]);

  try {
    for (let i = 0; i < 200; i++) {
      const username = faker.internet.userName(); // Rowan Nikolaus
      const password = faker.internet.password();
      const randomEmail = faker.internet.email();
      const imageUrl = faker.image.avatar();
      await User.create({
        username: username,
        password: password,
        email: randomEmail,
        imageUrl: imageUrl,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const populateProductData = async () => {
  await Promise.all([
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

  const productDummyData = [
    [
      "LEGOS",
      "https://www.pennlive.com/resizer/W-M-ACGvuLR-NwYnQmIBGLhivBk=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/XE6N3UD2RJEU5LS6Q6C7K2PUTA.jpg",
    ],
    [
      "BARBIE",
      "https://www.rd.com/wp-content/uploads/2015/09/GettyImages-459000267-2-scaled.jpg?resize=768,512",
    ],
    [
      "JURASSIC",
      "https://m.media-amazon.com/images/I/71uD-zJwM3S._AC_SX425_.jpg",
    ],
    [
      "TRANSFORMERS",
      "https://m.media-amazon.com/images/I/61-Vf1z+fSL._AC_SX425_.jpg",
    ],
    [
      "STUFFED ANIMALS",
      "https://m.media-amazon.com/images/I/71oNgt0-dYL._AC_SX425_.jpg",
    ],
  ];

  try {
    for (let i = 0; i < 200; i++) {
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price(5, 100);
      const productName = faker.commerce.productName();
      let randomCatagoryNumber = Math.floor(Math.random() * 5);
      Product.create({
        price: price,
        description: description,
        category: productDummyData[randomCatagoryNumber][0],
        image: productDummyData[randomCatagoryNumber][1],
        productName: productName,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const populateShoppingCartData = async () => {
  // create an array of 3 unique numbers to associate with the 200 products in the database
  let threeUniqueProductIds = () => {
    let productNumbersArray = [];
    while (productNumbersArray.length < 3) {
      // console.log(i)
      // console.log(productNumbersArray)
      let randomProductIndex = Math.floor(Math.random() * 199) + 1;
      // console.log(randomProductIndex)
      // console.log((productNumbersArray.includes(randomProductIndex)))
      if (productNumbersArray.includes(randomProductIndex)) {
        continue;
      } else {
        productNumbersArray.push(randomProductIndex);
      }
    }
    return productNumbersArray;
  };
  // i in this for loop is associated with userId
  for (let i = 1; i < 200; i++) {
    // create orderSession for each user
    const user = await User.findByPk(i);
    const orderSession = await OrderSession.create({ status: "open" });
    await user.addOrderSession(orderSession);
    // loop over 3 product numbers and create a shoppingCart for each userId and productId
    let productIds = threeUniqueProductIds();
    for (let j = 0; j < productIds.length; j++) {
      await ShoppingCart.create({
        orderSessionId: i,
        productId: productIds[j],
        itemQuantity: 1,
      });
    }
  }
};

/*
We've separated the `seed` function from the `runSeed` function.
This way we can isolate the error handling and exit trapping.
The `seed` function is concerned only with modifying the database.
*/

/*
Execute the `seed` function, IF we ran this module directly (`node seed`).
`Async` functions always return a promise, so we can use `catch` to handle
any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  await populateProductData();
  await populateUserData();
  await populateShoppingCartData();

  const user1 = await User.findByPk(1);
  const user2 = await User.findByPk(2);

  const orderSession1 = await OrderSession.create({ status: "open" });
  const orderSession2 = await OrderSession.create({ status: "open" });

  await user1.addOrderSession(orderSession1);
  await user2.addOrderSession(orderSession2);

  console.log(`seeded lotsa users`);
  console.log(`seeded successfully`);
}

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
// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
