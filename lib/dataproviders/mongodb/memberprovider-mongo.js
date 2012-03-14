var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
   'name': { type: String},
   'username': { type: String },
   'tags': [String],
   'games': [String],
   'facebook': {}
});

mongoose.model('User', UserSchema);

var User = exports.User = mongoose.model('User');

var MemberProvider = function(){};

MemberProvider.prototype.findAll = function(callback) {
  User.find({}, function(err, docs){
    callback(null, docs);
  });
};

MemberProvider.prototype.findById = function(id, callback) {
  User.findById(id, function(err, doc){
    callback(null, doc);
  });
};

MemberProvider.prototype.save = function(doc, callback) {
  doc.save(function(err){
    callback(err);
  });
};

MemberProvider.prototype.remove = function(doc, callback){
  User.remove({_id: doc._id}, function(){
    callback();
  });
};

MemberProvider.prototype.findByFacebookId = function(fbId, callback) {

  User.find({"facebook.id": fbId.toString() }, function(err, doc){
    if(err) throw err;

    callback(null, doc);
  });
};

MemberProvider.prototype.findByUsername = function(username, callback) {
  User.findOne({username: username}, function(err, docs){
    callback(null, docs);
  });
};

MemberProvider.prototype.createFacebookUser = function(fbUserMetadata){
  return User({
    name: fbUserMetadata.name,
    username: fbUserMetadata.username,
    games: [],
    tags: [],
    following: [],
    facebook: fbUserMetadata
  });
};

exports.MemberProvider = MemberProvider;