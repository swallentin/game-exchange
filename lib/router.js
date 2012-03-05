var router = module = module.exports = function(app) {
    register(app);
};

function register(app) {
    app.get('/', routes.index);
    app.get('/game/new', routes.new_game);
    app.post('/game/new', routes.post_new_game);
}