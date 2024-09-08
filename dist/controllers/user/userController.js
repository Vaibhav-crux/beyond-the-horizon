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
exports.getAllUsersController = getAllUsersController;
exports.createUserController = createUserController;
exports.deleteUserController = deleteUserController;
const userService_1 = require("../../services/user/userService");
const logger_1 = __importDefault(require("../../utils/log/logger"));
function getAllUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getAllUsers)();
            logger_1.default.info('Controller: Fetched all users successfully.');
            res.status(200).json(users);
        }
        catch (error) {
            const err = error;
            logger_1.default.error(`Error fetching users in controller: ${err.message}`);
            next(err); // Pass the error to the error handler middleware
        }
    });
}
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                const error = new Error('Name and email are required');
                error.name = 'ValidationError';
                logger_1.default.warn('Validation error: Missing name or email in request body.');
                return next(error);
            }
            const newUser = yield (0, userService_1.createUser)(name, email);
            logger_1.default.info(`User created successfully in controller with email: ${email}`);
            res.status(201).json(newUser);
        }
        catch (error) {
            logger_1.default.error('Error creating user in controller:', error);
            next(error); // Pass the error to the error handler middleware
        }
    });
}
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                const error = new Error('User ID is required');
                error.name = 'ValidationError';
                logger_1.default.warn('Validation error: Missing user ID in request parameters.');
                return next(error);
            }
            const deletedUser = yield (0, userService_1.deleteUserById)(id);
            if (!deletedUser) {
                const error = new Error('User not found');
                error.name = 'NotFoundError';
                logger_1.default.warn(`User with ID ${id} not found in controller.`);
                return next(error);
            }
            logger_1.default.info(`User with ID ${id} deleted successfully in controller.`);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            const err = error; // Explicitly cast to Error
            logger_1.default.error(`Error deleting user in controller: ${err.message}`);
            next(err); // Pass the error to the error handler middleware
        }
    });
}
