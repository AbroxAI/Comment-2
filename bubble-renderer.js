// bubble-renderer.js
const commentsContainer = document.getElementById("tg-comments-container");

/**
 * Creates a chat bubble
 * @param {Object} message - message object
 * message = {
 *   id: string,
 *   sender: string,
 *   avatar: string,  // URL
 *   text: string,
 *   timestamp: Date,
 *   isAdmin: boolean
 * }
 */
function createBubble(message) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble");
  bubble.classList.toggle("tg-bubble-admin", message.isAdmin);
  bubble.dataset.id = message.id;

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("tg-bubble-avatar");
  avatar.src = message.avatar;
  avatar.alt = `${message.sender} avatar`;

  // Content
  const content = document.createElement("div");
  content.classList.add("tg-bubble-content");

  // Sender
  const sender = document.createElement("div");
  sender.classList.add("tg-bubble-sender");
  sender.textContent = message.sender;

  // Message text
  const text = document.createElement("div");
  text.classList.add("tg-bubble-text");
  text.textContent = message.text;

  // Timestamp
  const timestamp = document.createElement("div");
  timestamp.classList.add("tg-bubble-timestamp");
  timestamp.textContent = formatTime(message.timestamp);

  // Append
  content.appendChild(sender);
  content.appendChild(text);
  content.appendChild(timestamp);
  bubble.appendChild(avatar);
  bubble.appendChild(content);

  return bubble;
}

// Format time similar to Telegram style (HH:MM)
function formatTime(date) {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Render messages
 * @param {Array} messages - array of message objects
 */
function renderBubbles(messages) {
  messages.forEach(msg => {
    const bubble = createBubble(msg);
    commentsContainer.appendChild(bubble);
  });

  // Scroll to bottom after rendering
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

// Example usage with historical + live messages
const demoMessages = [
  {
    id: "1",
    sender: "Admin",
    avatar: "assets/admin.jpg",
    text: "Welcome to Profit Hunters Chat! 📌",
    timestamp: new Date("2026-02-14T10:00:00"),
    isAdmin: true
  },
  {
    id: "2",
    sender: "Alice",
    avatar: "assets/member1.jpg",
    text: "Excited to join the group!",
    timestamp: new Date("2026-02-14T10:02:00"),
    isAdmin: false
  },
  {
    id: "3",
    sender: "Bob",
    avatar: "assets/member2.jpg",
    text: "Hello everyone!",
    timestamp: new Date("2026-02-14T10:05:00"),
    isAdmin: false
  }
];

// Initial render
renderBubbles(demoMessages);

// Export for other modules
window.renderBubbles = renderBubbles;
window.createBubble = createBubble;
