import { Schema, model, Document, Types } from 'mongoose';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';
import { ICelestialBody } from './CelestialBody';

// Define the CelestialBodyDetails interface
export interface ICelestialBodyDetails extends Document {
  celestialBody: Types.ObjectId | ICelestialBody;
  details: string;
  avgDistance: number;
  estTravelTime: number;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the CelestialBodyDetails schema
const CelestialBodyDetailsSchema: Schema<ICelestialBodyDetails> = new Schema({
  celestialBody: {
    type: Schema.Types.ObjectId,
    ref: 'CelestialBody',
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  avgDistance: {
    type: Number,
    required: true,
  },
  estTravelTime: {
    type: Number,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  ...baseSchema,  // Spread the base schema to include timestamps
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(CelestialBodyDetailsSchema);

// Create the CelestialBodyDetails model
const CelestialBodyDetails = model<ICelestialBodyDetails>('CelestialBodyDetails', CelestialBodyDetailsSchema);

export default CelestialBodyDetails;
