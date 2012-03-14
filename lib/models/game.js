var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var GameSchema = new Schema({
  'name': { type: String},
  'description': { type: String }
});

mongoose.model('Game', GameSchema);

module.exports = mongoose.model('Game');
