const { faker } = require("@faker-js/faker");

faker.commerce.productDescription();
faker.commerce.price(100, 200);
faker.commerce.productName();


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
      description: "Jurassic TREX Colossal",
      category: "JURASSIC",
      image:
        "https://i5.walmartimages.com/asr/b9ee23c9-d147-4853-98c7-81d539f4eb28.3aabe75528efac54c112ee83edfd1be2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      productName: "Jurassic World - TREX FIGURE",
    }),
    Product.create({
      price: 22.99,
      description: "Optimus Prime",
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
      "https://m.media-amazon.com/images/I/81odce4aScL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/81vaB9d1pxL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81ZwS4MhuoL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81NCFZ3iJdL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/91RaDysK8zL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81OqSTy+A1L._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81LO+S3rrvL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/71WmJVAhVIL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/61aLF2MdqIL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/816F+MPVeCL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81AhTmzbr2L._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81bsR+YCBwL._AC_SX425_.jpg"
    ],
    [
      "BARBIE",
      "https://www.rd.com/wp-content/uploads/2015/09/GettyImages-459000267-2-scaled.jpg?resize=768,512",
      "https://m.media-amazon.com/images/I/81qpWhtgu6L._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81peZfLxCNL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/61hWRyCZDQL._AC_SY741_.jpg",
      "https://m.media-amazon.com/images/I/71cpnUKTepL._AC_SX569_.jpg",
      "https://m.media-amazon.com/images/I/71QclTR9FQL._AC_SX425_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71cM3H3vfcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/81owpGnSI-L._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/81PAxoSDVxL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/61pEj-1uNOL._AC_SY550_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71nASv4rbsL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/91r0Smo920L._AC_SY450_.jpg"

    ],
    [
      "JURASSIC",
      "https://m.media-amazon.com/images/I/71uD-zJwM3S._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/61OIdq73gNL._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/81DuaOEhB-L._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/71ckmeGmAhL._AC_SX425_.jpg",
"https://media.kohlsimg.com/is/image/kohls/3788498?wid=1200&hei=1200&op_sharpen=1",
"https://www.tradeinn.com/f/13866/138666426/jurassic-world-the-wild-chompin-carnotaurus-toro-dinosaur-toy-includes-various-actions-and-realistic-details-to-entertain.jpg",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Robotime-Stegosaurus-b5a70cd.jpg?quality=90&webp=true&resize=975,730",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Wild-Republic-Diplodocus-hand-puppet-8b753ab.jpg?quality=90&webp=true&resize=975,730",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Super-Colossal-Indominus-Rex-86df8b6.jpg?quality=90&webp=true&resize=975,964",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Stomp-%E2%80%98N-Escape-Tyrannosaurus-Rex-ba582e3.jpg?quality=90&webp=true&resize=975,450",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Roar-Attack-Ankylosaurus--e216d8e.jpg?quality=90&webp=true&resize=975,473",
"https://images.immediate.co.uk/production/volatile/sites/4/2021/12/Best-dinosaur-toys-Jurassic-World-Mosasaurus-7200522.jpg?quality=90&webp=true&resize=975,617",
    ],
    [
      "TRANSFORMERS",
      "https://m.media-amazon.com/images/I/61-Vf1z+fSL._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/71H+nPUR9GL._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/81umDrKV6CL._AC_SX425_.jpg",
"https://m.media-amazon.com/images/I/71PiFCnubXL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/71NEKEXznAL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/71sQfw+UWJL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/719x3rDYwmL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/71VgVUCDtRL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/81GzHuzzg8L._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/81FkPwfnghL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/812Bk3M9dwL._AC_UL320_.jpg",
"https://m.media-amazon.com/images/I/71y0udORxrL._AC_UL320_.jpg",
    ],
    [
      "STUFFED ANIMALS",
      "https://m.media-amazon.com/images/I/71oNgt0-dYL._AC_SX425_.jpg",
      "https://m.media-amazon.com/images/I/614GIhMwuOL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/71Q5QrpltHL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/51AUJAfsebL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/61xTwDFMZRL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/817YPdmbxJL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/517v+-M4sNL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/410+Lj2sMDS._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/810MV8hNM5L._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/71wYUOHA0AL._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/51Fwh33bUxS._AC_UL320_.jpg",
      "https://m.media-amazon.com/images/I/71dgzrodFfS._AC_UL320_.jpg",
    ],
  ];

  try {
    for (let i = 0; i < 200; i++) {
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price(5, 100);
      const productName = faker.commerce.productName();
      let randomCatagoryNumber = Math.floor(Math.random() * 5);
      let randomUrlIndex = Math.floor((Math.random() * 12) + 1)
      Product.create({
        price: price,
        description: description,
        category: productDummyData[randomCatagoryNumber][0],
        image: productDummyData[randomCatagoryNumber][randomUrlIndex],
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
      let randomProductIndex = Math.floor(Math.random() * 199) + 1;
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
  console.log(`... and products`);
  console.log(`... and carts`);
  console.log(`... and urls`);
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
