// interactions.js — modular Telegram-style interactions

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tg-comment-input");
  const sendBtn = document.getElementById("tg-send-btn");
  const emojiBtn = document.getElementById("tg-emoji-btn");
  const cameraBtn = document.getElementById("tg-camera-btn");

  const metaLine = document.getElementById("tg-meta-line");
  const memberCount = 1284; // replace with dynamic value if needed
  const onlineCount = 128;  // replace with dynamic value if needed

  // Initialize header meta
  if(metaLine){
    metaLine.textContent = `${memberCount.toLocaleString()} members, ${onlineCount} online`;
  }

  // Input event — toggle send button
  input.addEventListener("input", () => {
    if(input.value.trim().length > 0){
      sendBtn.classList.remove("hidden");
      emojiBtn.classList.add("hidden");
      cameraBtn.classList.add("hidden");
    } else {
      sendBtn.classList.add("hidden");
      emojiBtn.classList.remove("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });

  // Optional: focus + blur styling (floating effect)
  input.addEventListener("focus", () => {
    input.parentElement.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  });

  input.addEventListener("blur", () => {
    input.parentElement.style.boxShadow = "none";
  });

  // Send button click
  sendBtn.addEventListener("click", () => {
    if(input.value.trim() !== ""){
      // Dispatch custom event for app.js or bubble-renderer.js
      const event = new CustomEvent("sendMessage", { detail: input.value.trim() });
      document.dispatchEvent(event);
      input.value = "";
      sendBtn.classList.add("hidden");
      emojiBtn.classList.remove("hidden");
      cameraBtn.classList.remove("hidden");
    }
  });
});
