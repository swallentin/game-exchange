var dataCounter = 0;

var DataProvider = function(data){
  this.innerData = data;
  
  // setup ._id for all data and also created date.
  var item;
  for(;dataCounter < this.innerData.length; dataCounter++) {
    item = this.innerData[dataCounter];
    item._id= dataCounter;
    
    if( item.created_at === undefined ) {
      item.created_at = new Date();
    }
  }
};

DataProvider.prototype.innerData = [];

DataProvider.prototype.findAll = function(callback) {
  callback(null, this.innerData);
};

DataProvider.prototype.findById = function(id, callback) {
  var result = null;
  for (var i=0; i < this.innerData.length; i++) {
    var item = this.innerData[i];
    if( item._id == id) {
      result = item;
      break;
    }
  };
  callback(null, result);
};

DataProvider.prototype.delete = function(id, callback) {
  var item = null;
  for (var i=0; i < this.innerData.length; i++) {
    item = this.innerData[i];
    if(item_i._id == id) {
      item = innerData.splice(i, 1);
      break;
    }
    if(item == null)
      callback(new Error('Item does not exist.'), item);
    return callback(null, item);
  };
};
 
DataProvider.prototype.save = function(items, callback) {
  var item = null;
  
  if( typeof(items.length) == "undefined" ){
    items = [items];
  }
  
  var isNotExistingData;
  for (var i=0; i < items.length; i++) {
    item = items[i];

    isNotExistingData = item._id === undefined;
    if( isNotExistingData ) {
      item._id = dataCounter++;
    }
    
    item.created_at = new Date();
    
    var index = isNotExistingData ? this.innerData.length : item._id;
    this.innerData[index] = item;
  }
  callback(null, items);
};

exports.DataProvider = DataProvider;

exports.create = function(data) {
  return new DataProvider(data);
}
