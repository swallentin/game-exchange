var DataProvider = require('./dataprovider-memory.js').DataProvider;

var TagProvider = function(data){
  return new DataProvider(data);
};

TagProvider.prototype = DataProvider.prototype;

TagProvider.prototype.getByUserId = function(id, callback) {
  var result = null;
  var innerData = this.innerData;
  for (var i=0; i < innerData.length; i++) {
    var item = innerData[i];
    if( item._id == id) {
      result = item;
      break;
    }
  }
  callback(null, result);
};

exports.TagProvider = TagProvider;
