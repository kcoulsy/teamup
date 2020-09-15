import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user.model';
import { ITeam } from './team.model';
import { ITask } from './task.model';

export interface IProject extends Document {
    user: IUser;
    team?: ITeam;
    title: string;
    description: string;
    tasks: ITask[];
}

export interface IProjectModel extends Model<IProject> {}

const projectSchema: Schema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
        },
        title: String,
        description: String,
        tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProject, IProjectModel>(
    'Project',
    projectSchema
);
