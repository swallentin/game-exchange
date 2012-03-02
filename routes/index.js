
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to Foundation using Express with Jade and Stylus.' })
};

// routes to add
// add/edit game
// remove game