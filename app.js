// app.js — input bar & send button transform

const commentInput = document.getElementById("tg-comment-input");
const sendBtn = document.getElementById("tg-send-btn");
const emojiBtn = document.getElementById("tg-emoji-btn");
const cameraBtn = document.getElementById("tg-camera-btn");

// Show/hide send button dynamically
function updateSendButton() {
  if (commentInput.value.trim().length > 0) {
    // Show send button
    sendBtn.classList.remove("hidden");
    emojiBtn.classList.add("hidden");
    cameraBtn.classList.add("hidden");
  } else {
    // Show emoji & camera icons
    sendBtn.classList.add("hidden");
    emojiBtn.classList.remove("hidden");
    cameraBtn.classList.remove("hidden");
  }
}

// Input event listeners
commentInput.addEventListener("input", updateSendButton);
commentInput.addEventListener("focus", updateSendButton);
commentInput.addEventListener("blur", updateSendButton);

// Send button click
sendBtn.addEventListener("click", () => {
  const text = commentInput.value.trim();
  if (!text) return;

  // Example: render as member bubble
  chatRenderer.renderBubble({
    id: Date.now(),
    sender: "member",
    name: "You",
    avatar: "assets/member-avatar.jpg",
    text,
    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    views: 0,
    pinned: false
  });

  commentInput.value = "";
  updateSendButton();

  // Scroll to bottom
  tgCommentsContainer.scrollTop = tgCommentsContainer.scrollHeight;
});

// Initialize on load
updateSendButton();
