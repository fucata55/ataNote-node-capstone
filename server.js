var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const {
    User
} = require('../models');

//const {PORT, DATABASE_URL} = require('./config')


app.use(express.static('public'));


//integrate JWT token and passport
app.post('/user/signup', (req, res) => {
    //check if username used to registered unique in database
    if (User.findOne({
            username: req.body.username
        })) {
        //if registration fails, alert the reason
        const message = `registration is failed because username ${account.username} is already exist`;
        alert(`registration is failed because user name adasdas is already exist`)
        console.error(message);
        require res.status(400).send(message);
    }

    //if data sent is good, both passwords match, and the username is unique, register the user into db
    else {
        bycrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            User
                .create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    password: hash
                }),
                function (err, item) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    //return data for client use
                    if (item) {
                        console.log('Sign up successful!');
                        return res.json(item)
                    }
                }
        })
    }
})


app.listen(process.env.PORT || 8080, () => console.log('app is listening'));

Get a note app.get('/user/notes/:id', (req, res) => {

})


exports.app = app
