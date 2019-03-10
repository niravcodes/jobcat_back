const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User.js')
const validator = require('validator')
const formidable = require('formidable')
const shortid = require('shortid')
const fs = require('fs-extra')
const jwt = require('jsonwebtoken')
const jwtdecode = require('jwt-decode')
const keys = require('../../config/keys')

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
            console.log(req.body.resume)

            User.findOneAndUpdate({ name: jwtdecode(req.token).name }, { $set: { resume: req.body.resume } })
                .then((usr) => { console.log(usr); res.sendStatus(200) })
                .catch(() => { res.sendStatus(401) })
        }
    });
})

module.exports = router