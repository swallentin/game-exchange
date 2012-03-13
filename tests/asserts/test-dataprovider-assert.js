var assert = require('assert');
var data = require('../../data/games.json');
var Provider = require('../../lib/dataproviders/memory/dataprovider-memory.js');
var provider = Provider.create(data);

assert.ok( provider !== undefined);

var expected = null;
provider.findById(115, function(err, doc){
    assert.ok(err === null);
    expected = doc;
});

provider.findByTitle('Darksiders', function (err, doc) {
    assert.equal(expected._id, doc._id);
    assert.ok(err === null);
    assert.ok(doc !== null);
    assert.ok(doc._id !== undefined);
});

var game= {
    title:'A Game',
    information:'Testing'
};

provider.save(game, function(err, actual){
   assert.equal(err, null);
   assert.equal(actual[0]._id, 749);
});

provider.deleteById(actual._id, function(err, doc){
   assert.equal(err, null);
});

provider.findById(actual._id, function (err, doc) {
   assert.notEqual(err, null);
});

console.log('No tests failed.');