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

const config = require('./config');


app.use(express.static('public'));

// ---------------- RUN/CLOSE SERVER -----------------------------------------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}


//responding user registration
app.post('/user/signup', (req, res) => {
    console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.userName, req.body.password);
    //check if username used to registered unique in database
    User
        .find({
            username: req.body.userName
        }, (err, item) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                })
            }
            if (item) {
                //if registration fails, alert the reason
                const message = `registration is failed because username ${req.body.userName} is already exist`;

                console.error(message);
                return res.status(400).send(message);
            }

            //if data sent is good, both passwords match, and the username is unique, register the user into db
            else {

                let username = req.body.userName;
                username = username.trim();
                let password = req.body.password;
                password = password.trim();
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }

                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                message: 'Internal server error'
                            });
                        }

                        User.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            username: username,
                            password: hash
                        }, (err, item) => {
                            if (err) {
                                return res.status(500).json({
                                    message: 'Internal Server Error'
                                });
                            }
                            if (item) {
                                console.log(`User \`${username}\` created.`);
                                return res.json(item);
                            }
                        });
                    });
                });
            };
        });
});

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

app.get('/user/notes/:id', (req, res) => {
    Note
        .findById(req.params.id)
        .then((note) => {
            return res.json(note);
        })
        .catch(function (achievements) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });

        })
})

app.put('user/notes/:id', (req, res) => {
    let toUpdate = {};
    let updateableFields = ['title', 'body', 'type'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Note
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        })
        .then(function (note) {
            return res.status(204).json(note);
        })
        .catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});
app.listen(process.env.PORT || 8082, () => console.log('app is listening'));

//Get a note app.get('/user/notes/:id', (req, res) => {
//
//})


exports.app = app;
