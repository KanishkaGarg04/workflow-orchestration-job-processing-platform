import { Router } from "express";
import prisma from "../config/prisma";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "API and Database are connected successfully.",
    });

  } catch {

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });

  }
});

router.use("/auth", authRoutes);

router.use("/tasks", taskRoutes);

export default router;