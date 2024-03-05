"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const index_1 = __importDefault(require("./index"));
dotenv_1.default.config();
(0, db_1.default)();
const port = process.env.PORT || 3000;
const server = index_1.default.listen(port, () => {
    console.log(`Server has started and is running on port ${port}`);
});
const closeServer = () => {
    server.close();
};
exports.closeServer = closeServer;
