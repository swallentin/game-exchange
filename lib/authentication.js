var User = require('./dataproviders/mongodb/memberprovider-mongo.js').User;

var Authentication = function (provider, everyauth, app, conf){

  var memberProvider = provider;

  // TODO: add debug using config
  everyauth.debug = true;

  var findOrCreateUser = function(session, accessToken, accessTokenExtra, fbUserMetadata){
    var promise = this.Promise();
    memberProvider.findByFacebookId( fbUserMetadata.id, function (err, user) {
      if( 0 == user.length ) {
        var newUser = new User;
        newUser.name = fbUserMetadata.name;
        newUser.username = fbUserMetadata.username || fbUserMetadata.id;
        newUser.tags = [];
        newUser.games = [];
        newUser.facebook = fbUserMetadata;

        memberProvider.save(newUser, function (err) {
           if(err){
             promise.fail(newUser);
           }
           else {
             promise.fulfill(newUser);
           }
        });
      }
      else {
        promise.fulfill(user);
      }
    });
    return promise;
  };

  everyauth
    .facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser(findOrCreateUser)
    .redirectPath('/profile');

  everyauth.helpExpress(app);
};

exports.Authentication = Authentication;
