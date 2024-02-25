import express, { IRouter } from 'express';
import { BlogController } from '../controllers/BlogController';
import { CommentController } from '../controllers/CommentController';
import { LikeController } from '../controllers/LikeController';
import { MessageController } from '../controllers/MessageController';
import { AuthController } from '../controllers/authController';
import isAuthenticated from '../Middleware/isAuthenticated';

const route: IRouter = express.Router();

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
route.patch('/messages/:id', new MessageController().updateMessage);
route.delete('/messages/:id', new MessageController().deleteMessage);


//Signup/signin using jwt

route.post('/signup', new AuthController().signup);
route.post('/signin', new AuthController().signin);



export default route;


