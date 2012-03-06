var testCase  = require('nodeunit').testCase;
var fs = require('fs');

var load = function(path){
  var data = JSON.parse(fs.readFileSync(path, 'utf8'));
  return data;
}

var data = load('../data/games.json');
var Provider = require('../lib/dataprovider-memory');


exports['data provider'] = testCase({
  
  setUp: function (callback) {
    this.gamesProvider = Provider.create(data);
    callback();
  },
  
  tearDown: function(callback) {
    callback();
  },
  
  'test creating a gameprovider': function (test) {
    test.notEqual(this.gamesProvider, undefined )
    test.done();
  },
  
  'test get a game by id': function(test) {
    this.gamesProvider.findById(0, function(err, doc){
      test.notEqual(doc, undefined);
      test.equal(doc.title, "2010 FIFA World Cup South Africa");
      test.equal(doc.wiki, "/wiki/2010_FIFA_World_Cup_South_Africa_(video_game)");
    });
    test.done();
  },
  
  'test all games': function(test) {
    this.gamesProvider.findAll( function(err, docs) {
      test.notEqual(docs, undefined);
      test.notEqual(docs.length, 0);
    });
    test.done();
  },
  
  'test save an none existing game': function(test){
    var game = {
      title: 'A Game',
      wiki: '/wiki'
    };
    this.gamesProvider.save(game, function(err, doc){
      test.notEqual(doc._id, undefined);
    });
    test.done();
  },
  
  'test delete a game': function(test) {
    // test needs to be implemented
    test.expect(0);
    test.done();
  }
  
});