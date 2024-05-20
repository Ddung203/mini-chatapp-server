document.addEventListener("DOMContentLoaded", function () {
  const messagesDiv = document.getElementById("messages");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");

  // Tạo một WebSocket client
  const ws = new WebSocket("ws://localhost:8181");

  // Lắng nghe sự kiện khi kết nối thành công
  ws.addEventListener("open", function (event) {
    console.log("Connected to WebSocket server");
  });

  // Lắng nghe sự kiện khi nhận được tin nhắn từ server
  ws.addEventListener("message", function (event) {
    const message = event.data;
    const messageElement = document.createElement("div");
    messageElement.textContent = "Server says: " + message;
    messagesDiv.appendChild(messageElement);
  });

  // Lắng nghe sự kiện khi có lỗi xảy ra
  ws.addEventListener("error", function (event) {
    console.error("WebSocket error:", event);
  });

  // Lắng nghe sự kiện khi kết nối bị đóng
  ws.addEventListener("close", function (event) {
    console.log("Disconnected from WebSocket server");
  });

  // Xử lý sự kiện gửi tin nhắn
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message !== "") {
      // Gửi tin nhắn đến server
      ws.send(message);
      messageInput.value = "";
    }
  });
});
