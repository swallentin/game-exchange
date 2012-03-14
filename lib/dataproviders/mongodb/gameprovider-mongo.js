var mongoose = require('mongoose');

//var Tag = require('./tag').Tag;

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  'title': { type: String},
  'description': { type: String },
  'wiki': { type: String}
});

mongoose.model('Game', GameSchema);

var Game = exports.Game = mongoose.model('Game');

var GameProvider = function(){};

GameProvider.prototype.Game = Game;

GameProvider.prototype.findAll = function(callback) {
  Game.find({}, function(err, docs){
    callback(null, docs);
  });
};

GameProvider.prototype.findByTitle = function(title, callback) {
  Game.find({title: title}, function(err, docs){
    callback(null, docs);
  });
};

GameProvider.prototype.findById = function(id, callback) {
  Game.findById(id, function(err, doc){
    callback(null, doc);
  });
};

GameProvider.prototype.save = function(doc, callback) {
  doc.save(function(err){
    callback(err);
  });
};

GameProvider.prototype.update= function(doc, callback) {
  Game.findById(doc._id, function(err, game){
    if(err) throw err;
      game.title = doc.title;
      game.save(function(err){
        callback();
      });
  });
};


GameProvider.prototype.remove = function(doc, callback){
  Game.remove({_id: doc._id}, function(){
    callback();
  });
};

exports.GameProvider = GameProvider;