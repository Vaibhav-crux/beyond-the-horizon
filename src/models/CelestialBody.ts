import { Schema, model, Document } from 'mongoose';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';

// Define the CelestialBody interface
export interface ICelestialBody extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the CelestialBody schema
const CelestialBodySchema: Schema<ICelestialBody> = new Schema({
  name: {
    type: String,
    required: true,
  },
  ...baseSchema,  // Spread the base schema to include timestamps
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(CelestialBodySchema);

// Create the CelestialBody model
const CelestialBody = model<ICelestialBody>('CelestialBody', CelestialBodySchema);

export default CelestialBody;
