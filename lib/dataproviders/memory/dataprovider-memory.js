var DataProvider = function(data){
  this.innerData = data;
  var item = null;
  this._private = {};
  this._private.index = this.innerData.length;
  
  for(var index = 0;index < this.innerData.length; index++) {
    item = this.innerData[index];
    item._id = index;
    
    if( item.created_at === undefined ) {
      item.created_at = new Date();
    }
  }
};

DataProvider.prototype.innerData = [];

DataProvider.prototype.findAll = function(callback) {
  callback(null, this.innerData);
};

DataProvider.prototype.generateId = function() {
  return this._private.index++;
};

DataProvider.prototype.findByTitle = function(title, callback) {
  var result = null;
  var innerData = this.innerData;

  for (var i=0; i < innerData.length; i++) {
    var item = innerData[i];
    if( item.title == title) {
      result = item;
      break;
    }
  }

  if(result == null) {
    callback(new Error('Could not find item by title. No item exists with the provided title.'), title);
    return;
  }

  callback(null, result);
};

DataProvider.prototype.findById = function(id, callback) {
  var result = null;
  var innerData = this.innerData;
  
  for (var i=0; i < this.innerData.length; i++) {
    var item = innerData[i];
    if( item._id == id) {
      result = item;
      break;
    }
  }

  if(result == null) {
    callback(new Error('Could not find item by id. Item does not exist.'), id);
    return;
  }

  callback(null, result);
};

DataProvider.prototype.deleteById = function(id, callback) {
  var result = null;
  var innerData = this.innerData;
  
  for (var i=0; i < innerData.length; i++) {
    result = innerData[i];
    if(result._id == id) {
      result = innerData.splice(i, 1);
      break;
    }
  }

  if(result == null) {
    callback(new Error('Item does not exist.'), id);
    return;
  }

  callback(null, result);
};

DataProvider.prototype.save = function(items, callback) {

  if( typeof(items.length) == "undefined" ){
    items = [items];
  }
  
  var item = null;
  var isNotExistingData;
  var innerData = this.innerData;

  for (var i=0; i < items.length; i++) {
    item = items[i];

    isNotExistingData = item._id === undefined;
    if( isNotExistingData ) {
      item._id = this.generateId();
    }
    
    item.created_at = new Date();

    // If the item does not have an id use the innerDate length, else re-use it's id.
    // The id's are index based.
    var index = isNotExistingData ? innerData.length : item._id;
    innerData[index] = item;
  }
  callback(null, items);
};

exports.DataProvider = DataProvider;
