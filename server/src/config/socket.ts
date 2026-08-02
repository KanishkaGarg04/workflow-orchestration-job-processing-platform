import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initSocket = (
  server: http.Server
) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:5173",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      "✅ Client Connected:",
      socket.id
    );

    socket.on("disconnect", () => {
      console.log(
        "❌ Client Disconnected:",
        socket.id
      );
    });
  });

  return io;
};

export const getIO = () => io;