import dotenv from "dotenv";
import app from "./app";
import taskWorker from "./workers/task.worker";
import http from "http";
import { initSocket } from "./config/socket";
import { env } from "./config/env";

const PORT = env.PORT || 5000;
const server = http.createServer(app);

initSocket(server);
taskWorker.start();

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});