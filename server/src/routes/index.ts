import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "API and Database are connected successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

export default router;