"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("./helper/multer"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use('/api-docs', swagger_1.swaggerUiMiddleware, swagger_1.swaggerUiSetup);
const corsOpts = {
    origin: '*',
    methods: [
        'GET',
        'POST',
        'DELETE',
        'PATCH'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
    ],
};
app.use((0, cors_1.default)(corsOpts));
app.use(express_1.default.json());
app.use(multer_1.default.single('image'));
app.use('/api', routes_1.default);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server has started and is running on port ${port}`);
});
const closeServer = () => {
    server.close();
};
exports.closeServer = closeServer;
exports.default = app;
