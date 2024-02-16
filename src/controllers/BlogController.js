import Blog from "../models/Blog.ts";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching blogs" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = new Blog({ title, content });
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while creating the blog" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while fetching the blog" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send({ error: "An error occurred while updating the blog" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the blog" });
  }
};
