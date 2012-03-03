var gameCounter = 0;

GameProvider = function(){};
GameProvider.prototype.dummyData = [];

GameProvider.prototype.findAll = function(callback) {
  callback(null, this.dummyData)
};

GameProvider.prototype.findById = function(id, callback) {
  var result = null;
  for (var i=0; i < this.dummyData.length; i++) {
    var item = this.dummyData[i];
    if( item._id == id) {
      result = item;
      break;
    }
  };
  callback(null, result);
};

GameProvider.prototype.delete = function(id, callback) {
  var item = null;
  for (var i=0; i < this.dummyData.length; i++) {
    item = this.dummyData[i];
    if(item_i._id == id) {
      item = dummyData.splice(i, 1);
      break;
    }
    if(item == null)
      callback(new Error('Item does not exist.'), item);
    return callback(null, item);
  };
}
 
GameProvider.prototype.save = function(games, callback) {
  var game = null;
  
  if( typeof(games.length) == "undefined" ){
    games = [games];
  }
  for (var i=0; i < games.length; i++) {
    game = games[i];
    game._id = gameCounter++;
    game.created_at = new Date();
    
    if(games.comments === undefined){
      games.comments = [];
    }
    
    for (var j=0; j < games.comments.length; j++) {
      games.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length] = game;    
  }
  callback(null, games);
};

var tags = [
  {
    name: "ps3"
  },
  {
    name: "action"
  }
];

var waiting = [
  {
    name:'Bob', 
    comment:'I really want to play'
  }
];

var mockupData = [{
  title: 'Game one', 
  information: 'Body one', 
  tags: tags,
  waiting: waiting
},
{
  title: 'Game two', 
  information: 'Body two'
},
{
  title: 'Game three', 
  information: 'Body three'
},
{
  title: 'Game four', 
  information: 'Body four'
}
];

new GameProvider().save(mockupData, function(error, games){});
  
exports.GameProvider = GameProvider;
  