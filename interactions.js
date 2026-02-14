// interactions.js
// Handles admin broadcasts, pin banner display, and other interactions

const pinBanner = document.getElementById('tg-pin-banner');

/**
 * Show admin broadcast as a pin banner
 * @param {Object} broadcast - {image, caption, duration}
 */
function showPinBanner(broadcast) {
  // Clear previous content
  pinBanner.innerHTML = '';

  // Create image if available
  if (broadcast.image) {
    const img = document.createElement('img');
    img.src = broadcast.image;
    img.alt = 'Pin';
    img.style.height = '48px';
    img.style.width = '48px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    pinBanner.appendChild(img);
  }

  // Caption
  if (broadcast.caption) {
    const caption = document.createElement('div');
    caption.textContent = broadcast.caption;
    caption.style.flex = '1';
    caption.style.marginLeft = '8px';
    caption.style.fontSize = '13px';
    caption.style.color = 'inherit';
    pinBanner.appendChild(caption);
  }

  // Show the banner
  pinBanner.classList.remove('hidden');

  // Auto-hide after duration (default 10s)
  const duration = broadcast.duration || 10000;
  setTimeout(() => {
    pinBanner.classList.add('hidden');
  }, duration);
}

/**
 * Trigger admin broadcast + also render it in chat bubble
 * @param {Object} broadcast
 */
function adminBroadcast(broadcast) {
  // Show as pin banner
  showPinBanner(broadcast);

  // Also render as admin bubble
  const { createBubble, renderBubbles } = window.BubbleRenderer || {};
  if (createBubble && renderBubbles) {
    // Fetch existing bubbles (optional: maintain message queue)
    const messages = window.chatMessages || [];
    const msgObj = {
      sender: 'Admin',
      text: broadcast.caption || '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      viewers: 0,
      admin: true,
      pinned: true,
      avatar: broadcast.avatar || 'assets/admin-avatar.jpg'
    };
    messages.push(msgObj);
    window.chatMessages = messages;

    renderBubbles(messages);
  }
}

// Example usage
// adminBroadcast({
//   image: 'assets/broadcast.jpg',
//   caption: '🎉 Welcome to Profit Hunters!',
//   duration: 15000
// });

// Export if using modules
export { showPinBanner, adminBroadcast };
