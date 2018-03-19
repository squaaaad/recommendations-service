const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: String,
  _id: Number,
  google_rating: Number,
  zagat_food_rating: Number,
  review_count: Number,
  photos: [String],
  short_description: String,
  neighborhood: String,
  price_level: Number,
  types: String,
  nearby: [Number]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
