const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const {
    User
} = require('../models');


app.post('/', (req, res) => {
    const requiredFields = ['username', 'password'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];

        //check if data sent from client has all the keys required in db
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`
            console.eror(message);
            return res.status(400).send(message);

        }
    }

    //check if username exists in db
    User
        //find an object that has username as entered
        .findOne({
            username: req.body.username
        }),
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
                //integrate JWT token and passport
                //when client.js receives username and password, use the username to GET request of notes in db
                //send the whole object to client
            } else {
                console.log('login successful');
                return res.status(200).json(items)
            }
        }
})
