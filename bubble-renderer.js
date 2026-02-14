// bubble-renderer.js

const commentsContainer = document.getElementById('tg-comments-container');

/**
 * Render a chat bubble
 * @param {Object} message
 *   message = {
 *     id: string|number,
 *     sender: "Admin" | "Member",
 *     text: "Message content",
 *     timestamp: "12:34 PM",
 *     viewers: 12, // optional
 *     pinned: false, // optional
 *     outgoing: false // optional
 *   }
 */
function renderBubble(message) {
  if (!message || !message.text) return;

  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble');
  if (message.outgoing) bubble.classList.add('outgoing', 'admin');
  else bubble.classList.add('incoming', 'member');
  if (message.pinned) bubble.classList.add('pinned');

  // Avatar (optional: you can set admin/member avatar)
  const avatar = document.createElement('img');
  avatar.classList.add('tg-bubble-avatar');
  avatar.src = message.outgoing ? 'assets/admin-avatar.jpg' : 'assets/member-avatar.jpg';
  avatar.alt = message.sender;
  bubble.appendChild(avatar);

  // Content
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Sender
  const sender = document.createElement('div');
  sender.classList.add('tg-bubble-sender');
  sender.textContent = message.sender;
  content.appendChild(sender);

  // Text
  const text = document.createElement('div');
  text.classList.add('tg-bubble-text');
  text.textContent = message.text;
  content.appendChild(text);

  // Meta: timestamp + viewers
  const meta = document.createElement('div');
  meta.classList.add('tg-bubble-meta');

  const time = document.createElement('span');
  time.classList.add('tg-bubble-timestamp');
  time.textContent = message.timestamp || '';

  meta.appendChild(time);

  if (message.viewers != null) {
    const viewers = document.createElement('span');
    viewers.classList.add('tg-bubble-viewers');
    viewers.innerHTML = `<i data-lucide="eye"></i> ${message.viewers}`;
    meta.appendChild(viewers);
  }

  content.appendChild(meta);
  bubble.appendChild(content);

  commentsContainer.appendChild(bubble);

  // Auto-scroll to bottom
  commentsContainer.scrollTop = commentsContainer.scrollHeight;

  // Refresh Lucide icons
  if (window.lucide) lucide.createIcons();
}

/**
 * Example usage:
 * renderBubble({
 *   sender: "Admin",
 *   text: "Hello everyone!",
 *   timestamp: "12:34 PM",
 *   viewers: 12,
 *   pinned: true,
 *   outgoing: true
 * });
 */

export { renderBubble };
