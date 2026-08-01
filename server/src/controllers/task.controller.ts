import { Request, Response } from "express";
import taskService from "../services/task.service";
import { createTaskSchema } from "../validators/task.validator";

class TaskController {

  async create(req: Request, res: Response) {
    try {
      const body = createTaskSchema.parse(req.body);

      const task = await taskService.createTask(
        body.title,
        body.description,
        body.scheduledAt,
        req.user!.id
      );

      return res.status(201).json({
        success: true,
        data: task,
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search as string;
      const status = req.query.status as any;

      const tasks = await taskService.getTasks(
        req.user!.id,
        page,
        limit,
        search,
        status
      );

      return res.json({
        success: true,
        data: tasks,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const task = await taskService.getTask(
  req.params.id,
  req.user!.id
);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      return res.json({
        success: true,
        data: task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch task",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const task = await taskService.updateTask(
  req.params.id,
  req.user!.id,
  req.body
);

      return res.json({
        success: true,
        data: task,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update task",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
     await taskService.deleteTask(
  req.params.id,
  req.user!.id
);

      return res.json({
        success: true,
        message: "Task deleted successfully",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete task",
      });
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const stats = await taskService.getStats(req.user!.id);

      return res.json({
        success: true,
        data: stats,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard statistics",
      });
    }
  }
}

export default new TaskController();