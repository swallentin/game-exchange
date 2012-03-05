var nodeunit = require('nodeunit');
var GameProvider = require('../lib/gameprovider-memory').GameProvider;

exports['read'] = nodeunit.testCase({
    setUp: function () {
        this.gameProvider = new GameProvider();
    },
    tearDown: function () {
      // reset
    },

    'test creating a gameprovider': function (test) {
      test.expect(gameProvider);
      test.done();
    },

    'anoterh test case': function (test) {
      // test
      test.done();
    }
});