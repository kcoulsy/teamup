import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { TOKEN_ACCESS_AUTH } from '../constants/auth';

export interface UserAccessTokenData {
    _id: string,
    access: string
}

export interface UserAccessToken {
    token: string,
    access: string
}

interface IUserSchema extends Document {
    username: string,
    email: string,
    password: string,
}

interface IUserBase extends IUserSchema {
    createAuthToken(): Promise<string>
}

export interface IUser extends IUserBase {
    tokens: UserAccessToken[]
}

export interface IUserModel extends Model<IUser> {
    findByToken(token: string): Promise<IUser>
    findByCredentials(username : string, password : string): Promise<IUser>
}

const userSchema : Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        password: {
            type: String,
            require: true,
            minlength: 6,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
                access: {
                    type: String,
                    require: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

/**
 * Overriting default with Custom method to get the user object without including the password
 */
userSchema.methods.toJSON = function () {
    const user = this;
    const { _id, username } = user.toObject();

    return { _id, username };
};

/**
 * Generates an auth token and saves it with the user
 */
userSchema.methods.createAuthToken = function () {
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

    user.tokens = [...user.tokens, { token, access: TOKEN_ACCESS_AUTH }];

    return user.save().then(() => token);
};

/**
 * Static method for finding a user by token (to verify the token is valid)
 *
 * @param {string} token
 */
userSchema.statics.findByToken = function (token: string) {
    let decodedJwt : UserAccessTokenData;

    try {
        decodedJwt = jwt.verify(token, process.env.JWT_SECRET) as UserAccessTokenData;
    } catch (err) {
        return Promise.reject();
    }

    return this.findOne({
        _id: decodedJwt._id,
        'tokens.token': token,
        'tokens.access': TOKEN_ACCESS_AUTH,
    });
};

// TODO: add remove token method

/**
 * Hashing passwords before saving
 */
userSchema.pre('save', function (next) {
    const user = this as IUser;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (_, salt) => {
            bcrypt.hash(user.password, salt, (__, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

/**
 * Method for finding a user with credentials, comparing hashed password with the given one
 *
 * @param {string} username
 * @param {string} password
 */
userSchema.statics.findByCredentials = function (username : string, password : string) {
    // const User = this;

    return this.findOne({ username }).then((user: IUser) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

export default mongoose.model<IUser, IUserModel>('User', userSchema);
