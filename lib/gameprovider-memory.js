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
    if( item._id = id) {
      result = item;
      break;
    }
  };
  callback(null, result);
};
 
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
var mockupData = [{
  title: 'Game one', 
  information: 'Body one', 
  comments: 
    [{
      author:'Troll One', 
      comment:'I love it'
    }, 
    {
      author:'Troll Two', 
      comment:'This is rubbish!'
    }]
},
{
  title: 'Game two', 
  information: 'Body two'
},
{
  title: 'Game three', 
  information: 'Body three'
}];

new GameProvider().save(mockupData, function(error, games){});
  
exports.GameProvider = GameProvider;
  