"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogController_1 = require("../controllers/BlogController");
const CommentController_1 = require("../controllers/CommentController");
const LikeController_1 = require("../controllers/LikeController");
const MessageController_1 = require("../controllers/MessageController");
const authController_1 = require("../controllers/authController");
const isAuthenticated_1 = __importDefault(require("../Middleware/isAuthenticated"));
const route = express_1.default.Router();
/**
 * @swagger
 * /api/blogs:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: A list of blogs
 */
/**
 * @swagger
 * /api/blogs:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new blog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog created successfully
 */
/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get a blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 */
/**
 * @swagger
 * /api/blogs/{id}:
 *   patch:
 *     tags:
 *       - Blog
 *     summary: Update a blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete a blog by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
/**
 * @swagger
 * /api/blogs/{blogId}/comments:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Add a comment to a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 */
/**
 * @swagger
 * /api/blogs/{blogId}/comments:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Get all comments for a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments
 */
/**
 * @swagger
 * /api/blogs/{blogId}/comments/{commentId}:
 *   put:
 *     tags:
 *       - Comment
 *     summary: Hide a comment
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment hidden successfully
 */
/**
 * @swagger
 * /api/blogs/{blogId}/like:
 *   post:
 *     tags:
 *       - Like
 *     summary: Like a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog liked successfully
 */
/**
 * @swagger
 * /api/blogs/{blogId}/unlike:
 *   delete:
 *     tags:
 *       - Like
 *     summary: Unlike a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog unliked successfully
 */
/**
 * @swagger
 * /api/blogs/{blogId}/likes:
 *   get:
 *     tags:
 *       - Like
 *     summary: Get all likes for a blog
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of likes
 */
/**
 * @swagger
 * /api/messages:
 *   get:
 *     tags:
 *       - Message
 *     summary: Get all messages
 *     responses:
 *       200:
 *         description: A list of messages
 */
/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     tags:
 *       - Message
 *     summary: Get a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message details
 */
/**
 * @swagger
 * /api/messages:
 *   post:
 *     tags:
 *       - Message
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message created successfully
 */
/**
 * @swagger
 * /api/messages/{id}:
 *   patch:
 *     tags:
 *       - Message
 *     summary: Update a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 */
/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     tags:
 *       - Message
 *     summary: Delete a message by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 */
/**
 * @swagger
 * /api/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 */
/**
 * @swagger
 * /api/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 */
//blog
route.get('/blogs', new BlogController_1.BlogController().getAllBlogs);
route.post('/blogs', isAuthenticated_1.default, new BlogController_1.BlogController().createBlog);
route.get('/blogs/:id', new BlogController_1.BlogController().getBlogById);
route.patch('/blogs/:id', isAuthenticated_1.default, new BlogController_1.BlogController().updateBlog);
route.delete('/blogs/:id', isAuthenticated_1.default, new BlogController_1.BlogController().deleteBlog);
//comment
route.post('/blogs/:id/comments', new CommentController_1.CommentController().postComment);
route.get('/blogs/:id/comments', new CommentController_1.CommentController().getAllComments);
route.put('/blogs/:id/comments/:commentId', isAuthenticated_1.default, new CommentController_1.CommentController().hideComment);
//like
route.post('/blogs/:id/like', new LikeController_1.LikeController().likeBlog);
route.delete('/blogs/:id/unlike', new LikeController_1.LikeController().deleteLikeForBlog);
route.get('/blogs/:id/likes', new LikeController_1.LikeController().getAllLikesForBlog);
//message
route.get('/messages', isAuthenticated_1.default, new MessageController_1.MessageController().getAllMessages);
route.get('/messages/:id', isAuthenticated_1.default, new MessageController_1.MessageController().getMessageById);
route.post('/messages', new MessageController_1.MessageController().createMessage);
route.patch('/messages/:id', new MessageController_1.MessageController().updateMessage);
route.delete('/messages/:id', new MessageController_1.MessageController().deleteMessage);
//Signup/signin using jwt
route.post('/signup', new authController_1.AuthController().signup);
route.post('/signin', new authController_1.AuthController().signin);
exports.default = route;
