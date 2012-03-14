var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  'name': { type: String},
  'username': { type: String },
  'tags': [String],
  'games': [String]
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');