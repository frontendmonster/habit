import mongoose from 'mongoose';
import { ProjectClass } from './project.class';

const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, index: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  { timestamps: true }
);

ProjectSchema.loadClass(ProjectClass);

delete mongoose.connection.models.Project;
export const Project = mongoose.model('Project', ProjectSchema);