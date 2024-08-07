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
import {
  getAllUserOnline,
  getAllUsersExceptUsername,
  getUserBySocketId,
  updateUserSocketId,
  updateUserStatus,
} from "./src/repository/userRepository.js";
import { ioConfig } from "./src/config/io.config.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await initializeDataSource();
  } catch (error) {
    return;
  }
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, ioConfig);

  const rooms = await getConversations(); // []
  let userOnlineList = [];

  io.on("connection", async (socket) => {
    socket.emit("roomList", rooms); // return a list of room ids

    socket.on("login", async (data) => {
      const username = data.username;

      console.log(`\n>> ${username} is online`);

      await updateUserStatus(username, 1);
      await updateUserSocketId(username, socket.id);

      userOnlineList = await getAllUserOnline();

      console.log("User Online List:: ", userOnlineList);

      io.emit("userOnlineListChanged", userOnlineList);
    });

    socket.on("logout", async (username) => {
      console.log(`\n>> ${username} is offline`);

      await updateUserStatus(username, 0);
      await updateUserSocketId(
        username,
        `${username}-disconnected-${socket.id}`
      );

      userOnlineList = await getAllUserOnline();

      console.log("User Online List:: ", userOnlineList);

      io.emit("userOnlineListChanged", userOnlineList);
    });

    socket.on("joinRoom", async (data) => {
      const roomID = data.roomID;
      socket.join(roomID);
      console.log(`${data.username} joined room: ${data.roomID}`);

      const messages = await getMessagesByConversationId(data.roomID);

      io.to(data.roomID).emit("chatMessage", messages);
    });

    socket.on("leaveRoom", (data) => {
      socket.leave(data.roomID);
      console.log(`>> User ${data.username} left room: ${data.roomID}`);
    });

    socket.on("sendToken", async (data) => {
      const { roomID, token } = data;

      io.to(roomID).emit("token status", verifyJWTTokenTime(token));
    });

    socket.on("sendMessage", async (data) => {
      await createMessage(data);

      const messages = await getMessagesByConversationId(data.conversationId);

      io.to(data.conversationId).emit("chatMessage", messages);
    });

    socket.on("disconnect", async () => {
      const user = await getUserBySocketId(socket.id);
      if (user) {
        await updateUserStatus(user.username, 0);
        io.emit("userStatusChanged", {
          username: user.username,
          status: "offline",
        });
      }
    });
  });

  httpServer.listen(PORT, () => {
    console.log("Server is listening on http://localhost:" + PORT);
  });
};

startServer();
