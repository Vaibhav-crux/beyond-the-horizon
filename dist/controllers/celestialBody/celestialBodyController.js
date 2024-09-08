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
exports.getCelestialBodiesController = getCelestialBodiesController;
exports.createCelestialBodyController = createCelestialBodyController;
exports.deleteCelestialBodyController = deleteCelestialBodyController;
const celestialBodyService_1 = require("../../services/celestialBody/celestialBodyService");
const logger_1 = __importDefault(require("../../utils/log/logger"));
// Function to get all celestial bodies
function getCelestialBodiesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const celestialBodies = yield (0, celestialBodyService_1.getAllCelestialBodies)();
            logger_1.default.info('Controller: Fetched celestial bodies.');
            res.status(200).json(celestialBodies);
        }
        catch (error) {
            logger_1.default.error('Error fetching celestial bodies in controller:', error);
            next(error); // Pass the error to the error handler middleware
        }
    });
}
// Function to create a celestial body
function createCelestialBodyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            if (!name) {
                const error = new Error('Name is required');
                error.name = 'ValidationError';
                logger_1.default.warn('Attempt to create celestial body without a name.');
                throw error;
            }
            const newCelestialBody = yield (0, celestialBodyService_1.createCelestialBody)(name);
            logger_1.default.info(`Controller: Created celestial body with name: ${name}`);
            res.status(201).json(newCelestialBody);
        }
        catch (error) {
            logger_1.default.error('Error creating celestial body in controller:', error);
            next(error); // Pass the error to the error handler middleware
        }
    });
}
// Function to delete a celestial body by ID
function deleteCelestialBodyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                const error = new Error('ID is required');
                error.name = 'ValidationError';
                logger_1.default.warn('Attempt to delete celestial body without an ID.');
                throw error;
            }
            const deletedCelestialBody = yield (0, celestialBodyService_1.deleteCelestialBodyById)(id);
            if (!deletedCelestialBody) {
                const error = new Error('Celestial Body not found');
                error.name = 'NotFoundError';
                logger_1.default.warn(`Celestial body with ID: ${id} not found in controller.`);
                throw error;
            }
            logger_1.default.info(`Controller: Deleted celestial body with ID: ${id}`);
            res.status(200).json({ message: 'Celestial Body deleted successfully' });
        }
        catch (error) {
            logger_1.default.error('Error deleting celestial body in controller:', error);
            next(error); // Pass the error to the error handler middleware
        }
    });
}
