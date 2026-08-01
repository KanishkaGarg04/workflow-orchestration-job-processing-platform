import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must contain at least 3 characters"),

  email: z
    .email("Invalid email address")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .email("Invalid email")
    .transform((email) => email.toLowerCase()),

  password: z
    .string()
    .min(6, "Password must contain at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;