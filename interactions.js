// interactions.js — header meta updates + input send button behavior

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('tg-comment-input');
  const sendBtn = document.getElementById('tg-send-btn');
  const emojiBtn = document.getElementById('tg-emoji-btn');
  const cameraBtn = document.getElementById('tg-camera-btn');
  const metaLine = document.getElementById('tg-meta-line') || document.getElementById('tg-meta');

  // === SEND BUTTON TRANSFORM ===
  function updateSendButton() {
    if (input.value.trim().length > 0) {
      sendBtn.classList.remove('hidden');
      emojiBtn.classList.add('hidden');
      cameraBtn.classList.add('hidden');
    } else {
      sendBtn.classList.add('hidden');
      emojiBtn.classList.remove('hidden');
      cameraBtn.classList.remove('hidden');
    }
  }

  input.addEventListener('input', updateSendButton);
  updateSendButton(); // initial state

  // Optional: click send triggers a message render
  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;

    // Example: render your own bubble
    if (window.renderBubble && document.getElementById('tg-comments-container')) {
      const bubble = renderBubble({
        sender: 'You',
        text,
        type: 'outgoing',
        timestamp: new Date(),
        viewers: 1
      });
      document.getElementById('tg-comments-container').appendChild(bubble);
      bubble.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    input.value = '';
    updateSendButton();
  });

  // === HEADER META UPDATES ===
  function updateHeaderMeta(members, online) {
    if (!metaLine) return;
    metaLine.textContent = `${members.toLocaleString()} members, ${online.toLocaleString()} online`;
  }

  // Example: initial header meta
  updateHeaderMeta(1284, 128);

  // Simulate dynamic updates (could be tied to WebSocket or API)
  setInterval(() => {
    const randomOnline = Math.floor(Math.random() * 200);
    updateHeaderMeta(1284, randomOnline);
  }, 5000);
});
