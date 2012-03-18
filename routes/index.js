var Routes = function (_app, _tagProvider, _gameProvider, _memberProvider, db) {
  var app = _app;
  var tagProvider = _tagProvider;
  var gameProvider = _gameProvider;
  var memberProvider = _memberProvider;

  var by_id = function(id, provider, req, res, callback) {
    provider.findById(id, function(error, doc){
      callback(error, doc);
    });
  };
  var by_title = function(title, provider, req, res, callback) {
    provider.findByTitle(title, function(error, doc){
      callback(error, doc);
    });
  };
  
  return {
    register: function() {

      // index
      app.get('/', this.index);

      // games
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

     // profile
      app.get('/profile/:username', this.profile_by_username);
      app.get('/profile/:username/edit', this.profile_edit);
      app.get('/profile', this.profile);

      app.get('/debug/profile/all', this.debug_profile_all);
      app.get('/debug/profile/:id', this.debug_profile);
      

    },
    
    index: function(req, res) {
     gameProvider.findAll(function(err, games){
       tagProvider.findAll(function(err, tags){
         memberProvider.findAll(function(err, profiles){
            res.render('index.jade',
              {
                locals: {
                  title: 'Welcome to Foundation using Express with Jade and Stylus.',
                  games: games,
                  tags: tags,
                  profiles: profiles
              }
            });   
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
      var id = req.params.id;
      by_id(id, gameProvider, req, res, function(error, doc) {
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
      var id = req.params.id;
      by_id(id, gameProvider, req, res, function(err, doc){
        res.render('games/edit.jade', {
          locals: {
            title: 'Add a new game',
            game: doc || {}
          }
        });
      });
    },
    
    put_game: function(req, res) {
      var game = new gameProvider.Game(req.body.game);
      game._id = req.params.id;

      gameProvider.update(game, function(err  ) {
        res.redirect('/games/'+game._id);
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
      var id = req.params.id;
      by_id(id, tagProvider, req, res, function(error, doc) {
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
      var id = req.params.id;
      by_id(id, tagProvider, req, res, function(err, doc){
        res.render('tags/edit.jade', {
          locals: {
            title: 'Add a new tag',
            tag: doc || {}
          }
        });
      });
    },
    
    put_tag: function(req, res) {
      var tag = new tagProvider.Game(req.body.tag);
      tag._id = req.params.id;

      tagProvider.update(tag, function(err, tags) {
        res.redirect('/tags/'+tags[0]._id);
      });
    },

    profile: function(req, res) {
      
      if(!req.session.auth) {
        res.redirect('/auth/facebook');
        return;
      }
      var username = req.session.auth.facebook.user.username;
      if(!username)
        username = req.session.auth.facebook.user.id;

      res.redirect('/profile/' + username);

    },
    
    profile_by_username: function(req, res) {

      var username = req.params.username;
      
      // res.send(req.session.auth.facebook.user.id);
       
      memberProvider.findByUsername(username, function (err, doc) {        
        res.render('profile/index.jade', {
          locals: {
            title: 'Profile',
            profile: doc
          }
        });
      });
    },
    
    debug_profile_all: function(req, res) {

      memberProvider.findAll(function (err, docs) {        
        res.send(docs);
      });
    },
    
    debug_profile: function(req, res) {

      var id = req.params.id;
      
      memberProvider.findByFacebookId(id, function (err, doc) {
        res.send(doc);
      });
    }
  }
};

module.exports = Routes;