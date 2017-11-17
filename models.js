const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


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
    username: {
        type: string,
        required: true
    },
    //edit password system with passport
    password: {
        type: string,
        required: true
    }
});

userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isValid) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

const noteSchema = new mongoose.Schema({
    title: {
        type: string,
        required: false
    },
    body: {
        type: string,
        required: false
    },
    type: {
        type: string,
        required: false
    },
    username: {
        type: string,
        required: true
    }
})

Const User = mongoose.model('User', userSchema)
module.exports = {
    User
}
