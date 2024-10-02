import { Schema, model, Document } from 'mongoose';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';

// Define the Rocket interface
export interface IRocket extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Rocket schema
const RocketSchema: Schema<IRocket> = new Schema({
  name: {
    type: String,
    required: true,
  },
  ...baseSchema,  // Spread the base schema to include timestamps
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(RocketSchema);

// Create the Rocket model
const Rocket = model<IRocket>('Rocket', RocketSchema);

export default Rocket;
