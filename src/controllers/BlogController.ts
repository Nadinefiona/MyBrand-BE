import CustomResponse from '../utils/response';
import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { IBlog } from '../types/BlogType';
import { blogValidationSchema } from '../utils/blogValidation';
import UploadToCloud from "../helper/cloudinary";


interface IRequestBlog extends Request {
  body: IBlog;
  file?: Express.Multer.File; // Ensure req.file is optional
}

class BlogController {
  public async getAllBlogs(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const blogs = await Blog.find();
      response.send<typeof blogs>(blogs, 'Blogs Fetched Successfully', 200);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async createBlog(req: IRequestBlog, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { error } = blogValidationSchema.validate(req.body);
     
  
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }

      if (!req.file) {
        // Check if req.file is undefined
        return res.status(400).send({ error: "File not uploaded" });
      }

      const { title, content } = req.body;
      const result = await UploadToCloud(req.file,res);
     
      const blog = new Blog({
        title,
        content,
        image: result.secure_url,
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

  public async getBlogById(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      res.send(blog);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async updateBlog(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      res.send(blog);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }

  public async deleteBlog(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const blogId = req.params.id.trim(); 
      const blog = await Blog.findByIdAndDelete(blogId);
      if (!blog) {
        return res.status(404).send({ error: "Blog not found" });
      }
      const successMessage = { message: "Blog deleted successfully" };
      res.status(204).send(successMessage);
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  
}

export { BlogController };
