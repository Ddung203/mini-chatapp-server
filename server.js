import http from "http";
import app from "./src/app.js";
import { Server } from "socket.io";
import { getConversations } from "./src/repository/conversationRepository.js";
import { initializeDataSource } from "./src/config/dataSource.js";
import {
  createMessage,
  getMessagesByConversationId,
} from "./src/repository/messageRepository.js";
import { verifyJWTTokenTime } from "./src/utils/token.js";
import * as dotenv from "dotenv";
import { updateUserStatus } from "./src/repository/userRepository.js";
import { ioConfig } from "./src/config/io.config.js";

dotenv.config();

const PORT = process.env.PORT || 8181;

const startServer = async () => {
  try {
    await initializeDataSource();
  } catch (error) {
    return;
  }
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, ioConfig);

  const messages = {};
  const rooms = await getConversations(); // []

  io.on("connection", async (socket) => {
    socket.emit("roomList", rooms); // return a list of room ids

    socket.on("joinRoom", async (data) => {
      const roomID = data.roomID;

      socket.join(roomID);
      console.log(`${data.username} joined room: ${roomID}`);

      await updateUserStatus(data.username, 1);
      messages[roomID] = await getMessagesByConversationId(roomID);
      socket.emit("history", messages[roomID]);
      // socket.emit("history", {});
    });

    socket.on("leaveRoom", async (roomID) => {
      socket.leave(roomID);
      // await updateUserStatus(data.username, 0);
      console.log(`User left room: ${roomID}`);
    });

    socket.on("sendToken", async (data) => {
      const { roomID, token } = data;

      io.to(roomID).emit("token status", verifyJWTTokenTime(token));
    });

    socket.on("sendMessage", async (message) => {
      const { roomID, data } = message;

      await createMessage(data);

      messages[roomID] = await getMessagesByConversationId(roomID);

      console.log("\nmessages[roomID] :>> ", messages[roomID]);
      io.to(roomID).emit("chat message", messages[roomID]);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  httpServer.listen(PORT, () => {
    console.log("Server is listening on http://localhost:" + PORT);
  });
};

startServer();
