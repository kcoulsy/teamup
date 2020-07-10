const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const TOKEN_ACCESS_AUTH = "auth";

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
        access: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
});

/**
 * Overriting default with Custom method to get the user object without including the password
 */
userSchema.methods.toJSON = function() {
    const user = this;
    const { _id, username } = user.toObject();

    return { _id, username };
}

/**
 * Generates an auth token and saves it with the user
 */
userSchema.methods.createAuthToken = function() {
    const user = this;

    const token = jwt
        .sign(
            {
                _id: user._id.toHexString(),
                access: TOKEN_ACCESS_AUTH,
            },
            process.env.JWT_SECRET
        )
        .toString();

    user.tokens = [...user.tokens, {token, access: TOKEN_ACCESS_AUTH}];

    return user.save().then(() => token);
};

/**
 * Static method for finding a user by token (to verify the token is valid)
 *
 * @param {string} token
 */
userSchema.statics.findByToken = function(token) {
    var User = this;
    var decodedJwt;

    try {
        decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decodedJwt._id,
        'tokens.token': token,
        'tokens.access': TOKEN_ACCESS_AUTH
    });
}

// TODO: add remove token method

const User = mongoose.model('User', userSchema);

module.exports = User;