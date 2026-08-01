import taskQueue from "../queues/task.queue";
import taskRepository from "../repositories/task.repository";
import { TaskStatus } from "@prisma/client";

class TaskWorker {
  start() {
    setInterval(async () => {
      const task = taskQueue.getNext();

      if (!task) return;

      console.log(`Processing ${task.id}`);

      await taskRepository.updateStatus(task.id, {
        status: TaskStatus.PROCESSING,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const success = Math.random() > 0.2;

      await taskRepository.updateStatus(task.id, {
        status: success
          ? TaskStatus.COMPLETED
          : TaskStatus.FAILED,
      });

      console.log(`Finished ${task.id}`);
    }, 1000);
  }
}

export default new TaskWorker();