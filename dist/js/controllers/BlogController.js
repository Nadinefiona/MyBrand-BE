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
exports.BlogController = void 0;
const response_1 = __importDefault(require("../utils/response"));
const Blog_1 = __importDefault(require("../models/Blog"));
const blogValidation_1 = require("../utils/blogValidation");
const cloudinary_1 = __importDefault(require("../helper/cloudinary"));
class BlogController {
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const blogs = yield Blog_1.default.find();
                response.send(blogs, 'Blogs Fetched Successfully', 200);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const { error } = blogValidation_1.blogValidationSchema.validate(req.body);
                if (error) {
                    return res.status(400).send({ error: error.details[0].message });
                }
                if (!req.file) {
                    return res.status(400).send({ error: "File not uploaded" });
                }
                const { title, content } = req.body;
                const result = yield (0, cloudinary_1.default)(req.file, res);
                const blog = new Blog_1.default({
                    title,
                    content,
                    image: result.secure_url,
                    date: new Date(),
                });
                const savedBlog = yield blog.save();
                response.send(savedBlog, 'Blog Created Successfully', 201);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const blog = yield Blog_1.default.findById(req.params.id);
                if (!blog) {
                    return res.status(404).send({ error: "Blog not found" });
                }
                res.send(blog);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const blog = yield Blog_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!blog) {
                    return res.status(404).send({ error: "Blog not found" });
                }
                res.send(blog);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new response_1.default(req, res);
            try {
                const blogId = req.params.id.trim();
                const blog = yield Blog_1.default.findByIdAndDelete(blogId);
                if (!blog) {
                    return res.status(404).send({ error: "Blog not found" });
                }
                const successMessage = { message: "Blog deleted successfully" };
                res.status(204).send(successMessage);
            }
            catch (error) {
                const errorMessage = error;
                response.send(null, errorMessage, 500);
            }
        });
    }
}
exports.BlogController = BlogController;
