var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
  name: String,
  place_id: { type: String, unique: true },
  google_rating: Number,
  zagat_food_rating: Number,
  review_count: Number,
  photos: [String],
  short_description: String,
  neighborhood: String,
  location: { lat: Number, long: Number },
  address: String, 
  website: String,
  price_level: Number,
  types: [String]
});

var RestaurantModel = mongoose.model('Restaurant', restaurantSchema);

// findAll retrieves all stories
function findAll(callback) {
  console.log('finding all!');
  RestaurantModel.find({}, callback);
}

// findOne will retrieve the restaurant associated with the given id
function findOne(id, callback) {
  RestaurantModel.find({place_id: id}, callback);
}

// insertOne inserts a restaurant into the db
function insertOne(restaurant, callback) {
  console.log('inserting one restaurant');
  RestaurantModel.create(restaurant, callback);
}

// retrieves top 10 stories
function findTop10Restaurant(callback) {
  console.log('find top 10 restaurants!');
  RestaurantModel.find({}, callback)
            .limit(10)
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.findTop10Restaurant = findTop10Restaurant;
