import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route (quick test)
app.get("/", (req, res) => {
  res.json({ message: "Blog Management Backend API running ✅" });
});

export default app;
