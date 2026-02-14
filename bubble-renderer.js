// bubble-renderer.js — Render chat bubbles dynamically

/**
 * @param {Object} data
 * data.sender: string
 * data.text: string
 * data.type: 'incoming' | 'outgoing'
 * data.timestamp: optional, Date or string
 * data.viewers: optional, number
 * data.pinned: optional, boolean
 */
function renderBubble(data) {
  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble', data.type);
  if (data.pinned) bubble.classList.add('pinned');

  // Avatar
  const avatar = document.createElement('img');
  avatar.classList.add('tg-bubble-avatar');
  avatar.src = data.avatar || 'assets/default-avatar.png';
  avatar.alt = data.sender || 'Member';
  bubble.appendChild(avatar);

  // Bubble content
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Sender
  const senderEl = document.createElement('div');
  senderEl.classList.add('tg-bubble-sender');
  senderEl.textContent = data.sender || 'Member';
  content.appendChild(senderEl);

  // Text
  const textEl = document.createElement('div');
  textEl.classList.add('tg-bubble-text');
  textEl.textContent = data.text || '';
  content.appendChild(textEl);

  // Meta (timestamp + viewers)
  const metaEl = document.createElement('div');
  metaEl.classList.add('tg-bubble-meta');

  if (data.timestamp) {
    const tsEl = document.createElement('span');
    tsEl.classList.add('tg-bubble-timestamp');
    tsEl.textContent = formatTimestamp(data.timestamp);
    metaEl.appendChild(tsEl);
  }

  if (data.viewers !== undefined) {
    const viewersEl = document.createElement('span');
    viewersEl.classList.add('tg-bubble-viewers');
    viewersEl.innerHTML = `<i data-lucide="eye"></i> ${data.viewers}`;
    metaEl.appendChild(viewersEl);
  }

  if (metaEl.childElementCount > 0) {
    content.appendChild(metaEl);
  }

  bubble.appendChild(content);

  // Initialize Lucide icons for dynamic bubbles
  if (window.lucide) lucide.createIcons({ parent: bubble });

  return bubble;
}

// Timestamp formatter
function formatTimestamp(input) {
  const date = input instanceof Date ? input : new Date(input);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const m = minutes < 10 ? '0' + minutes : minutes;
  return `${h}:${m} ${ampm}`;
}

// Expose globally for app.js
window.renderBubble = renderBubble;
