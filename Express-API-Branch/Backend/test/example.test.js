
const assert = require('assert');

//describe — a logical grouping of tests, “Simple Math Test”
describe('Simple Math Test', () => {
  //it — a single test,
  it('should return 2', () => {
    //assert — how you validate your test works or fails
    assert.equal(1 + 1, 2);
  });
  it('should return 9', () => {
    assert.equal(3 * 3, 9);
  });
});



describe('hooks', function() {
  before(function() {
    // runs once before the first test in this block
    var db = new Connection(),
      tobi = new User('tobi'),
      loki = new User('loki'),
      jane = new User('jane');
  });

  after(function() {
    // runs once after the last test in this block
  });

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({
        type: 'User'
      }, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
  // test cases
});

// to run, npm run test in /Backend dir
