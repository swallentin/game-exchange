var assert = require('assert');
var data = require('../data/members.json');
var MemberProvider = require('../lib/memberprovider-memory');

var provider = MemberProvider.create(data);

// test that
assert.ok( provider !== undefined );

provider.findByFacebookId('Stephan', function (err, doc) {
  assert.ok(err == null);
  assert.ok(doc !== null);
  assert.ok(doc !== undefined);
});

console.log('No tests failed.');