var Authentication = function (provider, everyauth, app, conf){

  var memberProvider = provider;

  // TODO: add debug using config
  everyauth.debug = true;

  var findOrCreateUser = function(session, accessToken, accessTokenExtra, fbUserMetadata){
    var promise = this.Promise();
    memberProvider.findByFacebookId( fbUserMetadata.id, function (err, user) {
      if( err ) {
        var newUser = memberProvider.createFacebookUser(fbUserMetadata);
        if(!newUser.username)
          newUser.username = fbUserMetadata.id;
        memberProvider.save(newUser, function (err, user) {
           if(err){
             promise.fail(newUser);
           }
           else {
             promise.fulfill(user);
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
