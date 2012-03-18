var siteConf = require('./lib/getConfig');

var express = require('express')
  , everyauth = require('everyauth')
  , util = require('util')
  , conf = require("./conf")
  , RedisStore = require('connect-redis')(express);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

var TagProvider = require('./lib/dataproviders/mongodb/tagprovider-mongo.js').TagProvider;
var GameProvider = require('./lib/dataproviders/mongodb/gameprovider-mongo.js').GameProvider;
var MemberProvider = require('./lib/dataproviders/mongodb/memberprovider-mongo.js').MemberProvider;

var memberProvider = new MemberProvider();
var gameProvider = new GameProvider();
var tagProvider = new TagProvider();

var Authentication = require('./lib/authentication').Authentication;

var app = module.exports = express.createServer();

var authentication = new Authentication(memberProvider, everyauth, app, conf);

var routes = require('./routes')(app, tagProvider, gameProvider, memberProvider);

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
  app.use(express.session({ secret: 'lolcatz', store: new RedisStore}));
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

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


var close = function(type){
  console.log(type);
  console.log('Closing application.');
  mongoose.disconnect();
  console.log('Mongoose disconnected');
}

process.on('SIGINT', function(){
  close('SIGINT');
});
process.on('SIGTERM', function(){
  close('SIGTERM')
});


