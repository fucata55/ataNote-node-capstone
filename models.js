const mongoose = require('mongoose');


//For v1, make Notes displayed public available for other users to see
//For MVP, keep notes to the publisher only
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
module.exports = {
    User
}
