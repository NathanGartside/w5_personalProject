const routes = require('express').Router();
const baseController = require('../controllers/index')
const validator = require('../utilites/validation')
const { requiresAuth } = require('express-openid-connect');

routes.post('/', requiresAuth(), validator.newMessage, validator.checkValidation, baseController.createNewMessage);

routes.get('/:receiver', requiresAuth(), baseController.getMessagesForUsername);

routes.delete('/:id', requiresAuth(), baseController.deleteMessage);

module.exports = routes;