import express from "express";
import { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } from "../controllers/BlogController.js";

const router = express.Router();

router.get("/blogs", getAllBlogs);
router.post("/blogs", createBlog);
router.get("/blogs/:id", getBlogById);
router.patch("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router;
