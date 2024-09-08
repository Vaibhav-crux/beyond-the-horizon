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
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.deleteUserById = deleteUserById;
const User_1 = __importDefault(require("../../models/User"));
const logger_1 = __importDefault(require("../../utils/log/logger"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.find().exec();
            logger_1.default.info('Fetched all users successfully.');
            return users;
        }
        catch (error) {
            const err = error;
            logger_1.default.error(`Error fetching users in service: ${err.message}`);
            throw new Error('Internal Server Error');
        }
    });
}
function createUser(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = new User_1.default({ name, email });
            yield newUser.save();
            logger_1.default.info(`User created successfully with email: ${email}`);
            return newUser;
        }
        catch (error) {
            logger_1.default.error('Error creating user in service:', error);
            throw new Error('Internal Server Error');
        }
    });
}
function deleteUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedUser = yield User_1.default.findByIdAndDelete(userId);
            if (!deletedUser) {
                logger_1.default.warn(`User with ID ${userId} not found for deletion.`);
                throw new Error('User not found');
            }
            logger_1.default.info(`User with ID ${userId} deleted successfully.`);
            return deletedUser;
        }
        catch (error) {
            const err = error; // Explicitly cast to Error
            logger_1.default.error(`Error deleting user in service: ${err.message}`);
            throw new Error('Internal Server Error');
        }
    });
}
