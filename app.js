// ============================
// app.js
// ============================

// DOM references
const commentInput = document.getElementById("tg-comment-input");
const sendBtn = document.getElementById("tg-send-btn");
const emojiBtn = document.getElementById("tg-emoji-btn");
const cameraBtn = document.getElementById("tg-camera-btn");
const inputWrapper = document.querySelector(".tg-input-wrapper");

// ============================
// Floating Pill Input Styling
// ============================
function adjustInputStyle() {
  inputWrapper.style.position = "fixed";
  inputWrapper.style.bottom = "12px";
  inputWrapper.style.left = "50%";
  inputWrapper.style.transform = "translateX(-50%)";
  inputWrapper.style.width = "calc(100% - 24px)";
  inputWrapper.style.maxWidth = "600px";
  inputWrapper.style.borderRadius = "24px";
  inputWrapper.style.padding = "6px 12px";
  inputWrapper.style.backgroundColor = getComputedStyle(inputWrapper).backgroundColor;
  inputWrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
}
adjustInputStyle();
window.addEventListener("resize", adjustInputStyle);

// ============================
// Send Button Transform
// ============================
function toggleSendButton() {
  const hasText = commentInput.value.trim().length > 0;
  if (hasText) {
    sendBtn.classList.remove("hidden");
    emojiBtn.classList.add("hidden");
    cameraBtn.classList.add("hidden");
  } else {
    sendBtn.classList.add("hidden");
    emojiBtn.classList.remove("hidden");
    cameraBtn.classList.remove("hidden");
  }
}

// Initial state
toggleSendButton();

// Listen for input
commentInput.addEventListener("input", toggleSendButton);

// ============================
// Optional: handle send click
// ============================
sendBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  // Here you would append a bubble via bubble-renderer.js
  console.log("Send:", text);

  commentInput.value = "";
  toggleSendButton();

  // Scroll to bottom or handle new message jump
  const commentsContainer = document.getElementById("tg-comments-container");
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
});

// ============================
// Optional: Emoji & Camera buttons
// ============================
emojiBtn.addEventListener("click", () => {
  console.log("Emoji picker open");
});

cameraBtn.addEventListener("click", () => {
  console.log("Camera / attach open");
});
