const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const jwtdecode = require('jwt-decode')
const keys = require('../../config/keys')
const Message = require('../../models/Message.js')

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
            const newPost = new Message({
                from: jwtdecode(req.token).name,
                to: req.body.to,
                message: req.body.message
            })

            newPost
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
})

module.exports = router