const routes = require('express').Router();
const baseController = require('../controllers/index')

routes.get('/', baseController.getAll);

routes.get('/:id', baseController.getSingle);

routes.post('/', baseController.addAccount);

routes.put('/:id', baseController.updateAccount);

routes.delete('/:id', baseController.deleteAccount);

module.exports = routes;