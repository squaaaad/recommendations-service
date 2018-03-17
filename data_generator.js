const faker = require('faker');
const fs = require('fs');
let file = fs.createWriteStream('./newdata.json');

const type = ['bar', 'nightclub', 'restaurant'];
const start = Date.now();
let createRestaurant = (id) => {
  let restaurant = {
    _id: id,
    name: faker
      .company
      .companyName(),
    google_rating: Math.ceil(Math.random() * 5),
    zagat_food_rating: Math.ceil(Math.random() * 5),
    review_count: Math.ceil(Math.random() * 100),
    photos: [
      'https://loremflickr.com/320/240/food', 'https://loremflickr.com/320/240/food', 'https://loremflickr.com/320/240/food'
    ],
    short_description: faker
      .company
      .catchPhrase(),
    neighborhood: faker
      .address
      .county(),
    price_level: Math.ceil(Math.random() * 5),
    types: type[Math.floor(Math.random() * type.length - 1)],
    nearby: [
      Math.ceil(Math.random() * 10000000),
      Math.ceil(Math.random() * 10000000),
      Math.ceil(Math.random() * 10000000),
      Math.ceil(Math.random() * 10000000),
      Math.ceil(Math.random() * 10000000),
      Math.ceil(Math.random() * 10000000)
    ]
  };
  return JSON.stringify(restaurant) + '\n';
};

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  createRestaurant(i)
  write();

  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(createRestaurant(i), encoding, callback);
      } else {
        // see if we should continue, or wait don't pass the callback, because we're not
        // done yet.
        ok = writer.write(createRestaurant(i), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early! write some more once it drains
      writer.once('drain', write);
    }
  }
}
writeTenMillionTimes(file, 'utf8', () => {
  console.log(Date.now() - start);
});