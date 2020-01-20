const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//Definindo as Rotas (get, put, post, delete)
const routes = Router();

//tipos de parametros: 
//Query params (GET): request.query (filtros,ordenação, paginação)
//Route Params (PUT e DELETE): request.params (Identificar recurso na alteração ou remoção)
//Body (POST): request.body (Dados para criação ou alteração de um registro)

//index(lista), show (unico), store (criar), update(alterar), destroy(deletar)
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store );
routes.put('/devs/:id', DevController.update );
routes.delete('/devs/:id', DevController.destroy );

routes.get('/search', SearchController.index);

module.exports = routes;
