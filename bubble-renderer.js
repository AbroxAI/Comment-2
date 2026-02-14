// bubble-renderer.js

const commentsContainer = document.getElementById('tg-comments-container');

/**
 * Render a chat bubble
 * @param {Object} msg
 *   msg = {
 *     sender: "username",
 *     text: "message text",
 *     type: "member" | "admin",
 *     timestamp: Date object,
 *     viewers: number,
 *     pinned: boolean
 *   }
 */
function renderBubble(msg) {
  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble');
  bubble.classList.add(msg.type === 'admin' ? 'admin' : 'member');
  if (msg.pinned) bubble.classList.add('pinned');

  // Avatar
  const avatar = document.createElement('img');
  avatar.src = msg.avatar || 'assets/avatar-placeholder.jpg';
  avatar.alt = msg.sender;
  avatar.classList.add('tg-bubble-avatar');

  // Bubble content
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Sender
  const sender = document.createElement('div');
  sender.classList.add('tg-bubble-sender');
  sender.textContent = msg.sender;

  // Message text
  const text = document.createElement('div');
  text.classList.add('tg-bubble-text');
  text.textContent = msg.text;

  // Meta (timestamp + viewers)
  const meta = document.createElement('div');
  meta.classList.add('tg-bubble-meta');

  const time = document.createElement('span');
  time.classList.add('tg-bubble-timestamp');
  time.textContent = formatTime(msg.timestamp);

  const viewers = document.createElement('span');
  viewers.classList.add('tg-bubble-viewers');
  viewers.innerHTML = `<i data-lucide="eye"></i> ${msg.viewers || 0}`;

  meta.appendChild(time);
  meta.appendChild(viewers);

  // Assemble
  content.appendChild(sender);
  content.appendChild(text);
  content.appendChild(meta);

  bubble.appendChild(avatar);
  bubble.appendChild(content);

  commentsContainer.appendChild(bubble);

  // Scroll to bottom automatically
  commentsContainer.scrollTop = commentsContainer.scrollHeight;

  // Activate Lucide icons for the new bubble
  if (window.lucide) lucide.createIcons();
}

/**
 * Format Date to HH:MM
 */
function formatTime(date) {
  if (!date) return '';
  const h = date.getHours().toString().padStart(2,'0');
  const m = date.getMinutes().toString().padStart(2,'0');
  return `${h}:${m}`;
}

/**
 * Clear all bubbles
 */
function clearBubbles() {
  commentsContainer.innerHTML = '';
}

/**
 * Example usage:
 * renderBubble({
 *   sender: "Admin",
 *   text: "Welcome to the chat!",
 *   type: "admin",
 *   timestamp: new Date(),
 *   viewers: 12,
 *   pinned: true,
 *   avatar: "assets/admin-avatar.jpg"
 * });
 */

export { renderBubble, clearBubbles };
