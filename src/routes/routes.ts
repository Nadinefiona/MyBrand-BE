import express, { IRouter } from 'express';
import { BlogController } from '../controllers/BlogController';
import { CommentController } from '../controllers/CommentController';
import { LikeController } from '../controllers/LikeController';
import { MessageController } from '../controllers/MessageController';
import { AuthController } from '../controllers/authController';

const route: IRouter = express.Router();

//blog

route.get('/blogs', new BlogController().getAllBlogs);
route.post('/blogs', new BlogController().createBlog);
route.get('/blogs/:id', new BlogController().getBlogById);
route.patch('/blogs/:id', new BlogController().updateBlog);
route.delete('/blogs/:id', new BlogController().deleteBlog);

//comment

route.post('/comment', new CommentController().postComment );
route.get('/comments/:blogId', new CommentController().getAllComments);
route.put('/comment/:commentId/hide', new CommentController().hideComment);

//like

route.post('/like', new LikeController().likeBlog);
route.get('/likes/:blogId', new LikeController().getAllLikesForBlog);
route.delete('/blogs/:blogId/likes/:likeId', new LikeController().deleteLikeForBlog);


//message

route.get('/messages', new MessageController().getAllMessages);
route.get('/messages/:id', new MessageController().getMessageById);
route.post('/messages', new MessageController().createMessage);
route.patch('/messages/:id', new MessageController().updateMessage);
route.delete('/messages/:id', new MessageController().deleteMessage);


//Signup/signin using jwt

route.post('/signup', new AuthController().signup);
route.post('/signin', new AuthController().signin);



export default route;