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
            const shortname = shortid.generate()
            var form = new formidable.IncomingForm();
            form.parse(req);

            form.on('fileBegin', function (name, file) {
                file.path = __dirname + '/../../images/' + shortname;
            });

            form.on('file', function (name, file) {
                const filename = jwtdecode(req.token).name + "." + file.name.split('.').pop();

                fs.stat(__dirname + '/../../images/' + filename, function (err, stats) {
                    console.log(stats);//here we got all information of file in stats variable

                    if (err) {
                        return console.error(err);
                    }

                    fs.unlink(__dirname + '/../../images/' + filename, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                });

                fs.move(__dirname + "/../../images/" + shortname, __dirname + "/../../images/" + filename, () => {
                    User.findOneAndUpdate({ name: jwtdecode(req.token).name }, { $set: { avatar: filename } })
                        .then((usr) => { console.log(usr); res.sendStatus(200) })
                        .catch(() => { res.sendStatus(401) })
                })
            });
        };
    });
})

module.exports = router