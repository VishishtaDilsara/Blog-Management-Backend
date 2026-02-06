import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getUser, getUsers } from "../controllers/userController";
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();

/**
 * GET /users - Admin only
 */
router.get("/", authMiddleware, requireRole("ADMIN"), getUsers);

/**
 * GET /users/:id - Protected
 * (optional extra: you can restrict to self or admin in controller/middleware later)
 */
router.get("/:id", authMiddleware, getUser);

export default router;
