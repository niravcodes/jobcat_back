const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    }
    ,
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    resume: {
        study: [{ type: String }],
        work: [{ type: String }],
        intern: [{ type: String }],
        interests: [{ type: String }],
        detail: { type: String },
        required: false
    },
})

module.exports = User = mongoose.model('users', UserSchema);