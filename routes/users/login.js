const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const User = require('../../models/User.js')


router.post('/', (req, res, next) => {
    const errors = {};
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(401).json(errors);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                //Credentials matched
                payload = { id: user.id, name: user.name, email: user.email };

                jwt.sign(payload, keys.secret, { expiresIn: 36000 * 100 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            } else {
                errors.password = 'Password Incorrect';
                return res.status(402).json(errors);
            }
        });
    }).catch(); //error of find one
})

module.exports = router