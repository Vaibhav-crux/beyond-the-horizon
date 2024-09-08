"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const baseModel_1 = require("../utils/base/baseModel");
// Define the User schema
const UserSchema = new mongoose_1.Schema(Object.assign({ id: {
        type: String,
        default: uuid_1.v4,
        unique: true,
        required: true,
    }, name: {
        type: String,
        required: true,
    }, email: {
        type: String,
        required: true,
        unique: true,
    } }, baseModel_1.baseSchema));
// Apply the pre-save hook to update `updatedAt` before saving
(0, baseModel_1.preSaveHook)(UserSchema);
// Create the User model
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
