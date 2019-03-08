const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User.js')
const validator = require('validator')

router.post('/', (req, res, next) => {
    //step 1 validation
    if (!validator.isEmail(req.body.email)
        || !validator.isLength(req.body.fullname, { min: 3, max: 20 })
        || !validator.isLength(req.body.name, { min: 3, max: 20 })
        || !validator.isLength(req.body.password, { min: 8, max: 50 })) {
        return res.status(401).json({ error: "invalidentries" });
    }

    //step 2
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(402).json({ error: "userexists" });
        }
        //error case
        else {
            console.log(req.body);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                fullname: req.body.fullname
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    })
})

module.exports = router