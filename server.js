var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {
    User
} = require('../models');

//const {PORT, DATABASE_URL} = require('./config')


app.use(express.static('public'));
app.use('/login', loginRouter);
app.use('/register', registerRouter);


app.listen(process.env.PORT || 8081, () => console.log('app is listening'));

Get a note
app.get('/user/notes/:id', (req, res) => {

})


exports.app = app
