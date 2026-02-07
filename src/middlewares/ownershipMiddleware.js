import { getBlogById } from "../models/blog.js";

export const requireOwnerOrAdmin = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const blog = await getBlogById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isAdmin = req.user.role === "ADMIN";
    const isOwner = Number(blog.user_id) === Number(req.user.userId);

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Forbidden: not owner or admin" });
    }

    next();
  } catch (err) {
    next(err);
  }
};
