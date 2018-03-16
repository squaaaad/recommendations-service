const faker = require('faker');
const fs = require('fs');
let file = fs.createWriteStream('./newdata.json');
const type = ['bar', 'nightclub', 'restaurant'];

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
      Math.ceil(Math.random() * 10000000)
    ]
  };
  return JSON.stringify(restaurant);
};

let writeOneMillionTimes = (n = 1e7) => {
  let isReady = true;
  while (n > 0 && isReady) {
    isReady = file.write(`${createRestaurant(n)}\n`);
    n -= 1;
  }
  file.once('drain', () => {
    writeOneMillionTimes(n);
  });
};

writeOneMillionTimes();