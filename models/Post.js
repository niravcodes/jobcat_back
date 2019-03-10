const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    post: {
        type: String,
        required: true
    }
})

module.exports = Post = mongoose.model('posts', PostSchema);