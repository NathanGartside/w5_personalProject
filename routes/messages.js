const routes = require('express').Router();
const baseController = require('../controllers/index')
const validator = require('../utilites/validation')

routes.post('/', validator.newMessage, validator.checkValidation, baseController.createNewMessage);

routes.get('/:receiver', baseController.getMessagesForUsername);

routes.delete('/:id', baseController.deleteMessage);

module.exports = routes;