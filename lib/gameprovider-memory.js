var DataProvider = require('./dataprovider-memory').DataProvider;
var data = require('../data/games.json');

GameProvider = function(){
  var data = {};
  return new DataProvider(data);
};

GameProvider.prototype = DataProvider.prototype;

GameProvider.prototype.getByUserId = function(id, callback) {
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

exports.GameProvider = GameProvider;
