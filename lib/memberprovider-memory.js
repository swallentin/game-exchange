var DataProvider = require('./dataprovider-memory');

MemberProvider = function(data){
  return DataProvider.create(data);
};
MemberProvider.prototype = DataProvider.DataProvider.prototype;

MemberProvider.prototype.findByFacebookId = function(fbId, callback) {
  var result = null;
  var innerData = this.innerData;

  for (var i=0; i < innerData.length; i++) {
    var item = innerData[i];
    if( item.fbId !== undefined &&
      item.fbId == fbId) {
      result = item;
      break;
    }
  }

  if(item == null) {
    callback(new Error('Could not find item by titel. No item exists with the provided titel.'), item);
   }

  callback(null, result);
};

exports.MemberProvider = MemberProvider;

exports.create = function(data){
  return new MemberProvider(data);
};
