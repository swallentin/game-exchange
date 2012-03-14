var assert = require('assert');
var mongoose = require('mongoose');
var MemberProvider = require('../../lib/dataproviders/mongodb/memberprovider-mongo.js').MemberProvider;
var User = require('../../lib/dataproviders/mongodb/memberprovider-mongo.js').User;

var provider = new MemberProvider();

// test that
assert.ok( provider !== undefined );

mongoose.connect('mongodb://localhost/mydatabase');

var user = new User;
user.name = "Astrid Blomberg";
user.username = "astrido";
user.tags = ['Action', 'Sports'];
user.games = ['Fifa 2012'];

provider.save(user, function (err) {
  assert.ok(err == null);
  assert.ok(user._id);
  var id = user._id;
  var username = user.username;
  console.log("User created: " + id);


  provider.findById(id, function (err, doc) {
    assert.ok(err == null);
    assert.ok(doc !== null);
    assert.ok(doc !== undefined);
    console.log("User found by id: " + id);

    provider.findByUsername(username, function (err, doc) {
      assert.ok(err == null);
      assert.ok(doc !== null);
      assert.ok(doc !== undefined);
      console.log("User found by username: " + username);

      provider.remove(user, function () {
        console.log("User removed: " + id);

        provider.findById(id, function (err, doc) {
          assert.ok(err == null);
          assert.ok(doc == null);
          console.log("Could not find user by id: ", id);

          provider.findByFacebookId(664271190, function (err, doc) {
            assert.ok(err == null);
            assert.ok(doc != null);
            assert.ok(doc !== undefined);
            console.log("Found user with facebook id: " + 664271190);
            console.log('No tests failed.');
          });
        });
      });
    });
  });
});

