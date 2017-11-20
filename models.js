const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


//For v1, make Notes displayed public available for other users to see
//For MVP, keep notes to the publisher only


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    //edit password system with passport
    password: {
        type: String,
        required: false
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
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Note = mongoose.model('Note', noteSchema)
module.exports = {
    User,
    Note
}
