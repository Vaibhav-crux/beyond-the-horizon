import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { baseSchema, preSaveHook } from '../utils/base/baseModel';

// Define the User interface
export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ...baseSchema,  // Spread the base schema to include timestamps
});

// Apply the pre-save hook to update `updatedAt` before saving
preSaveHook(UserSchema);

// Create the User model
const User = model<IUser>('User', UserSchema);

export default User;
