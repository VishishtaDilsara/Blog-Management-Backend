import {
  countBlogs,
  deleteBlogById,
  getBlogById,
  getBlogsPaginated,
  updateBlogById,
} from "../models/blog.js";
import { generateSummaryAI } from "../services/geminiSummaryService.js";

export const createBlogHandler = async (req, res, next) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const summary = await generateSummaryAI(content);

    const id = await createBlog({
      userId: req.user.userId,
      title,
      content,
      summary,
    });

    res.status(201).json({ message: "Blog created", id });
  } catch (err) {
    next(err);
  }
};

export const getBlogsHandler = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit || "10", 10), 1),
      50,
    );
    const offset = (page - 1) * limit;

    const [total, data] = await Promise.all([
      countBlogs(),
      getBlogsPaginated({ limit, offset }),
    ]);

    res.json({
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogByIdHandler = async (req, res, next) => {
  try {
    const blog = await getBlogById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlogHandler = async (req, res, next) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const summary = await generateSummaryAI(content);

    const affected = await updateBlogById({
      id: req.params.id,
      title,
      content,
      summary,
    });

    if (!affected) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog updated" });
  } catch (err) {
    next(err);
  }
};

export const deleteBlogHandler = async (req, res, next) => {
  try {
    const affected = await deleteBlogById(req.params.id);

    if (!affected) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};
