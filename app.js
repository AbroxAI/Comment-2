// app.js — Send button transform & input interactions
(() => {
  const input = document.getElementById("tg-comment-input");
  const sendBtn = document.getElementById("tg-send-btn");
  const cameraBtn = document.getElementById("tg-camera-btn");

  // Initial state — hide send button
  sendBtn.classList.add("hidden");

  // Input event listener
  input.addEventListener("input", () => {
    if (input.value.trim().length > 0) {
      // Show send button, hide camera
      sendBtn.classList.remove("hidden");
      cameraBtn.classList.add("hidden");
    } else {
      // Hide send button, show camera
      sendBtn.classList.add("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });

  // Optional: send message on Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim().length > 0) {
      e.preventDefault();
      sendMessage(input.value.trim());
      input.value = "";
      sendBtn.classList.add("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });

  function sendMessage(message) {
    // Bubble renderer handles append
    const event = new CustomEvent("sendMessage", { detail: { message } });
    document.dispatchEvent(event);
  }
})();
