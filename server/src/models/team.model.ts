import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user.model';

interface TeamUser {
    user: IUser;
    roleIndex: number;
}

interface TeamPermissions {
    permissions: string[];
    roleIndex: number;
}

export interface ITeam extends Document {
    name: string;
    description: string;
    users: TeamUser[];
    roles: string[];
    rolePermissions: TeamPermissions[];
}

export interface ITeamModel extends Model<ITeam> {}

const teamSchema: Schema = new Schema(
    {
        name: String,
        description: String,
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                role: String,
                roleIndex: Number,
            },
        ],
        roles: [{ type: String }],
        rolePermissions: [
            {
                role: String,
                roleIndex: Number,
                permissions: [String],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ITeam, ITeamModel>('Team', teamSchema);
