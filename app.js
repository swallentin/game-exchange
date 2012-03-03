var express = require('express')
  , routes = require('./routes')
  , everyauth = require('everyauth')
  , util = require('util')
  , conf = require("./conf");

everyauth.debug = true;

var app = module.exports = express.createServer();

var usersById = {};
var nextUserId = 0;
var usersByFbId = {};

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });


everyauth
  .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokenExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] ||
        (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');


    everyauth
      .password
        .loginWith('email')
        .getLoginPath('/login')
        .postLoginPath('/login')
        .loginView('login.jade')
    //    .loginLocals({
    //      title: 'Login'
    //    })
    //    .loginLocals(function (req, res) {
    //      return {
    //        title: 'Login'
    //      }
    //    })
        .loginLocals( function (req, res, done) {
          setTimeout( function () {
            done(null, {
              title: 'Async login'
            });
          }, 200);
        })
        .authenticate( function (login, password) {
          var errors = [];
          if (!login) errors.push('Missing login');
          if (!password) errors.push('Missing password');
          if (errors.length) return errors;
          var user = usersByLogin[login];
          if (!user) return ['Login failed'];
          if (user.password !== password) return ['Login failed'];
          return user;
        })

        .getRegisterPath('/register')
        .postRegisterPath('/register')
        .registerView('register.jade')
    //    .registerLocals({
    //      title: 'Register'
    //    })
    //    .registerLocals(function (req, res) {
    //      return {
    //        title: 'Sync Register'
    //      }
    //    })
        .registerLocals( function (req, res, done) {
          setTimeout( function () {
            done(null, {
              title: 'Async Register'
            });
          }, 200);
        })
        .validateRegistration( function (newUserAttrs, errors) {
          var login = newUserAttrs.login;
          if (usersByLogin[login]) errors.push('Login already taken');
          return errors;
        })
        .registerUser( function (newUserAttrs) {
          var login = newUserAttrs[this.loginKey()];
          return usersByLogin[login] = addUser(newUserAttrs);
        })

        .loginSuccessRedirect('/')
        .registerSuccessRedirect('/');

// Configuration

app.configure(function(){

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

everyauth.helpExpress(app);

// Routes

app.get('/', routes.index);
app.get('/game/new', routes.new_game);
app.post('/game/new', routes.post_new_game);

// app.get('/', function (req, res) {
//   res.render('home');
// });

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
