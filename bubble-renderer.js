// bubble-renderer.js — modular Telegram-style chat bubbles

// Keep track of messages
const tgCommentsContainer = document.getElementById("tg-comments-container");

/**
 * Renders a single chat bubble
 * @param {Object} message - message object
 * @param {string} message.id - unique ID
 * @param {string} message.sender - "admin" | "member"
 * @param {string} message.name - display name
 * @param {string} message.avatar - avatar URL
 * @param {string} message.text - message text
 * @param {string} message.timestamp - timestamp string
 * @param {number} message.views - number of viewers
 * @param {boolean} message.pinned - is pinned
 */
function renderBubble(message) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble");
  bubble.classList.add(message.sender === "admin" ? "outgoing" : "incoming");
  if (message.pinned) bubble.classList.add("pinned");

  // Avatar
  const avatar = document.createElement("img");
  avatar.src = message.avatar;
  avatar.alt = message.name;
  avatar.className = "tg-avatar";

  // Content wrapper
  const content = document.createElement("div");
  content.className = "tg-bubble-content";

  // Sender name
  const sender = document.createElement("div");
  sender.className = "tg-bubble-sender";
  sender.textContent = message.name;

  // Text
  const text = document.createElement("div");
  text.className = "tg-bubble-text";
  text.textContent = message.text;

  // Bubble meta (timestamp + viewers)
  const meta = document.createElement("div");
  meta.className = "tg-bubble-meta";

  const ts = document.createElement("span");
  ts.className = "tg-bubble-timestamp";
  ts.textContent = message.timestamp;

  const viewers = document.createElement("span");
  viewers.className = "tg-bubble-viewers";
  if (message.views > 0) {
    viewers.innerHTML = `<i data-lucide="eye"></i> ${message.views}`;
  }

  meta.appendChild(ts);
  if (message.views > 0) meta.appendChild(viewers);

  content.appendChild(sender);
  content.appendChild(text);
  content.appendChild(meta);

  if (message.sender === "admin") {
    bubble.appendChild(content);
    bubble.appendChild(avatar); // admin on right
  } else {
    bubble.appendChild(avatar);
    bubble.appendChild(content);
  }

  tgCommentsContainer.appendChild(bubble);

  // Render Lucide icons
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// Example: render multiple messages
function renderMessages(messages) {
  messages.forEach(renderBubble);
}

// Clear all bubbles
function clearBubbles() {
  tgCommentsContainer.innerHTML = "";
}

// Export for modular usage
window.chatRenderer = {
  renderBubble,
  renderMessages,
  clearBubbles
};
