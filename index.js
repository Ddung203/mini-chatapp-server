import * as dotenv from "dotenv";
import http from "http";
dotenv.config();

import app from "./src/app.js";
import { initializeDataSource } from "./src/config/dataSource.js";
import { WebSocket, WebSocketServer } from "ws";

// Create HTTP server by passing the Express app
const server = http.createServer(app);

// Integrate WebSocket with the HTTP server
const wss = new WebSocketServer({ server });

const messages = [];
const clients = new Map();

wss.on("connection", (ws) => {
  console.log("A user connected");

  // Gửi tin nhắn đã lưu trước đó cho người dùng mới kết nối
  ws.send(JSON.stringify({ type: "history", data: messages }));

  // const userId = generateUniqueId();
  // clients.set(userId, ws);

  // Lắng nghe tin nhắn từ client
  ws.on("message", (data) => {
    const message = data.toString();
    console.log("message: ", message);

    // Lưu tin nhắn vào mảng
    messages.push(message);

    // Gửi tin nhắn tới tất cả các người dùng
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "chat message", data: message }));
      }
    });

    // handleMessage(userId, message);
  });

  ws.on("close", () => {
    // Xử lý sự kiện khi kết nối bị đóng
    clients.delete(userId); // Xóa kết nối WebSocket khỏi danh sách khi nó đóng
  });
});

// ws.on("close", () => {
//   console.log("User disconnected");
// });

server.listen(8181, () => {
  console.log(`Server running on port 8181`);
});

app.listen(process.env.PORT, async () => {
  await initializeDataSource();
  console.log("Server is listening on http://localhost:" + process.env.PORT);
});
