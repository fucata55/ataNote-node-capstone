var express = require('express');
var app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

const {
    User,
    Note
} = require('./models');

//const {PORT, DATABASE_URL} = require('./config')


app.use(express.static('public'));


//responding user registration
app.post('/user/signup', (req, res) => {
    //check if username used to registered unique in database
    if (User.findOne({
            username: req.body.username
        })) {
        //if registration fails, alert the reason
        const message = `registration is failed because username ${account.username} is already exist`;
        alert(`registration is failed because user name adasdas is already exist`)
        console.error(message);
        return res.status(400).send(message);
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
                    },
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
                    });
        })
    }
})

//responding user login
app.get('/user/signin', (req, res) => {
    User
        //find an object that has username as entered
        .findOne({
                username: req.body.username
            },
            function (err, items) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                //check if username exists in db
                if (!items) {
                    console.error('Invalid username and password combination');
                    return res.status(401).json({
                        message: 'Invalid username and password combination'
                    });
                    //when client.js receives username and password, use the username to GET request of notes in db
                    //send the whole object to client
                } else {
                    items.validatePassword(req.body.password, (err, isValid) => {
                        if (err) {
                            alert('Invalid username and password combination')
                        } else if (!isValid) {
                            return res.status(401).json({
                                message: 'Invalid username and password combination'
                            });
                        } else {
                            console.log('login successful');
                            return res.status(200).json(items)
                        }
                    });
                };
            });
});

app.post('/user/notes', (req, res) => {
    Note
        .create({
            title: req.body.title,
            body: req.body.body,
            type: req.body.type,
            username: req.body.username
        }, (err, item) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            if (item) {
                console.log('A new note is created, and ID is assigned to trigger buttons');
                return res.status(200).json(item);
            }
        });
})

app.get('/user/notes', (req, res) => {
    Note
        .find({
            username: req.body.username
        }, (err, item) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
            if (item) {
                return res.status(200).json(item);
            }
        });
});
app.listen(process.env.PORT || 8082, () => console.log('app is listening'));

//Get a note app.get('/user/notes/:id', (req, res) => {
//
//})


exports.app = app
