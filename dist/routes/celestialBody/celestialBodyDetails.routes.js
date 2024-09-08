"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celestialBodyDetailsController_1 = require("../../controllers/celestialBody/celestialBodyDetailsController");
const logger_1 = __importDefault(require("../../utils/log/logger"));
const router = (0, express_1.Router)();
// Log each incoming request to the celestial body details routes
router.use((req, res, next) => {
    logger_1.default.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// POST route to create a new celestial body detail
router.post('/celestialBodyDetails', celestialBodyDetailsController_1.createCelestialBodyDetailsController);
// GET route to fetch all celestial body details
router.get('/celestialBodyDetails', celestialBodyDetailsController_1.getCelestialBodyDetailsController);
// PATCH route to update an existing celestial body detail
router.patch('/celestialBodyDetails/:id', celestialBodyDetailsController_1.updateCelestialBodyDetailsController);
// DELETE route to remove a celestial body detail by ID
router.delete('/celestialBodyDetails/:id', celestialBodyDetailsController_1.deleteCelestialBodyDetailsController);
exports.default = router;
