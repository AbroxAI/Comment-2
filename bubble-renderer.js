// bubble-renderer.js
// Responsible for rendering chat bubbles, avatars, timestamps, grouping

const tgContainer = document.getElementById("tg-comments-container");

// Utility: format timestamp
function formatTimestamp(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  const m = minutes < 10 ? "0" + minutes : minutes;
  return `${h}:${m} ${ampm}`;
}

// Utility: create avatar element
function createAvatar(user) {
  const avatar = document.createElement("img");
  avatar.className = "tg-avatar";
  avatar.src = user.avatar || `assets/first-letter/${user.name[0].toUpperCase()}.jpg`;
  avatar.alt = user.name;
  return avatar;
}

// Utility: create bubble
function createBubble(message, isAdmin = false, showAvatar = true) {
  const wrapper = document.createElement("div");
  wrapper.className = `tg-bubble-wrapper ${isAdmin ? "tg-admin" : "tg-member"}`;

  if (showAvatar) {
    wrapper.appendChild(createAvatar(message.user));
  }

  const bubble = document.createElement("div");
  bubble.className = "tg-bubble";

  // Message text
  const text = document.createElement("div");
  text.className = "tg-text";
  text.textContent = message.text;
  bubble.appendChild(text);

  // Timestamp
  const ts = document.createElement("div");
  ts.className = "tg-timestamp";
  ts.textContent = formatTimestamp(new Date(message.timestamp));
  bubble.appendChild(ts);

  wrapper.appendChild(bubble);

  return wrapper;
}

// Utility: insert date separator
function createDateSeparator(date) {
  const separator = document.createElement("div");
  separator.className = "tg-date-separator";
  separator.textContent = date.toDateString();
  return separator;
}

// Render messages array
function renderMessages(messages) {
  tgContainer.innerHTML = ""; // Clear first
  let lastDate = null;
  let lastUserId = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp);
    if (!lastDate || lastDate.toDateString() !== msgDate.toDateString()) {
      tgContainer.appendChild(createDateSeparator(msgDate));
      lastDate = msgDate;
    }

    // Group consecutive messages from same user
    const showAvatar = msg.user.id !== lastUserId;
    const bubbleEl = createBubble(msg, msg.user.isAdmin, showAvatar);
    tgContainer.appendChild(bubbleEl);

    lastUserId = msg.user.id;
  });

  // Scroll to bottom
  tgContainer.scrollTop = tgContainer.scrollHeight;
}

// Simulate adding new message
function appendMessage(msg) {
  const msgDate = new Date(msg.timestamp);
  const lastChild = tgContainer.lastElementChild;
  if (!lastChild || lastChild.className === "tg-date-separator" || lastChild.dataset.date !== msgDate.toDateString()) {
    tgContainer.appendChild(createDateSeparator(msgDate));
  }
  const showAvatar = lastChild && lastChild.dataset.user !== msg.user.id;
  const bubbleEl = createBubble(msg, msg.user.isAdmin, showAvatar);
  bubbleEl.dataset.user = msg.user.id;
  bubbleEl.dataset.date = msgDate.toDateString();
  tgContainer.appendChild(bubbleEl);

  tgContainer.scrollTop = tgContainer.scrollHeight;
}

// Export functions for realism engine
window.tgRender = {
  renderMessages,
  appendMessage,
};
