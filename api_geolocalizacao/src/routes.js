const { Router } = require('express');
const MecanicaController = require('./controllers/MecanicaController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/mecanicas', MecanicaController.get);
routes.post('/mecanincas', MecanicaController.post);

//busca mecanincas
routes.get('/search', SearchController.get);

module.exports = routes;