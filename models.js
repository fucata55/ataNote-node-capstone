const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: string,
        required: true
    },
    lastName: {
        type: string,
        required: true
    },
    userName: {
        type: string,
        required: true
    },
    //edit password system with passport
    password: {
        type: string,
        required: true
    },
    confirmPassword: {
        type: string,
        required: true
    },
    Notes: [{
        title: string,
        body: string,
        type: string
    }]
});

Const User = mongoose.model('User', userSchema)
