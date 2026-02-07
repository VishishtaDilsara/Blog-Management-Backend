import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createBlogHandler,
  deleteBlogHandler,
  getBlogByIdHandler,
  getBlogsHandler,
  updateBlogHandler,
} from "../controllers/blogController.js";
import { requireOwnerOrAdmin } from "../middlewares/ownershipMiddleware.js";

const blogRouter = Router();

// POST /blogs (Protected)
blogRouter.post("/", authMiddleware, createBlogHandler);

// GET /blogs (Pagination)
blogRouter.get("/", getBlogsHandler);

// GET /blogs/:id
blogRouter.get("/:id", getBlogByIdHandler);

// PUT /blogs/:id (Owner or Admin only)
blogRouter.put("/:id", authMiddleware, requireOwnerOrAdmin, updateBlogHandler);

// DELETE /blogs/:id (Admin only)
blogRouter.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  deleteBlogHandler,
);

export default blogRouter;
