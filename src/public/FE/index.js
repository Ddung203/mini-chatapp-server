document.addEventListener("DOMContentLoaded", function () {
  // Load existing messages from localStorage
  const chatBox = document.getElementById("chat-box");
  const messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  // Display existing messages
  messages.forEach((message) => {
    displayMessage(message);
  });

  // Add event listener for send button
  document.getElementById("send-button").addEventListener("click", function () {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message !== "") {
      // Save message to local storage
      messages.push(message);
      localStorage.setItem("chatMessages", JSON.stringify(messages));

      // Display message
      displayMessage(message);

      // Clear input
      messageInput.value = "";
    }
  });

  // Function to display message in chat box
  function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
