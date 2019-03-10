const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    to: {
        type: String,
        required: true,
        lowercase: true,
    },
    from: {
        type: String,
        required: true
        , lowercase: true,
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = Message = mongoose.model('messages', MessageSchema);