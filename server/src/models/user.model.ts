import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_ACCESS_AUTH } from '../constants/auth';
import { ITeam } from './team.model';

export interface UserAccessTokenData {
    _id: string;
    access: string;
}

export interface UserAccessToken {
    token: string;
    access: string;
}

interface IUserSchema extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    occupation: string;
    aboutMe: string;
    team: ITeam;
    teamInvites: ITeam[];
}

interface IUserBase extends IUserSchema {
    createAuthToken(): Promise<string>;
    hasTeamPermission(permission: string): Promise<boolean>;
}

export interface IUser extends IUserBase {
    tokens: UserAccessToken[];
}

export interface IUserModel extends Model<IUser> {
    findByToken(token: string): Promise<IUser>;
    findByCredentials(username: string, password: string): Promise<IUser>;
}

const userSchema: Schema = new Schema(
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
        fullName: String,
        occupation: String,
        aboutMe: String,
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        teamInvites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
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
    const {
        _id,
        username,
        email,
        team,
        fullName,
        occupation,
        aboutMe,
        teamInvites,
    } = user.toObject();

    return {
        _id,
        username,
        email,
        team,
        fullName,
        occupation,
        aboutMe,
        teamInvites,
    };
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

userSchema.methods.hasTeamPermission = function hasTeamPermission(
    permission: string
): Promise<boolean> {
    return new Promise(async (resolve) => {
        const user: IUser = this;
        await user.populate('team').execPopulate();

        const userRoleIndex = user.team.users.find((teamUser) => {
            return user._id.equals(teamUser.user);
        }).roleIndex;
        const rolePerms = user.team.rolePermissions[userRoleIndex];

        if (rolePerms?.permissions.includes(permission)) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
};
/**
 * Static method for finding a user by token (to verify the token is valid)
 *
 * @param {string} token
 */
userSchema.statics.findByToken = function (token: string) {
    let decodedJwt: UserAccessTokenData;

    try {
        decodedJwt = jwt.verify(
            token,
            process.env.JWT_SECRET
        ) as UserAccessTokenData;
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
userSchema.statics.findByCredentials = function (
    username: string,
    password: string
) {
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
