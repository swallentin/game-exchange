var DataProvider = require('./dataprovider-memory.js').DataProvider;

var MemberProvider = function(data) {
  return new DataProvider(data);
};

MemberProvider.prototype = DataProvider.prototype;

MemberProvider.prototype.findByFacebookId = function(fbId, callback) {
  var result = null;
  var innerData = this.innerData;

  for (var i=0; i < innerData.length; i++) {
    var item = innerData[i];
    if( item.facebook !== undefined &&
      item.facebook.id == fbId) {
      result = item;
      break;
    }
  }

  if(result == null) {
    callback(new Error('Could not find a user with fbId: ' + fbId), fbId);
    return;
   }

  callback(null, result);
};

MemberProvider.prototype.findByUsername = function(username, callback) {
  var result = null;
  var innerData = this.innerData;

  for (var i=0; i < innerData.length; i++) {
    var item = innerData[i];
    if( item.username !== undefined &&
      item.username == username) {
      result = item;
      break;
    }
  }

  if(result == null) {
    callback(new Error('Could not find a user with username: ' + username), username);
    return;
   }

  callback(null, result);
};

MemberProvider.prototype.createFacebookUser = function(fbUserMetadata){
  return {
    name: fbUserMetadata.name,
    username: fbUserMetadata.username,
    games: [],
    tags: [],
    following: [],
    facebook: fbUserMetadata
  };
};

exports.MemberProvider = MemberProvider;
