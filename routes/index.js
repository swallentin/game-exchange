var fs = require('fs');

exports = module.exports = Routes;

function Routes(app) {
  var _application = app;
  
  var GameProvider = require('../lib/gameprovider-memory').GameProvider;
  var data = JSON.parse(fs.readFileSync('/Users/stephanwallentin/development/github/game-exchange/data/games.json', 'utf-8'));
  var gameProvider = new GameProvider(data);
    
  var by_id = function(req, res, callback) {
    var id = req.params.id;
    gameProvider.findById(id, function(error, doc){
      callback(error, doc);
    });
  };
  
  return {
    register: function() {
      var app = _application;
      app.get('/', this.index);
      app.get('/games', this.games);
      app.get('/games/edit', this.edit_game);
      app.get('/games/:id', this.game);
      app.get('/games/:id/edit', this.edit_game);
      app.put('/games/:id', this.put_game);
    },
    index: function(req, res) {
     gameProvider.findAll(function(error, docs){
       res.render('index.jade',
       {
         locals: {
           title: 'Welcome to Foundation using Express with Jade and Stylus.',
           games: docs
         }
       });
     });
    },
    games: function(req, res) {
      gameProvider.findAll(function(error, docs){
        res.render('games/games.jade', {
          locals: {
            title: 'Welcome to Foundation using Express with Jade and Stylus.',
            games: docs
          }
        });
      });
    },
    game: function(req, res) {
      by_id(req, res, function(error, doc) {
        res.render('games/game.jade',
        {
          locals: {
            title: doc.title,
            game: doc
          }
        });
      });
    },
    edit_game: function(req, res) {
      by_id(req, res, function(err, doc){
        res.render('games/edit-game.jade', {
          locals: {
            title: 'Add a new game',
            game: doc || {}
          }
        });
      });
    },
    put_game: function(req, res) {
      var game = req.body.game;
      game._id = req.params.id === 'undefined'? undefined : req.params.id;

      gameProvider.save(game, function(err, games) {
        res.redirect('/games/'+games[0]._id);
      });
    }
  }
}