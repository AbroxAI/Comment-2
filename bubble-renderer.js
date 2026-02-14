// bubble-renderer.js — Modular Telegram-style message rendering

/**
 * Renders a single chat message bubble
 * @param {Object} msg - Message object
 *   {
 *     id: string,
 *     sender: string,
 *     avatar: string,
 *     text: string,
 *     timestamp: Date | string,
 *     viewers: number,
 *     type: 'incoming' | 'outgoing',
 *     pinned: boolean
 *   }
 */
function renderBubble(msg) {
  const container = document.getElementById('tg-comments-container');
  if (!container) return;

  // Bubble wrapper
  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble', msg.type);
  if (msg.pinned) bubble.classList.add('pinned');

  // Avatar
  const avatar = document.createElement('img');
  avatar.src = msg.avatar || 'assets/default-avatar.png';
  avatar.alt = msg.sender;
  avatar.classList.add('tg-bubble-avatar');

  // Bubble content
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Sender
  const sender = document.createElement('div');
  sender.classList.add('tg-bubble-sender');
  sender.textContent = msg.sender;

  // Text
  const text = document.createElement('div');
  text.classList.add('tg-bubble-text');
  text.textContent = msg.text;

  // Meta (timestamp + viewers)
  const meta = document.createElement('div');
  meta.classList.add('tg-bubble-meta');

  // Timestamp
  const ts = document.createElement('span');
  ts.classList.add('tg-bubble-timestamp');
  ts.textContent = formatTimestamp(msg.timestamp);

  meta.appendChild(ts);

  // Viewers (eye icon)
  if (msg.viewers !== undefined) {
    const viewers = document.createElement('span');
    viewers.classList.add('tg-bubble-viewers');

    const eye = document.createElement('i');
    eye.setAttribute('data-lucide', 'eye'); // requires lucide
    viewers.appendChild(eye);

    const count = document.createElement('span');
    count.textContent = msg.viewers;
    viewers.appendChild(count);

    meta.appendChild(viewers);
    // Create lucide icons
    if (window.lucide) lucide.createIcons();
  }

  content.appendChild(sender);
  content.appendChild(text);
  content.appendChild(meta);

  bubble.appendChild(avatar);
  bubble.appendChild(content);

  container.appendChild(bubble);

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

/**
 * Format timestamp similar to Telegram
 * @param {Date|string} ts
 */
function formatTimestamp(ts) {
  const date = ts instanceof Date ? ts : new Date(ts);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const h = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const m = minutes < 10 ? '0' + minutes : minutes;
  return `${h}:${m} ${ampm}`;
}

/**
 * Render multiple messages
 * @param {Array} messages
 */
function renderMessages(messages) {
  messages.forEach(msg => renderBubble(msg));
}

// Export globally
window.renderBubble = renderBubble;
window.renderMessages = renderMessages;
