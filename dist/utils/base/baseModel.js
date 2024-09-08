"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchema = void 0;
exports.preSaveHook = preSaveHook;
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
exports.baseSchema = baseSchema;
// Middleware to automatically update the `updatedAt` field on save
function preSaveHook(schema) {
    schema.pre('save', function (next) {
        this.updatedAt = Date.now();
        next();
    });
}
