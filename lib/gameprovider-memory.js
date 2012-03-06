var gameCounter = 0;

GameProvider = function(data){
  this.data = data;
  
  // setup ._id for all data
  for(;gameCounter < this.data.length; gameCounter++) {
    this.data[gameCounter]['_id'] = gameCounter;
  }
};
GameProvider.prototype.data = [];

GameProvider.prototype.findAll = function(callback) {
  callback(null, this.data);
};

GameProvider.prototype.findById = function(id, callback) {
  var result = null;
  for (var i=0; i < this.data.length; i++) {
    var item = this.data[i];
    if( item._id == id) {
      result = item;
      break;
    }
  };
  callback(null, result);
};

GameProvider.prototype.delete = function(id, callback) {
  var item = null;
  for (var i=0; i < this.data.length; i++) {
    item = this.data[i];
    if(item_i._id == id) {
      item = data.splice(i, 1);
      break;
    }
    if(item == null)
      callback(new Error('Item does not exist.'), item);
    return callback(null, item);
  };
};
 
GameProvider.prototype.save = function(games, callback) {
  var game = null;
  var test = undefined;
  
  if( typeof(games.length) == "undefined" ){
    games = [games];
  }
  
  var isNotExistingGame;
  for (var i=0; i < games.length; i++) {
    game = games[i];

    isNotExistingGame = game._id === undefined;
    if( isNotExistingGame ) {
      game._id = gameCounter++;
    }
    
    game.created_at = new Date();
    
    if(games.comments === undefined){
      games.comments = [];
    }
    
    for (var j=0; j < games.comments.length; j++) {
      games.comments[j].created_at = new Date();
    }
    var index = isNotExistingGame ? this.data.length : game._id;
    this.data[index] = game;
  }
  callback(null, games);
};

exports.GameProvider = GameProvider;
