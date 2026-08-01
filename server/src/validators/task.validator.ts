import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters"),

  description: z
    .string()
    .optional(),

  scheduledAt: z
    .string()
    .datetime()
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(3).optional(),

  description: z.string().optional(),

  status: z.enum([
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
  ]).optional(),

  scheduledAt: z.string().datetime().optional(),
});