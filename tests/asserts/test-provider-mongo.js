var assert = require('assert');
var GameProvider = require('../../lib/dataproviders/mongodb/tagprovider-mongo.js').GameProvider;
var Game = require('../../lib/dataproviders/mongodb/tagprovider-mongo.js').Game;

var mongoose = require("mongoose");

var provider = new GameProvider;

// test that
assert.ok( provider !== undefined );

var game = new Game;
game.title = "FIFA 2012";
game.description = "EA Sports does it again with a smash hit fotball experience!";
