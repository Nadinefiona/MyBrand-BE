import { Request, Response } from 'express';
import Like, { ILike } from '../models/like';

class LikeController {
 public async likeBlog (req: Request, res: Response){
    try {
      const { blogId, userId } = req.body;
      const like: ILike = new Like({ blogId, userId });
      await like.save();
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: 'Error liking blog' });
    }
  }
  
   public async getAllLikesForBlog (req: Request, res: Response){
    try {
      const blogId: string = req.params.blogId;
      const likes: ILike[] = await Like.find({ blogId });
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving likes for blog' });
    }
  }

  public async deleteLikeForBlog(req: Request, res: Response) {
    try {
      const likeId: string = req.params.likeId; // Assuming likeId is passed in the request
      const deletedLike = await Like.findByIdAndDelete(likeId);
      if (deletedLike) {
        res.status(204).send(); // No content to send back
      } else {
        res.status(404).json({ error: 'Like not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting like for blog' });
    }
  }
}

export { LikeController };