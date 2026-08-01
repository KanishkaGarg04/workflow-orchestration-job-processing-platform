type QueueTask = {
  id: string;
};

class TaskQueue {
  private queue: QueueTask[] = [];

  add(task: QueueTask) {
    this.queue.push(task);
  }

  getNext() {
    return this.queue.shift();
  }

  size() {
    return this.queue.length;
  }
}

export default new TaskQueue();