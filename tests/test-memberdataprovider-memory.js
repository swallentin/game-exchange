var testCase  = require('nodeunit').testCase;
var data = require('../data/members.json');
var Provider = require('../lib/dataprovider-memory');


exports['data provider'] = testCase({

  setUp: function (callback) {
    this.dataProvider = Provider.create(data);
    callback();
  },

  tearDown: function(callback) {
    callback();
  },

  'test creating a memberprovider': function (test) {
    test.notEqual(this.dataProvider, undefined );
    test.done();
  },

  'test find an item by id': function(test) {
    this.dataProvider.findById(0, function(err, doc){
      test.notEqual(doc, undefined);
      test.equal(doc.title, "2010 FIFA World Cup South Africa");
      test.equal(doc.wiki, "/wiki/2010_FIFA_World_Cup_South_Africa_(video_game)");
    });
    test.done();
  },

  'test find all games': function(test) {
    this.dataProvider.findAll( function(err, docs) {
      test.notEqual(docs, undefined);
      test.notEqual(docs.length, 0);
    });
    test.done();
  },

  'test save an none existing game': function(test){

    var self = this;
    var game = {
      title: 'A Game',
      wiki: '/wiki'
    };

    self.dataProvider.save(game, function(err, docs){
      test.equal(err, null);
      test.notEqual(docs[0], undefined);
    });
    test.done();

  },

  'test delete a game': function(test) {

    var self = this;
    self.dataProvider.deleteById(12, function(err, doc){
      test.equal(err, undefined);
      test.notEqual(doc, null);
      self.dataProvider.findById(12, function(err, doc){
        test.notEqual(err, null);
        test.equals(err.message, "Could not find item by id. Item does not exist.");
      });
    });

  }
});