"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const multer_1 = __importDefault(require("./helper/multer"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/api-docs', swagger_1.swaggerUiMiddleware, swagger_1.swaggerUiSetup);
app.use(express_1.default.json());
app.use(multer_1.default.single('image'));
app.use('/api', routes_1.default);
exports.default = app;
