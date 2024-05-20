import http from "http";
import app from "./src/app.js";
import { Server } from "socket.io";

const httpServer = http.createServer(app);
const PORT = 8181;

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const messages = [];
const clients = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  // Gửi tin nhắn đã lưu trước đó cho người dùng mới kết nối
  socket.emit("history", messages);

  // Lắng nghe tin nhắn từ client
  socket.on("sendMessage", (message) => {
    console.log("message: ", message);

    messages.push(message);

    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is listening on http://localhost:" + PORT);
});
