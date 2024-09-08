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
exports.getAllCelestialBodies = getAllCelestialBodies;
exports.createCelestialBody = createCelestialBody;
exports.deleteCelestialBodyById = deleteCelestialBodyById;
const CelestialBody_1 = __importDefault(require("../../models/CelestialBody"));
const logger_1 = __importDefault(require("../../utils/log/logger"));
// Function to fetch all celestial bodies
function getAllCelestialBodies() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const celestialBodies = yield CelestialBody_1.default.find({}, 'id name').exec();
            logger_1.default.info('Fetched all celestial bodies.');
            return celestialBodies;
        }
        catch (error) {
            logger_1.default.error('Error fetching celestial bodies in service:', error);
            throw error; // Pass the error up to be handled by the controller
        }
    });
}
// Function to create a new celestial body
function createCelestialBody(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCelestialBody = new CelestialBody_1.default({ name });
            yield newCelestialBody.save();
            logger_1.default.info(`Created new celestial body with name: ${name}`);
            return newCelestialBody;
        }
        catch (error) {
            logger_1.default.error('Error creating celestial body in service:', error);
            throw error; // Pass the error up to be handled by the controller
        }
    });
}
// Function to delete a celestial body by ID
function deleteCelestialBodyById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedCelestialBody = yield CelestialBody_1.default.findByIdAndDelete(id).exec();
            if (deletedCelestialBody) {
                logger_1.default.info(`Deleted celestial body with ID: ${id}`);
            }
            else {
                logger_1.default.warn(`Celestial body with ID: ${id} not found for deletion.`);
            }
            return deletedCelestialBody;
        }
        catch (error) {
            logger_1.default.error('Error deleting celestial body in service:', error);
            throw error; // Pass the error up to be handled by the controller
        }
    });
}
