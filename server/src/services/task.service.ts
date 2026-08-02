import { TaskStatus } from "@prisma/client";
import taskRepository from "../repositories/task.repository";
import taskQueue from "../queues/task.queue";

class TaskService {
async createTask(
  title: string,
  description: string | undefined,
  scheduledAt: string | undefined,
  userId: string
) {
  const task = await taskRepository.create({
    title,
    description,
    scheduledAt: scheduledAt
      ? new Date(scheduledAt)
      : undefined,
    user: {
      connect: {
        id: userId,
      },
    },
  });

  taskQueue.add({
    id: task.id,
  });
  

  return task;
}

  async getTasks(
    userId: string,
    page: number,
    limit: number,
    search?: string,
    status?: TaskStatus
  ) {
    return taskRepository.findAllByUser(
      userId,
      page,
      limit,
      search,
      status
    );
  }

 async getTask(id: string, userId: string) {
  return taskRepository.findByIdAndUser(id, userId);
}

async updateTask(id: string, userId: string, data: any) {
  return taskRepository.update(id, userId, data);
}

async deleteTask(id: string, userId: string) {
  return taskRepository.delete(id, userId);
}

  async getStats(userId: string) {
    const stats = await taskRepository.stats(userId);

    const response = {
      total: 0,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    };

    stats.forEach((item) => {
      response.total += item._count;

      switch (item.status) {
        case "PENDING":
          response.pending = item._count;
          break;

        case "PROCESSING":
          response.processing = item._count;
          break;

        case "COMPLETED":
          response.completed = item._count;
          break;

        case "FAILED":
          response.failed = item._count;
          break;
      }
    });

    return response;
  }
}

export default new TaskService();