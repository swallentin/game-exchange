var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
  'name': { type: String},
  'description': { type: String }
});

mongoose.model('Tag', TagSchema);

module.exports  = mongoose.model('Tag');
