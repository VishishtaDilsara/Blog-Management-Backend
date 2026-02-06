import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUser, getUsers } from "../controllers/userController.js";
import { requireRole } from "../middlewares/roleMiddleware.js";

const userRouter = Router();

/**
 * GET /users - Admin only
 */
userRouter.get("/", authMiddleware, requireRole("ADMIN"), getUsers);

/**
 * GET /users/:id - Protected
 * (optional extra: you can restrict to self or admin in controller/middleware later)
 */
userRouter.get("/:id", authMiddleware, getUser);

export default userRouter;
