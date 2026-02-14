// app.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tg-comment-input");
  const sendBtn = document.getElementById("tg-send-btn");
  const cameraBtn = document.getElementById("tg-camera-btn");

  // Initially hide send, show camera/emoji
  sendBtn.classList.add("hidden");
  cameraBtn.classList.remove("hidden");

  input.addEventListener("input", () => {
    if (input.value.trim().length > 0) {
      // Show send, hide camera
      sendBtn.classList.remove("hidden");
      cameraBtn.classList.add("hidden");
    } else {
      // Hide send, show camera
      sendBtn.classList.add("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });

  // Optional: press enter to send
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim().length > 0) {
      sendMessage(input.value);
      input.value = "";
      sendBtn.classList.add("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });

  function sendMessage(text) {
    // Bubble renderer handles appending message
    if (typeof appendBubble === "function") {
      appendBubble({
        sender: "member",
        text,
        timestamp: new Date(),
        viewers: 0,
      });
    }
    // Optional: scroll to bottom
    const container = document.getElementById("tg-comments-container");
    container.scrollTop = container.scrollHeight;
  }
});
