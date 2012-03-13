var siteConf = require('./lib/getConfig');

var express = require('express')
  , everyauth = require('everyauth')
  , util = require('util')
  , conf = require("./conf");

var DataProvider = require('./lib/dataproviders/memory/dataprovider-memory.js').DataProvider;
var MemberProvider = require('./lib/dataproviders/memory/memberprovider-memory.js').MemberProvider;
var Authentication = require('./lib/authentication').Authentication;

var app = module.exports = express.createServer();

var memberProvider = new MemberProvider(require('./data/members.json'));
var gameProvider = new DataProvider(require('./data/games.json'));
var tagProvider = new DataProvider(require('./data/tags.json'));

var authentication = new Authentication(memberProvider, everyauth, app, conf);

var routes = require('./routes')(app, tagProvider, gameProvider, memberProvider );

// Configuration
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  // app.use(express.favicon());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'lolcatz'}));
  app.use(everyauth.middleware());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


routes.register();
// Routes
// 
// app.get('/empty', function(req, res){
//   res.render('empty.jade', {});
// });
// 
// 
// app.get('/', routes.index);
// app.get('/games', routes.games);
// app.get('/games/edit', routes.edit_game);
// app.get('/games/:id', routes.game);
// app.get('/games/:id/edit', routes.edit_game);
// app.put('/games/:id', routes.put_game);


// app.get('/game/edit/:id', routes.edit_game);


// app.post('/games/new', routes.post_new_game);

// app.get('/', function (req, res) {
//   res.render('home');
// });

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
