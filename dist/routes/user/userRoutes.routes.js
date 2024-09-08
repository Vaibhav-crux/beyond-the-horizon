"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/user/userController");
const logger_1 = __importDefault(require("../../utils/log/logger"));
const router = (0, express_1.Router)();
// Log each incoming request to the user routes
router.use((req, res, next) => {
    logger_1.default.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Route to create a new user
router.post('/users', userController_1.createUserController);
// Route to delete a user by ID
router.delete('/users/:id', userController_1.deleteUserController);
// Route to get all users
router.get('/users', userController_1.getAllUsersController);
exports.default = router;
