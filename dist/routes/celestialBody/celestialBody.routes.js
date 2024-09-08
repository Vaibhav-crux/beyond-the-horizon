"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celestialBodyController_1 = require("../../controllers/celestialBody/celestialBodyController");
const logger_1 = __importDefault(require("../../utils/log/logger"));
const router = (0, express_1.Router)();
router.use((req, res, next) => {
    logger_1.default.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Route to create a celestial body
router.post('/celestialBody', celestialBodyController_1.createCelestialBodyController);
// Route to fetch all celestial bodies
router.get('/celestialBody', celestialBodyController_1.getCelestialBodiesController);
// Route to delete a celestial body by ID
router.delete('/celestialBody/:id', celestialBodyController_1.deleteCelestialBodyController);
exports.default = router;
