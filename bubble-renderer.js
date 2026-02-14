// bubble-renderer.js
// Handles creating and rendering chat bubbles with realism and Telegram-style formatting

const tgCommentsContainer = document.getElementById("tg-comments-container");

/**
 * Creates a chat bubble
 * @param {Object} message - Message data
 * @param {string} message.id - Unique message id
 * @param {string} message.text - Message text
 * @param {string} message.avatar - Avatar URL or persona
 * @param {string} message.sender - 'admin' or 'member'
 * @param {Date} message.timestamp - Message timestamp
 * @param {boolean} message.isReply - Whether this is a reply preview
 * @param {Array} message.reactions - Array of emoji reactions
 */
function createBubble(message) {
  const bubbleWrapper = document.createElement("div");
  bubbleWrapper.classList.add("tg-bubble-wrapper");
  if (message.sender === "admin") bubbleWrapper.classList.add("admin-bubble");
  else bubbleWrapper.classList.add("member-bubble");

  // Avatar
  const avatar = document.createElement("img");
  avatar.src = message.avatar;
  avatar.alt = message.sender;
  avatar.className = "tg-bubble-avatar";

  // Bubble container
  const bubble = document.createElement("div");
  bubble.className = "tg-bubble";

  // Message text
  const textEl = document.createElement("div");
  textEl.className = "tg-bubble-text";
  textEl.innerText = message.text;

  // Timestamp
  const timestampEl = document.createElement("div");
  timestampEl.className = "tg-bubble-timestamp";
  timestampEl.innerText = formatTimestamp(message.timestamp);

  // Reactions
  const reactionsEl = document.createElement("div");
  reactionsEl.className = "tg-bubble-reactions";
  if (message.reactions && message.reactions.length > 0) {
    message.reactions.forEach((emoji) => {
      const span = document.createElement("span");
      span.className = "tg-reaction";
      span.innerText = emoji;
      reactionsEl.appendChild(span);
    });
  }

  // Reply preview
  if (message.isReply && message.replyText) {
    const replyEl = document.createElement("div");
    replyEl.className = "tg-bubble-reply";
    replyEl.innerText = message.replyText;
    bubble.appendChild(replyEl);
  }

  // Append text, reactions, timestamp
  bubble.appendChild(textEl);
  bubble.appendChild(reactionsEl);
  bubble.appendChild(timestampEl);

  // Compose bubble wrapper
  bubbleWrapper.appendChild(avatar);
  bubbleWrapper.appendChild(bubble);

  return bubbleWrapper;
}

/**
 * Render message to container
 * @param {Object} message
 */
function renderMessage(message) {
  const bubbleEl = createBubble(message);
  tgCommentsContainer.appendChild(bubbleEl);

  // Auto-scroll to bottom for live messages
  tgCommentsContainer.scrollTop = tgCommentsContainer.scrollHeight;
}

/**
 * Utility: format timestamp like Telegram
 */
function formatTimestamp(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Clear all messages
 */
function clearMessages() {
  tgCommentsContainer.innerHTML = "";
}

// Expose functions globally
window.bubbleRenderer = {
  renderMessage,
  clearMessages,
};
