const routes = require('express').Router();
const baseController = require('../controllers/index')
const validator = require('../utilites/validation')

routes.get('/', baseController.getAll);

routes.get('/:id', baseController.getSingle);

routes.post('/', validator.newAccount, validator.checkValidation, baseController.addAccount);

routes.put('/:id', validator.newAccount, validator.checkValidation, baseController.updateAccount);

routes.delete('/:id', baseController.deleteAccount);

module.exports = routes;