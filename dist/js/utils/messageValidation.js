"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const validateMessage = (message) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        text: joi_1.default.string().required(),
    });
    return schema.validate(message);
};
exports.validateMessage = validateMessage;
