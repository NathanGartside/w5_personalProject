const routes = require('express').Router();

routes.use('/accounts', require('./accounts'))

module.exports = routes;