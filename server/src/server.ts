import app from "./app";
import http from "http";
import taskWorker from "./workers/task.worker";
import { initSocket } from "./config/socket";
import { env } from "./config/env";

const PORT = env.PORT;

const server = http.createServer(app);

initSocket(server);

taskWorker.start();

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});