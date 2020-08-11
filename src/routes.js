const express = require ('express');
const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const AddressController = require('./controllers/AddressController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

/* routes.get('/login', AuthController.login); */

routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);

routes.get('/users', UserController.index);
routes.post('/signin', UserController.signin);
routes.post('/:role_name/signup', UserController.store);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

module.exports = routes;