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
exports.getAllCelestialBodyDetails = getAllCelestialBodyDetails;
exports.createCelestialBodyDetails = createCelestialBodyDetails;
exports.updateCelestialBodyDetails = updateCelestialBodyDetails;
exports.deleteCelestialBodyDetails = deleteCelestialBodyDetails;
const CelestialBodyDetails_1 = __importDefault(require("../../models/CelestialBodyDetails"));
const CelestialBody_1 = __importDefault(require("../../models/CelestialBody"));
const logger_1 = __importDefault(require("../../utils/log/logger"));
function getAllCelestialBodyDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const celestialBodyDetails = yield CelestialBodyDetails_1.default.find()
                .populate('celestialBody', 'name')
                .exec();
            logger_1.default.info('Fetched all celestial body details successfully.');
            return celestialBodyDetails;
        }
        catch (error) {
            logger_1.default.error('Error fetching celestial body details in service:', error);
            throw new Error('Internal Server Error');
        }
    });
}
function createCelestialBodyDetails(celestialBodyId, details, avgDistance, estTravelTime, summary) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const celestialBody = yield CelestialBody_1.default.findById(celestialBodyId);
            if (!celestialBody) {
                logger_1.default.warn(`Celestial Body with ID ${celestialBodyId} not found.`);
                throw new Error('Celestial Body not found');
            }
            const newCelestialBodyDetails = new CelestialBodyDetails_1.default({
                celestialBody: celestialBody._id,
                details,
                avgDistance,
                estTravelTime,
                summary,
            });
            yield newCelestialBodyDetails.save();
            logger_1.default.info(`Created new celestial body details for celestial body ID ${celestialBodyId}.`);
            return newCelestialBodyDetails;
        }
        catch (error) {
            logger_1.default.error('Error creating celestial body details in service:', error);
            throw new Error('Internal Server Error');
        }
    });
}
function updateCelestialBodyDetails(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedCelestialBodyDetails = yield CelestialBodyDetails_1.default.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedCelestialBodyDetails) {
                logger_1.default.warn(`Celestial Body Details with ID ${id} not found for update.`);
                throw new Error('Celestial Body Details not found');
            }
            logger_1.default.info(`Updated celestial body details for ID ${id}.`);
            return updatedCelestialBodyDetails;
        }
        catch (error) {
            logger_1.default.error('Error updating celestial body details in service:', error);
            throw new Error('Internal Server Error');
        }
    });
}
function deleteCelestialBodyDetails(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield CelestialBodyDetails_1.default.findByIdAndDelete(id);
            if (!result) {
                logger_1.default.warn(`Celestial Body Details with ID ${id} not found for deletion.`);
                throw new Error('Celestial Body Details not found');
            }
            logger_1.default.info(`Deleted celestial body details for ID ${id}.`);
        }
        catch (error) {
            logger_1.default.error('Error deleting celestial body details in service:', error);
            throw new Error('Internal Server Error');
        }
    });
}
