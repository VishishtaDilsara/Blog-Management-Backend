import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route (quick test)
app.get("/", (req, res) => {
  res.json({ message: "Blog Management Backend API running ✅" });
});
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

export default app;
