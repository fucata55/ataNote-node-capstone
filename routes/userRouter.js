const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {
    User
} = require('../models');


//find by ID or username
app.get('/')

//pretend receving request to from triggers at home.html
app.get('user/note/:id')
