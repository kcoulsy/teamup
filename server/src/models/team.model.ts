import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user.model';

interface TeamUser {
    user: IUser;
    role: string;
}

interface TeamPermissions {
    role: string;
    permissions: string[];
}

export interface ITeam extends Document {
    users: TeamUser[];
    roles: string[];
    rolePermissions: TeamPermissions[];
}

export interface ITeamModel extends Model<ITeam> {}

const teamSchema: Schema = new Schema(
    {
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                role: String,
            },
        ],
        roles: [{ type: String }],
        rolePermissions: [
            {
                role: String,
                permissions: [String],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITeam, ITeamModel>('Team', teamSchema);
