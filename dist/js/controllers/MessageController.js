"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.MessageController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const MessageModel = __importStar(require("../models/message"));
const messageValidation_1 = require("../utils/messageValidation");
class MessageController {
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const messages = MessageModel.getAllMessages();
                response.send(messages, 'Messages Fetched Successfully', 200);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const id = parseInt(req.params.id);
                const message = MessageModel.getMessageById(id);
                if (message) {
                    response.send(message, 'Message Fetched Successfully', 200);
                }
                else {
                    response.send(null, 'Message not found', 404);
                }
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const { name, email, text } = req.body;
                const validationResult = (0, messageValidation_1.validateMessage)({ name, email, text });
                if (!validationResult.error) {
                    const newMessage = MessageModel.createMessage({ name, email, text, createdAt: new Date() });
                    response.send(newMessage, 'Message Created Successfully', 201);
                }
                else {
                    response.send(null, validationResult.error.message, 400);
                }
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const id = parseInt(req.params.id);
                const newText = req.body.text;
                if (newText) {
                    const updatedMessage = MessageModel.updateMessage(id, newText);
                    if (updatedMessage) {
                        response.send(updatedMessage, 'Message Updated Successfully', 200);
                    }
                    else {
                        response.send(null, 'Message not found', 404);
                    }
                }
                else {
                    response.send(null, 'Text is required', 400);
                }
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const id = parseInt(req.params.id);
                const deleted = MessageModel.deleteMessage(id);
                if (deleted) {
                    response.send(null, 'Message Deleted Successfully', 204);
                }
                else {
                    response.send(null, 'Message not found', 404);
                }
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
}
exports.MessageController = MessageController;
