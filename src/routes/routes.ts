import express, { IRouter } from 'express';
import { BlogController } from '../controllers/BlogController';
import { CommentController } from '../controllers/CommentController';
import { LikeController } from '../controllers/LikeController';
import { MessageController } from '../controllers/MessageController';
import { AuthController } from '../controllers/authController';
import isAuthenticated from '../Middleware/isAuthenticated';

const route: IRouter = express.Router();

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
 *     security:
 *       - BearerAuth: []
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
 *     security:
 *       - BearerAuth: []
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
 *     security:
 *       - BearerAuth: []
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
 *     security:
 *       - BearerAuth: []
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
 *     security:
 *       - BearerAuth: []
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
 *     security:
 *       - BearerAuth: []
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

route.get('/blogs', new BlogController().getAllBlogs);
route.post('/blogs',isAuthenticated ,new BlogController().createBlog);
route.get('/blogs/:id', new BlogController().getBlogById);
route.patch('/blogs/:id', isAuthenticated ,new BlogController().updateBlog);
route.delete('/blogs/:id', isAuthenticated ,new BlogController().deleteBlog);

//comment

route.post('/blogs/:id/comments', new CommentController().postComment );
route.get('/blogs/:id/comments', new CommentController().getAllComments);
route.put('/blogs/:id/comments/:commentId', isAuthenticated ,new CommentController().hideComment);


//like

route.post('/blogs/:id/like', new LikeController().likeBlog);
route.delete('/blogs/:id/unlike', new LikeController().deleteLikeForBlog);
route.get('/blogs/:id/likes', new LikeController().getAllLikesForBlog);


//message

route.get('/messages', isAuthenticated ,new MessageController().getAllMessages);
route.get('/messages/:id', isAuthenticated ,new MessageController().getMessageById);
route.post('/messages', new MessageController().createMessage);
route.delete('/messages/:id', new MessageController().deleteMessage);


//Signup/signin using jwt

route.post('/signup', new AuthController().signup);
route.post('/signin', new AuthController().signin);



export default route;


