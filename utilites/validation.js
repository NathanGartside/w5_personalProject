const { check } = require('express-validator');
const { body, validationResult } = require('express-validator');

exports.newAccount = [
    check('username', 'Username must be a string').isString().notEmpty(),
    check('password', 'Password must be a string').isString().notEmpty(),
    check('email', 'Email must be a email').isString().notEmpty(),
    check('first_name', 'First Name must be a string').isString().notEmpty(),
    check('birthday', 'Birthday must be a string').isString().notEmpty(),
    check('last_name', 'Last Name must be a string').isString().notEmpty()
]

exports.newMessage = [
    check('receiver', 'Receiver must be a string').isString().notEmpty(),
    check('receiver_email', 'Receiver must be a email').isString().notEmpty(),
    check('subject', 'Subject must be a string').isString().notEmpty(),
    check('message', 'Message must be a string').isString().notEmpty()
]

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors[0].msg });
    }
    next()
}