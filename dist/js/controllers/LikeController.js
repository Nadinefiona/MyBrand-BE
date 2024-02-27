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
exports.LikeController = void 0;
const like_1 = __importDefault(require("../models/like"));
class LikeController {
    likeBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield like_1.default.incrementLikeCount(id);
                res.status(201).json({ message: 'Blog liked successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error liking blog' });
            }
        });
    }
    deleteLikeForBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield like_1.default.deleteMany({ blogId: id });
                res.status(200).json({ message: 'like removed successfully' });
            }
            catch (error) {
                res.status(500).json({ error: 'Error deleting like for blog' });
            }
        });
    }
    getAllLikesForBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const likeCount = yield like_1.default.countDocuments({ blogId: id });
                res.status(200).json({ likeCount });
            }
            catch (error) {
                res.status(500).json({ error: 'Error retrieving likes for blog' });
            }
        });
    }
}
exports.LikeController = LikeController;
