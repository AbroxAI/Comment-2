// ============================
// bubble-renderer.js
// ============================

// DOM reference
const commentsContainer = document.getElementById("tg-comments-container");

// Utility: format timestamp
function formatTime(date = new Date()) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Create a chat bubble
function createBubble({ sender, text, type = "member", viewers = 0, pinned = false }) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble");
  bubble.classList.add(type === "admin" ? "admin" : "member");
  if (pinned) bubble.classList.add("pinned");

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("tg-bubble-avatar");
  avatar.src = sender.avatar || "assets/default-avatar.jpg";
  avatar.alt = sender.name || "User";
  bubble.appendChild(avatar);

  // Content wrapper
  const content = document.createElement("div");
  content.classList.add("tg-bubble-content");

  // Sender name
  const senderName = document.createElement("div");
  senderName.classList.add("tg-bubble-sender");
  senderName.textContent = sender.name || "Anonymous";
  content.appendChild(senderName);

  // Message text
  const messageText = document.createElement("div");
  messageText.classList.add("tg-bubble-text");
  messageText.textContent = text;
  content.appendChild(messageText);

  // Meta: timestamp + viewers
  const meta = document.createElement("div");
  meta.classList.add("tg-bubble-meta");

  const timestamp = document.createElement("span");
  timestamp.classList.add("tg-bubble-timestamp");
  timestamp.textContent = formatTime();
  meta.appendChild(timestamp);

  if (viewers > 0) {
    const viewerSpan = document.createElement("span");
    viewerSpan.classList.add("tg-bubble-viewers");
    viewerSpan.innerHTML = `<i data-lucide="eye"></i> ${viewers}`;
    meta.appendChild(viewerSpan);
  }

  content.appendChild(meta);
  bubble.appendChild(content);

  // Append to container
  commentsContainer.appendChild(bubble);

  // Activate lucide icons
  if (window.lucide) lucide.createIcons();

  // Scroll to bottom
  commentsContainer.scrollTop = commentsContainer.scrollHeight;

  return bubble;
}

// ============================
// Example usage
// ============================
// createBubble({
//   sender: { name: "Admin", avatar: "assets/admin.jpg" },
//   text: "Welcome to Profit Hunters Chat!",
//   type: "admin",
//   viewers: 128,
//   pinned: true
// });
