import mongoose, { Document, Schema, Model } from 'mongoose';
import { IUser } from './user.model';
import { IProject } from './project.model';

export enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  TESTING = 'TESTING',
  DONE = 'DONE',
}

export interface ITask extends Document {
  title: string;
  description: string;
  estimatedHours: number;
  status: TaskStatus;
  assignee: IUser | null;
  project: IProject;
  createdBy: IUser;
}

export interface ITaskModel extends Model<ITask> {}

const taskSchema: Schema = new Schema(
  {
    title: String,
    description: String,
    estimatedHours: Number,
    status: String,
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask, ITaskModel>('Task', taskSchema);
