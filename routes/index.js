const routes = require('express').Router();

routes.use('/accounts', require('./accounts'))
routes.use('/messages', require('./messages'))

module.exports = routes;