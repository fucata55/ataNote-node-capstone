const express = require('express');
const app = express();

const mongoose= require('mongoose');
mongoose.Promise = global.Promise;

const {User} = require('../models');

//continue CRUD. follow https://github.com/fucata55/node-restaurants-app-mongoose/blob/master/server.js
