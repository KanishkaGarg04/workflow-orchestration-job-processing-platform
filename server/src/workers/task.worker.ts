import taskQueue from "../queues/task.queue";
import taskRepository from "../repositories/task.repository";
import { getIO } from "../config/socket";

class TaskWorker {
  start() {
    setInterval(async () => {
      const job = taskQueue.getNext();

     
      if (!job) {
        return;
      }

      console.log(`🚀 Processing Task ${job.id}`);

      try {
       
        const task = await taskRepository.findById(job.id);

        if (!task) {
          console.log("Task not found");
          return;
        }

        
        await taskRepository.update(
          job.id,
          task.userId,
          {
            status: "PROCESSING",
          }
        );
        getIO().emit("taskUpdated", {
              id: job.id,
              status: "PROCESSING",
          });


        console.log("⏳ Working...");

        
        await new Promise((resolve) =>
          setTimeout(resolve, 5000)
        );

        // Update status -> COMPLETED
        await taskRepository.update(
          job.id,
          task.userId,
          {
            status: "COMPLETED",
          }
        );

        getIO().emit("taskUpdated", {
            id: job.id,
            status: "COMPLETED",
        });


        console.log(`✅ Completed Task ${job.id}`);
      } catch (error) {
        console.error("Worker Error:", error);

        try {
          const task = await taskRepository.findById(job.id);

          if (task) {
            await taskRepository.update(
              job.id,
              task.userId,
              {
                status: "FAILED",
              }
            );
            getIO().emit("taskUpdated", {
                id: job.id,
                status: "FAILED",
            });

          }
        } catch (err) {
          console.error("Failed to update task status:", err);
        }
      }
    }, 1000);
  }
}

export default new TaskWorker();