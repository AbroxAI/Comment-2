// interactions.js

// ============================
// HEADER META UPDATES
// ============================

const memberCount = document.getElementById("tg-member-count");
const onlineCount = document.getElementById("tg-online-count");
const metaLine = document.getElementById("tg-meta-line");

// Example: update counts dynamically (replace with real data)
function updateHeaderMeta(members, online) {
  if (metaLine) {
    metaLine.textContent = `${members.toLocaleString()} members, ${online.toLocaleString()} online`;
  }
}

// Initial update (can be replaced with real fetch)
updateHeaderMeta(1284, 128);

// ============================
// SEND BUTTON TRANSFORM
// ============================

const commentInput = document.getElementById("tg-comment-input");
const sendBtn = document.getElementById("tg-send-btn");
const emojiBtn = document.getElementById("tg-emoji-btn");
const cameraBtn = document.getElementById("tg-camera-btn");

function toggleSendButton() {
  const hasText = commentInput.value.trim().length > 0;
  if (hasText) {
    // Hide emoji/camera, show send
    sendBtn.classList.remove("hidden");
    emojiBtn.classList.add("hidden");
    cameraBtn.classList.add("hidden");
  } else {
    // Show emoji/camera, hide send
    sendBtn.classList.add("hidden");
    emojiBtn.classList.remove("hidden");
    cameraBtn.classList.remove("hidden");
  }
}

// Listen for input changes
commentInput.addEventListener("input", toggleSendButton);

// Optional: Enter key to send message
commentInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && commentInput.value.trim().length > 0) {
    e.preventDefault();
    // Call sendMessage function (to be implemented in app.js)
    sendMessage(commentInput.value.trim());
    commentInput.value = "";
    toggleSendButton();
  }
});

// ============================
// INITIALIZE
// ============================

// Ensure input button state is correct on page load
toggleSendButton();

// Example: simulate live updates every 10s (replace with real API)
setInterval(() => {
  const simulatedMembers = 1200 + Math.floor(Math.random() * 100);
  const simulatedOnline = 100 + Math.floor(Math.random() * 50);
  updateHeaderMeta(simulatedMembers, simulatedOnline);
}, 10000);
