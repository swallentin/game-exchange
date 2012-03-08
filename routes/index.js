var fs = require('fs')
  , DataProvider = require('../lib/dataprovider-memory');

exports = module.exports = Routes;

function Routes(app) {
  var _application = app;
  
  var gameProvider = DataProvider.create(require('../data/games.json'));
  var tagProvider = DataProvider.create(require('../data/tags.json'));
    
  var by_id = function(provider, req, res, callback) {
    var id = req.params.id;
    provider.findById(id, function(error, doc){
      callback(error, doc);
    });
  };
  
  return {
    register: function() {
      var app = _application;
      // games
      app.get('/', this.index);
      app.get('/games', this.games);
      app.get('/games/edit', this.edit_game);
      app.get('/games/:id', this.game);
      app.get('/games/:id/edit', this.edit_game);
      app.put('/games/:id', this.put_game);
      // tags
      app.get('/tags', this.tags);
      app.get('/tags/edit', this.edit_tag);
      app.get('/tags/:id', this.tag);
      app.get('/tags/:id/edit', this.edit_tag);
      app.put('/tags/:id', this.put_tag);
    },
    
    index: function(req, res) {
     gameProvider.findAll(function(err, games){
       tagProvider.findAll(function(err, tags){
         res.render('index.jade',
           {
             locals: {
               title: 'Welcome to Foundation using Express with Jade and Stylus.',
               games: games,
               tags: tags
           }
         });  
       })
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
      by_id(gameProvider, req, res, function(error, doc) {
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
      by_id(gameProvider, req, res, function(err, doc){
        res.render('games/edit.jade', {
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
    },
    
    tags: function(req, res) {
      tagProvider.findAll(function(error, docs){
        res.render('tags/tags.jade', {
          locals: {
            title: 'Welcome to Foundation using Express with Jade and Stylus.',
            tags: docs
          }
        });
      });
    },
    
    tag: function(req, res) {
      by_id(tagProvider, req, res, function(error, doc) {
        res.render('tags/tag.jade',
        {
          locals: {
            title: doc.title,
            tag: doc
          }
        });
      });
    },
    
    edit_tag: function(req, res) {
      by_id(tagProvider, req, res, function(err, doc){
        res.render('tags/edit.jade', {
          locals: {
            title: 'Add a new tag',
            tag: doc || {}
          }
        });
      });
    },
    
    put_tag: function(req, res) {
      var tag = req.body.tag;
      tag._id = req.params.id === 'undefined'? undefined : req.params.id;

      tagProvider.save(tag, function(err, tags) {
        res.redirect('/tags/'+tags[0]._id);
      });
    }
    
  }
}