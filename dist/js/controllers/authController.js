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
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authValidation_1 = require("../utils/authValidation");
const saltRounds = 10;
class AuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = authValidation_1.signupValidation.validate(req.body);
                if (error)
                    return res.status(400).json({ message: error.details[0].message });
                const { fullName, email, password } = req.body;
                const existingUser = yield User_1.default.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'User already exists' });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
                const newUser = new User_1.default({ fullName, email, password: hashedPassword });
                yield newUser.save();
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = authValidation_1.signinValidation.validate(req.body);
                if (error)
                    return res.status(400).json({ message: error.details[0].message });
                const { email, password } = req.body;
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT secret is not defined');
                }
                const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET);
                res.json({ token });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AuthController = AuthController;
