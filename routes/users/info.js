const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const jwtdecode = require('jwt-decode')

const checkToken = (req, res, next) => {
    const header = req.headers.authorization;
    console.log(header)

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        console.log(token)
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        console.log("shit")
        res.sendStatus(403)
    }
}

router.post('/', checkToken, (req, res, next) => {
    jwt.verify(req.token, keys.secret, (err) => {
        if (err) {
            res.sendStatus(403);
            console.log("shit")
        }
        else {
            let user = ""
            if (!req.body.requested)
                user = jwtdecode(req.token);
            else
                user = { name: req.body.requested };
            console.log(user.name)
            User.findOne({ name: user.name }).then((usr) => { console.log("boobies"); console.log(usr); res.json(usr) }).catch();
        }
    });
})

module.exports = router