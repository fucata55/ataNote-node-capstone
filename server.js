var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.promise;

//const {PORT, DATABASE_URL} = require('./config')


app.use(express.static('public'));
app.listen(process.env.PORT || 8082);

exports.app = app
