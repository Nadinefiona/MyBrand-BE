import { Request, Response } from 'express';
import Comment, { IComment } from '../models/comment';
import Joi from 'joi';
import { commentValidation } from '../utils/commentValidation';

class CommentController {
    public async postComment(req: Request, res: Response){
        try {
            // Validate request body
            const { error } = commentValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { blogId, name, email, comment } = req.body;
            const newComment: IComment = new Comment({ 
                blogId: blogId as string, 
                name: name as string,
                email: email as string,
                comment: comment as string 
            });
            const savedComment = await newComment.save();
            res.status(201).json({
                comment: savedComment,
                message: 'Comment Posted Successfully'
            });
          } catch (error) {
            const errorMessage = error as string;
            res.status(500).json({ error: errorMessage });
          }
    }

    public async getAllComments(req: Request, res: Response) {
        try {
            const blogId = req.params.blogId as string;
            const comments = await Comment.find({ blogId });
            res.status(200).json({
                comments: comments,
                message: 'Comments on blog Fetched Successfully'
            });
        } catch (error) {
            const errorMessage = error as string;
            res.status(500).json({ error: errorMessage });
        }
    }

    public async hideComment(req: Request, res: Response) {
        try {
            const commentId = req.params.commentId as string;
            await Comment.findByIdAndUpdate(commentId, { hidden: true });
            res.status(200).json({ message: 'Comment hidden successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Error hiding comment' });
          }
    }
}

export { CommentController };
