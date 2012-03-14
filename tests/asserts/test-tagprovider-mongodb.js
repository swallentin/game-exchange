var assert = require('assert');
var GameProvider = require('../../lib/dataproviders/mongodb/tagprovider-mongo.js').GameProvider;
var Game = require('../../lib/dataproviders/mongodb/tagprovider-mongo.js').Game;

var provider = new GameProvider;

// test that
assert.ok( provider !== undefined );


var game = new Game;
game.title = "FIFA 2012";
game.description = "EA Sports does it again with a smash hit fotball experience!";

provider.save(game, function (err) {
  assert.ok(err == null);
  assert.ok(game._id);
  var id = game._id;
  var title = game.title;
  console.log("Game created: " + id);


  provider.findById(id, function (err, doc) {
    assert.ok(err == null);
    assert.ok(doc !== null);
    assert.ok(doc !== undefined);
    console.log("Game found by id: " + id);

    provider.findByTitle(title, function (err, doc) {
      assert.ok(err == null);
      assert.ok(doc !== null);
      assert.ok(doc !== undefined);
      console.log("Game found by title: " + title);

      provider.remove(game, function () {
        console.log("Game removed: " + id);

        provider.findById(id, function (err, doc) {
          assert.ok(err == null);
          assert.ok(doc == null);
          console.log("Could not find game by id: ", id);
          console.log('No tests failed.');
        });
      });
    });
  });
});

