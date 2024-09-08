"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCelestialBodyDetailsController = getCelestialBodyDetailsController;
exports.createCelestialBodyDetailsController = createCelestialBodyDetailsController;
exports.updateCelestialBodyDetailsController = updateCelestialBodyDetailsController;
exports.deleteCelestialBodyDetailsController = deleteCelestialBodyDetailsController;
const celestialBodyDetailsService_1 = require("../../services/celestialBody/celestialBodyDetailsService");
const logger_1 = __importDefault(require("../../utils/log/logger"));
function getCelestialBodyDetailsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const celestialBodyDetails = yield (0, celestialBodyDetailsService_1.getAllCelestialBodyDetails)();
            logger_1.default.info('Controller: Fetched celestial body details successfully.');
            res.status(200).json(celestialBodyDetails);
        }
        catch (error) {
            logger_1.default.error('Error fetching celestial body details in controller:', error);
            next(error);
        }
    });
}
function createCelestialBodyDetailsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { celestialBodyId, details, avgDistance, estTravelTime, summary } = req.body;
            if (!celestialBodyId || !details || !avgDistance || !estTravelTime || !summary) {
                const error = new Error('All fields are required');
                error.name = 'ValidationError';
                logger_1.default.warn('Validation error: Missing required fields in request body.');
                throw error;
            }
            const newCelestialBodyDetails = yield (0, celestialBodyDetailsService_1.createCelestialBodyDetails)(celestialBodyId, details, avgDistance, estTravelTime, summary);
            logger_1.default.info('Controller: Created celestial body details successfully.');
            res.status(201).json(newCelestialBodyDetails);
        }
        catch (error) {
            logger_1.default.error('Error creating celestial body details in controller:', error);
            next(error);
        }
    });
}
function updateCelestialBodyDetailsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updates = req.body;
            if (!id || Object.keys(updates).length === 0) {
                const error = new Error('ID and at least one update field are required');
                error.name = 'ValidationError';
                logger_1.default.warn('Validation error: ID or update fields missing in request.');
                throw error;
            }
            const updatedCelestialBodyDetails = yield (0, celestialBodyDetailsService_1.updateCelestialBodyDetails)(id, updates);
            if (!updatedCelestialBodyDetails) {
                const error = new Error('Celestial Body Details not found');
                error.name = 'NotFoundError';
                logger_1.default.warn(`Controller: Celestial Body Details with ID ${id} not found.`);
                throw error;
            }
            logger_1.default.info('Controller: Updated celestial body details successfully.');
            res.status(200).json(updatedCelestialBodyDetails);
        }
        catch (error) {
            logger_1.default.error('Error updating celestial body details in controller:', error);
            next(error);
        }
    });
}
function deleteCelestialBodyDetailsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                const error = new Error('ID is required');
                error.name = 'ValidationError';
                logger_1.default.warn('Validation error: ID missing in request.');
                throw error;
            }
            yield (0, celestialBodyDetailsService_1.deleteCelestialBodyDetails)(id);
            logger_1.default.info('Controller: Deleted celestial body details successfully.');
            res.status(200).json({ message: 'Celestial Body Details deleted successfully' });
        }
        catch (error) {
            logger_1.default.error('Error deleting celestial body details in controller:', error);
            next(error);
        }
    });
}
