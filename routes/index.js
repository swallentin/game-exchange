// var GameProvider = require('../lib/gameprovider-memory').GameProvider;
// var gameProvider = new GameProvider();

/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index.jade', {});
};

// exports.index = function(req, res) {
// 
//    // res.send('gameProvider.findAll() broken at the moment.');
//     // 
//     res.render('empty.jade');
//  gameProvider.findAll(function(error, docs){
//    res.render('index',
//    {
//      locals: {
//        title: 'Welcome to Foundation using Express with Jade and Stylus.',
//        games: docs
//      }
//    });
//  });
// };

// exports.games = function(req, res){
//     res.render('games.jade', {
//         locals: {
//             title: 'Games'
//         }
//     });
// };
// 
// exports.new_game = function(req, res) {
//   res.render('game_new.jade', { locals: {
//       title: 'Add a game'
//     }
//   });
// };
// 
// exports.post_new_game = function (req, res) {
//   gameProvider.save({
//     title: req.param('title'),
//     information: req.param('information')
//   }, function(error, docs){
//     res.redirect('/');
//   });
// };

// routes to add
// add/edit game
// remove game