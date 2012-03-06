exports = module.exports = Authentication;

exports.create = function(everyauth, app, conf) {
  return new Authentication(everyauth, app, conf);
}

Authentication.prototype.dummyData = [];

var authentication = Authentication.prototype;

/*
  Used if you need inheritance.
authentication.__proto__ = {};

*/

function Authentication(everyauth, app, conf) {
  var self = this;
  var usersById = {};
  var nextUserId = 0;
  var usersByFbId = {};
  
  // TODO: Add debug check using config.
  everyauth.debug = true;
  
  var addUser = function (source, sourceUser) {
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
  };

  // due to the scope of addUser (public privileged method with access to privates) 
  this.addUser = addUser;
  
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
      
    everyauth.helpExpress(app);
};