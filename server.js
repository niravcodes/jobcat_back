const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = require('./config/keys').mongoURI
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err))

//routes
const login = require('./routes/users/login')
const register = require('./routes/users/register')
const auth = require('./routes/users/auth')
const info = require('./routes/users/info')
const avatar = require('./routes/users/avatar')
const resumeUpdate = require('./routes/users/resume')
const searxh = require('./routes/search/search')
const newpost = require('./routes/posts/newpost')
const getpost = require('./routes/posts/getposts')
const getmessages = require('./routes/messages/getmessages')
const sendmessage = require('./routes/messages/newmessage')
app.use('/users/login', login)
app.use('/users/register', register)
app.use('/users/auth', auth)
app.use('/users/info', info)
app.use('/users/avatar', avatar)
app.use('/search', searxh)
app.use('/users/resume', resumeUpdate)
app.use('/posts/newpost', newpost)
app.use('/posts/getposts', getpost)
app.use('/msg/getmessages', getmessages)
app.use('/msg/sendmessage', sendmessage)


app.use('/images', express.static('images'))

const port = 3000;
app.listen(port, () => console.log("Running on 3000"));