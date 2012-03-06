var routes = module = module.exports = Routes(app);

function Routes(app) {
  app.get('/', routes.index);
  app.get('/games', routes.games);
  app.get('/games/edit', routes.edit_game);
  app.get('/games/:id', routes.game);
  app.get('/games/:id/edit', routes.edit_game);
  app.put('/games/:id', routes.put_game);
}



