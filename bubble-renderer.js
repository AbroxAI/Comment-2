// bubble-renderer.js
// Responsible for rendering chat bubbles dynamically

const commentsContainer = document.getElementById('tg-comments-container');

/**
 * Create a single message bubble
 * @param {Object} message - {id, sender, text, time, viewers, admin, pinned, avatar}
 */
function createBubble(message) {
  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble');

  if (message.admin) bubble.classList.add('outgoing'); // admin messages to the right
  else bubble.classList.add('incoming');

  if (message.pinned) bubble.classList.add('pinned');

  // Avatar
  const avatar = document.createElement('img');
  avatar.classList.add('tg-bubble-avatar');
  avatar.src = message.avatar || 'assets/default-avatar.jpg';
  avatar.alt = message.sender;

  // Bubble content
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Sender name
  if (message.sender) {
    const senderName = document.createElement('div');
    senderName.classList.add('tg-bubble-sender');
    senderName.textContent = message.sender;
    content.appendChild(senderName);
  }

  // Message text
  const text = document.createElement('div');
  text.classList.add('tg-bubble-text');
  text.innerHTML = message.text;
  content.appendChild(text);

  // Bubble meta (time + viewers)
  const meta = document.createElement('div');
  meta.classList.add('tg-bubble-meta');

  // Timestamp
  const timestamp = document.createElement('span');
  timestamp.classList.add('tg-bubble-timestamp');
  timestamp.textContent = message.time || '';
  meta.appendChild(timestamp);

  // Viewer count with eye icon
  if (message.viewers) {
    const viewers = document.createElement('span');
    viewers.classList.add('tg-bubble-viewers');
    viewers.innerHTML = `<i data-lucide="eye"></i> ${message.viewers}`;
    meta.appendChild(viewers);
  }

  content.appendChild(meta);

  // Append avatar + content in correct order
  if (message.admin) {
    bubble.appendChild(content);
    bubble.appendChild(avatar);
  } else {
    bubble.appendChild(avatar);
    bubble.appendChild(content);
  }

  return bubble;
}

/**
 * Render multiple messages
 * @param {Array} messages
 */
function renderBubbles(messages) {
  commentsContainer.innerHTML = '';
  messages.forEach(msg => {
    const bubble = createBubble(msg);
    commentsContainer.appendChild(bubble);
  });

  // Scroll to bottom
  commentsContainer.scrollTop = commentsContainer.scrollHeight;

  // Recreate Lucide icons inside new bubbles
  if (window.lucide) lucide.createIcons();
}

// Example usage:
// renderBubbles([
//   { sender: "Alice", text: "Hello!", time: "12:45", viewers: 3, avatar:"assets/alice.jpg" },
//   { sender: "Admin", text: "Pinned message here", time: "12:46", viewers: 128, admin:true, pinned:true }
// ]);

export { renderBubbles, createBubble };
