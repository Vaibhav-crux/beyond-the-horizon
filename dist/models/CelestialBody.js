"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const baseModel_1 = require("../utils/base/baseModel");
// Define the CelestialBody schema
const CelestialBodySchema = new mongoose_1.Schema(Object.assign({ name: {
        type: String,
        required: true,
    } }, baseModel_1.baseSchema));
// Apply the pre-save hook to update `updatedAt` before saving
(0, baseModel_1.preSaveHook)(CelestialBodySchema);
// Create the CelestialBody model
const CelestialBody = (0, mongoose_1.model)('CelestialBody', CelestialBodySchema);
exports.default = CelestialBody;
