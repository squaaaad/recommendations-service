require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const RestaurantModel = require('../db/models/restaurant.js');

const app = express();
const dbAddress = process.env.DB_ADDRESS || 'localhost';
const uri = `mongodb://${dbAddress}/wegot`;
require('../helpers/cache');

mongoose.connect(uri, {useMongoClient: true});

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/restaurants/:id', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/restaurants/:id/recommendations', async(req, res) => {
  var placeId = req.params.id || 0;
  var results = [];

  const findNearbyRestaurants = await RestaurantModel.find({_id: placeId});
  const nearbyResults = await RestaurantModel.find({
    _id: {
      $in: findNearbyRestaurants[0].nearby
    }
  });

  results.push(findNearbyRestaurants[0], nearbyResults);
  res
    .status(200)
    .send(results);

});

app.listen(3004, function () {
  console.log('WeGot app listening on port 3004!');
});
