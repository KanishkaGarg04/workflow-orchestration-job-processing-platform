import { Request, Response } from "express";
import authService from "../services/auth.service";
import { ZodError } from "zod";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator";


class AuthController {
  async register(req: Request, res: Response) {
    try {
      const body = registerSchema.parse(req.body);

      const result = await authService.register(
        body.name,
        body.email,
        body.password
      );

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });

    } catch (error) {

      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues,
        });
      }

      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  }
  async login(req: Request, res: Response) {
  try {
    const body = loginSchema.parse(req.body);

    const result = await authService.login(
      body.email,
      body.password
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }

    return res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Authentication failed",
    });
  }
}
async profile(req: Request, res: Response) {
  try {

    const user = await authService.profile(
      req.user!.id
    );

    return res.json({
      success: true,
      data: user,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });

  }
}
}

export default new AuthController();