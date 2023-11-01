const { check } = require('express-validator');
const { body, validationResult } = require('express-validator');

exports.newAccount = [
    check('username', 'Username must be a string').isString().notEmpty(),
    check('password', 'Password must be a string').isString().notEmpty(),
    check('email', 'Email must be a email').isEmail().notEmpty(),
    check('first_name', 'First Name must be a string').isString().notEmpty(),
    check('birthday', 'Birthday must be a string').isString().notEmpty(),
    check('last_name', 'Last Name must be a string').isString().notEmpty(),
]

exports.checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors[0].msg });
    }
}