import { Prisma, Task, TaskStatus } from "@prisma/client";
import prisma from "../config/prisma";

class TaskRepository {
  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({
      data,
    });
  }

  async findAllByUser(
    userId: string,
    page: number,
    limit: number,
    search?: string,
    status?: TaskStatus
  ) {
    return prisma.task.findMany({
      where: {
        userId,

        ...(search && {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }),

        ...(status && {
          status,
        }),
      },

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * limit,

      take: limit,
    });
  }

  async countByUser(userId: string) {
    return prisma.task.count({
      where: {
        userId,
      },
    });
  }

  // Worker uses this
  async findById(id: string) {
    return prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  // API uses this
  async findByIdAndUser(id: string, userId: string) {
    return prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    id: string,
    userId: string,
    data: Prisma.TaskUpdateInput
  ) {
    const task = await this.findByIdAndUser(id, userId);

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const task = await this.findByIdAndUser(id, userId);

    if (!task) {
      throw new Error("Task not found");
    }

    return prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async stats(userId: string) {
    return prisma.task.groupBy({
      by: ["status"],

      where: {
        userId,
      },

      _count: true,
    });
  }
}

export default new TaskRepository();