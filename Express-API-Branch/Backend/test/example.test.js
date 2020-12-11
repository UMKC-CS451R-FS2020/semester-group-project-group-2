const assert = require('assert');
const User = require('../Models/User');
const Transaction = require('../Models/Transaction');

//describe — a logical grouping of tests, “Simple Math Test”
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User({"username":'Luna', "password":"abc123"});
      user.save().then(done()); 
    });
  });
});



//
// describe('hooks', function() {
//   before(function() {
//     // runs once before the first test in this block
//     const user = new User({
//       username: "Billy",
//       password: "1234abcd",
//       account: ""
//     });
//     user.save();
//   });
//
//   after(function() {
//     User.findOne({
//       username: "Billy"
//     }).then(data => {
//       assert.equal("Billy", data.username);
//     });
//
//
//     // runs once after the last test in this block
//   });
//
//   beforeEach(function(done) {
//     db.clear(function(err) {
//       if (err) return done(err);
//       db.save([tobi, loki, jane], done);
//     });
//     // runs before each test in this block
//   });
//
//   afterEach(function() {
//     // runs after each test in this block
//   });
//
//   describe('#find()', function() {
//     it('respond with matching records', function(done) {
//       db.find({
//         type: 'User'
//       }, function(err, res) {
//         if (err) return done(err);
//         res.should.have.length(3);
//         done();
//       });
//     });
//   });
//   // test cases
// });
//
// // to run, npm run test in /Backend dir
