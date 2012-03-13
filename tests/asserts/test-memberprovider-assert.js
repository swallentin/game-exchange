var assert = require('assert');
var data = require('../../data/members.json');
var MemberProvider = require('../../lib/dataproviders/memory/memberprovider-memory.js');

var provider = MemberProvider.create(data);

// test that
assert.ok( provider !== undefined );

provider.findByFacebookId('664271190', function (err, doc) {
  assert.ok(err == null);
  assert.ok(doc !== null);
  assert.ok(doc !== undefined);
});

var promise = provider.findOrCreateUser(null, null, null, {fbId:664271190 });

console.log('No tests failed.');