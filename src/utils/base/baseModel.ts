import { Schema } from 'mongoose';

// Define a base schema with timestamps
const baseSchema = {
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
};

// Middleware to automatically update the `updatedAt` field on save
function preSaveHook(schema: Schema) {
  schema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });
}

export { baseSchema, preSaveHook };
