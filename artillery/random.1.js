const generateRandomId = function (userContext, events, done) {
  userContext.vars.id = Math.floor(Math.random() * 100);
  return done();
};

module.exports = {
  generateRandomId
};