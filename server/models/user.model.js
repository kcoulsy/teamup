const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
    // TODO: Add token here
}, {
    timestamps: true
});

/**
 * Custom method to get the user object without including the password
 */
userSchema.methods.toJSON = function() {
    const user = this;
    const { _id, username } = user.toObject();

    return { _id, username };
}

const User = mongoose.model('User', userSchema);

module.exports = User;