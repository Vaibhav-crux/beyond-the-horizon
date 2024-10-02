import { Schema, model, Document } from 'mongoose';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';

// Define the SpaceNews interface
export interface ISpaceNews extends Document {
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the SpaceNews schema
const SpaceNewsSchema: Schema<ISpaceNews> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  ...baseSchema,  // Spread the base schema to include timestamps
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(SpaceNewsSchema);

// Create the SpaceNews model
const SpaceNews = model<ISpaceNews>('SpaceNews', SpaceNewsSchema);

export default SpaceNews;
