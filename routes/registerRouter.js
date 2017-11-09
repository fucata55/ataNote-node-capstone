const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {
    User
} = require('../models');

//integrate JWT token and passport
app.post('/', (req, res) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'username', 'password', 'confirmPassword'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];

        //check if data sent from client has all the keys required in db
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`
            console.eror(message);
            return res.status(400).send(message);

        }
    }

    //check if user has type same password twice
    if (req.body.password !== req.body.confirmPassword) {
        const message = 'Both Password must match'
        console.error(message);
        require res.status(400).send(message);
    } //check if username used to registered unique in database
    else if (User.findOne({
            username: req.body.username
        })) {
        const message = 'Username ${req.body.username} is already exist';
        console.error(message);
        require res.status(400).send(message);
    }

    //if data sent is good, both passwords match, and the username is unique, register the user into db
    else {
        User
            .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }),function(err, item) {
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
    }
})
