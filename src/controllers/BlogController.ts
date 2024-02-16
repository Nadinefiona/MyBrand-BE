import CustomResponse from '../utils/response';
import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { IBlog } from '../types/BlogType';

interface IRequestBlog extends Request {
  body: IBlog;
}

class BlogController {
  public async GetAllBlogs(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const blogs = await Blog.find();

      response.send<typeof blogs>(blogs, 'blogs Fetched Successfully', 200);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  public async CreateBlog(req: IRequestBlog, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { title, content , image} = req.body;
      const blog = new Blog({
        title,
        content,
        image,
        date: new Date(),
      });
      const savedBlog = await blog.save();
      response.send<typeof savedBlog>(
        savedBlog,
        'Blog Created Successfully',
        201,
      );
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

 public async getBlogById (req: Request, res: Response){
  const response = new CustomResponse(req, res);
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    const errorMessage = error as string;
    response.send(null, errorMessage as string,500);
  }
}

 public async updateBlog (req: Request, res: Response){
  const response = new CustomResponse(req, res);
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    const errorMessage = error as string;
    response.send(null, errorMessage as string, 500 );
  }
}

 public async deleteBlog (req: Request, res: Response){
  const response = new CustomResponse(req, res);
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.status(204).send();
  } catch (error) {
    const errorMessage = error as string;
    response.send(null, errorMessage as string, 500 );
  }
 }

}

export { BlogController };
