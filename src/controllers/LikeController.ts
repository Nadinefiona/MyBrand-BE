import { Request, Response } from 'express';
import Like, { ILike } from '../models/like';

class LikeController {
  public async likeBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Like.incrementLikeCount(id);
      res.status(201).json({ message: 'Blog liked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error liking blog' });
    }
  }
  
  public async deleteLikeForBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Like.deleteMany({ blogId: id });
      res.status(200).json({ message: 'like removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting like for blog' });
    }
  }

  public async getAllLikesForBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const likeCount: number = await Like.countDocuments({ blogId: id });
      res.status(200).json({ likeCount });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving likes for blog' });
    }
  }
}

export { LikeController };
