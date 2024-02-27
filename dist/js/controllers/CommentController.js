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
exports.CommentController = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const commentValidation_1 = require("../utils/commentValidation");
class CommentController {
    postComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = commentValidation_1.commentValidationSchema.validate(req.body);
                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }
                const { name, email, comment } = req.body;
                const blogId = req.params.id;
                // Assuming blogId exists in the database
                const newComment = new comment_1.default({
                    blogId: blogId,
                    name: name,
                    email: email,
                    comment: comment
                });
                const savedComment = yield newComment.save();
                res.status(201).json({
                    comment: savedComment,
                    message: 'Comment Posted Successfully'
                });
            }
            catch (error) {
                const errorMessage = error;
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogId = req.params.id;
                const comments = yield comment_1.default.find({ blogId, hidden: false });
                res.status(200).json({
                    comments: comments,
                    message: 'Comments on blog Fetched Successfully'
                });
            }
            catch (error) {
                const errorMessage = error;
                res.status(500).json({ error: errorMessage });
            }
        });
    }
    hideComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = req.params.commentId;
                yield comment_1.default.findByIdAndUpdate(commentId, { hidden: true });
                res.status(200).json({ message: 'Comment hidden successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error hiding comment' });
            }
        });
    }
}
exports.CommentController = CommentController;
