"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const baseModel_1 = require("../utils/base/baseModel");
// Define the CelestialBodyDetails schema
const CelestialBodyDetailsSchema = new mongoose_1.Schema(Object.assign({ celestialBody: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'CelestialBody',
        required: true,
    }, details: {
        type: String,
        required: true,
    }, avgDistance: {
        type: Number,
        required: true,
    }, estTravelTime: {
        type: Number,
        required: true,
    }, summary: {
        type: String,
        required: true,
    } }, baseModel_1.baseSchema));
// Apply the pre-save hook to update `updatedAt` before saving
(0, baseModel_1.preSaveHook)(CelestialBodyDetailsSchema);
// Create the CelestialBodyDetails model
const CelestialBodyDetails = (0, mongoose_1.model)('CelestialBodyDetails', CelestialBodyDetailsSchema);
exports.default = CelestialBodyDetails;
