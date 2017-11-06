var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.promise;

//const {PORT, DATABASE_URL} = require('./config')

//route urls
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const editorRouter = require('./routes/editorRouter');
const homeRouter = require('./routes/homeRouter');
const profileRouter = require('./routes/profileRouter')

app.use(express.static('public/pages'));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);
app.use('/register', registerRouter);


app.listen(process.env.PORT || 8081);

exports.app = app
