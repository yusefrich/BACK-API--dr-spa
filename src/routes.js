const express = require ('express');
const UserController = require('./controllers/UserController');
const RoleController = require('./controllers/RoleController');
const AddressController = require('./controllers/AddressController');
const AuthController = require('./controllers/AuthController');
const auth = require('./middleware/auth')

const routes = express.Router();

/* routes.get('/login', AuthController.login); */

routes.get('/roles', RoleController.index);
routes.post('/roles', RoleController.store);
routes.delete('/roles/:name',auth, RoleController.delete);

routes.get('/users', UserController.index);
routes.get('/users/:user_id', UserController.single);
routes.put('/users/:user_id', auth, UserController.update);
routes.post('/signin', UserController.signin);
routes.post('/:role_name/signup', UserController.store);
routes.delete('/users/:user_id',auth, UserController.delete);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', auth, AddressController.store);
routes.put('/users/:user_id/addresses/:adress_id', auth, AddressController.update);

module.exports = routes;