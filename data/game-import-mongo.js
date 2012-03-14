var games = require('./games.json');
var mongoose = require('mongoose');

var GameProvider = require('../lib/dataproviders/mongodb/gameprovider-mongo.js').GameProvider;
var Game = require('../lib/dataproviders/mongodb/gameprovider-mongo.js').Game;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

var provider = new GameProvider;

games.forEach(function(item){
  var game = new Game;
  game.title = item.title;
  game.wiki = item.wiki;
  provider.save(game, function(){
    console.log(game.title + ' was saved.')
  });
});

mongoose.disconnect();



