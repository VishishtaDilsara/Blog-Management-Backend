import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const authRouter = Router();

/* POST /auth/register */
authRouter.post("/register", register);

/* POST /auth/login */

authRouter.post("/login", login);

export default authRouter;
