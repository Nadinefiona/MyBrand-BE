"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const commentValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    comment: joi_1.default.string().required(),
});
exports.commentValidationSchema = commentValidationSchema;
