// bubble-renderer.js

const commentsContainer = document.getElementById("tg-comments-container");

/**
 * Create a single message bubble
 * @param {Object} msg - message object
 * @param {string} msg.sender - sender name
 * @param {string} msg.type - "incoming" or "outgoing"
 * @param {string} msg.text - message text
 * @param {string} msg.timestamp - formatted time string
 * @param {number} msg.viewers - number of viewers
 * @param {boolean} msg.pinned - whether message is pinned
 */
function createBubble(msg) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble", msg.type);
  if (msg.pinned) bubble.classList.add("pinned");

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("tg-bubble-avatar");
  avatar.src = msg.type === "incoming" ? "assets/user.jpg" : "assets/logo.jpg";
  avatar.alt = `${msg.sender} avatar`;

  // Content wrapper
  const content = document.createElement("div");
  content.classList.add("tg-bubble-content");

  // Sender
  const senderEl = document.createElement("div");
  senderEl.classList.add("tg-bubble-sender");
  senderEl.textContent = msg.sender;

  // Text
  const textEl = document.createElement("div");
  textEl.classList.add("tg-bubble-text");
  textEl.textContent = msg.text;

  // Meta (timestamp + viewers)
  const metaEl = document.createElement("div");
  metaEl.classList.add("tg-bubble-meta");

  const timeEl = document.createElement("span");
  timeEl.textContent = msg.timestamp;

  const viewersEl = document.createElement("div");
  viewersEl.classList.add("tg-bubble-viewers");
  viewersEl.innerHTML = `<i data-lucide="eye"></i> ${msg.viewers}`;

  metaEl.appendChild(timeEl);
  metaEl.appendChild(viewersEl);

  // Assemble bubble content
  content.appendChild(senderEl);
  content.appendChild(textEl);
  content.appendChild(metaEl);

  // Assemble full bubble
  bubble.appendChild(avatar);
  bubble.appendChild(content);

  return bubble;
}

/**
 * Render all messages in an array
 * @param {Array} messages - array of message objects
 */
function renderMessages(messages) {
  commentsContainer.innerHTML = "";
  messages.forEach(msg => {
    const bubble = createBubble(msg);
    commentsContainer.appendChild(bubble);
  });
  // Scroll to bottom after render
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

// Export for modular usage
window.bubbleRenderer = {
  createBubble,
  renderMessages
};

// Initialize Lucide icons
lucide.createIcons();
