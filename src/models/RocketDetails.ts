import { Schema, model, Document } from 'mongoose';
import { IRocket } from './Rocket';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';

// Define the RocketDetails interface
export interface IRocketDetails extends Document {
  rocketId: IRocket['_id'];  // Reference to Rocket
  description: string;
  launchDate: Date;
  mission: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the RocketDetails schema
const RocketDetailsSchema: Schema<IRocketDetails> = new Schema({
  rocketId: {
    type: Schema.Types.ObjectId,
    ref: 'Rocket',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  ...baseSchema,  // Spread the base schema to include createdAt and updatedAt
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(RocketDetailsSchema);

// Create the RocketDetails model
const RocketDetails = model<IRocketDetails>('RocketDetails', RocketDetailsSchema);

export default RocketDetails;
