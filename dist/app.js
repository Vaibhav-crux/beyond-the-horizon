"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_routes_1 = __importDefault(require("./routes/user/userRoutes.routes"));
const celestialBody_routes_1 = __importDefault(require("./routes/celestialBody/celestialBody.routes"));
const celestialBodyDetails_routes_1 = __importDefault(require("./routes/celestialBody/celestialBodyDetails.routes"));
const corsHandler_1 = __importDefault(require("./middlewares/corsHandler"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./utils/log/logger"));
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use(corsHandler_1.default); // Add CORS middleware
app.use(express_1.default.json());
// Log incoming requests
app.use((req, res, next) => {
    logger_1.default.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});
// Define routes
app.use('/api', userRoutes_routes_1.default);
app.use('/api', celestialBody_routes_1.default);
app.use('/api', celestialBodyDetails_routes_1.default);
// Middleware to catch invalid routes
app.use((req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
    error.name = 'NotFoundError';
    next(error);
});
// Error handling middleware should be used after all route handlers
app.use(errorHandler_1.default);
(0, database_1.default)()
    .then(() => {
    app.listen(port, () => {
        logger_1.default.info(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    if (error instanceof Error) {
        logger_1.default.error('Error during database connection setup:', error.message);
    }
    else {
        logger_1.default.error('Unknown error during database connection setup:', error);
    }
    process.exit(1);
});
