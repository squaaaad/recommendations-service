const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisURL = 'redis://localhost:6379';
const client = redis.createClient(redisURL);

client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
  const key = JSON.stringify(Object.assign({}, this.getQuery(), {collection: this.mongooseCollection.name}));
  // See if we have a value for 'key' inside redis
  const cacheValue = await client.get(key);

  // If we do return that; exec function expects a mongoose model
  if (cacheValue) {
    //parse our cached value
    console.log('returned from cache');
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc)
    // if it is an array make each object a model
      ? doc.map(d => new this.model(d))
      // else its an object and just make it a model
      : new this.model(doc);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);
  client.set(key, JSON.stringify(result), 'EX', 86400);
  return result;
};
