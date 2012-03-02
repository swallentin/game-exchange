var mongoose = require('mongoose').Mongoose;

mongoose.model('User', {
  properties: ['login', 'role'],
  
  indexes: ['login'],
  
});

var Game = new Schema({
  owner: ObjectID,
  title: String
});

var Owner = new Schema({
  
});

var Tag = new Schema({
  
});

