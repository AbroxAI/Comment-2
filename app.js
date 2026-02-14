// app.js — main application logic for chat UI

document.addEventListener('DOMContentLoaded', () => {
  const commentsContainer = document.getElementById('tg-comments-container');
  const jumpIndicator = document.getElementById('tg-jump-indicator');

  // === SCROLLING & JUMP INDICATOR ===
  let userScrolled = false;

  commentsContainer.addEventListener('scroll', () => {
    const scrollBottom = commentsContainer.scrollHeight - commentsContainer.scrollTop - commentsContainer.clientHeight;
    userScrolled = scrollBottom > 10;

    if (userScrolled) {
      jumpIndicator.classList.remove('hidden');
    } else {
      jumpIndicator.classList.add('hidden');
    }
  });

  jumpIndicator.addEventListener('click', () => {
    commentsContainer.scrollTo({ top: commentsContainer.scrollHeight, behavior: 'smooth' });
    jumpIndicator.classList.add('hidden');
  });

  // === HELPER: APPEND BUBBLE ===
  window.renderBubble = function({ sender, text, type = 'incoming', timestamp = new Date(), viewers = 0, pinned = false }) {
    const bubble = document.createElement('div');
    bubble.classList.add('tg-bubble', type);
    if (pinned) bubble.classList.add('pinned');

    // Avatar
    const avatar = document.createElement('img');
    avatar.className = 'tg-bubble-avatar';
    avatar.src = type === 'outgoing' ? 'assets/avatar-you.jpg' : 'assets/avatar-other.jpg';
    bubble.appendChild(avatar);

    // Content
    const content = document.createElement('div');
    content.className = 'tg-bubble-content';

    // Sender
    const senderEl = document.createElement('div');
    senderEl.className = 'tg-bubble-sender';
    senderEl.textContent = sender;
    content.appendChild(senderEl);

    // Text
    const textEl = document.createElement('div');
    textEl.className = 'tg-bubble-text';
    textEl.textContent = text;
    content.appendChild(textEl);

    // Meta (timestamp + viewers)
    const metaEl = document.createElement('div');
    metaEl.className = 'tg-bubble-meta';

    const timeEl = document.createElement('span');
    timeEl.className = 'tg-bubble-timestamp';
    timeEl.textContent = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    metaEl.appendChild(timeEl);

    if (viewers > 0) {
      const viewersEl = document.createElement('span');
      viewersEl.className = 'tg-bubble-viewers';
      viewersEl.innerHTML = `<i data-lucide="eye"></i>${viewers}`;
      metaEl.appendChild(viewersEl);
    }

    content.appendChild(metaEl);

    bubble.appendChild(content);

    // Activate Lucide icons inside new bubble
    if (window.lucide) lucide.createIcons();

    return bubble;
  };

  // === INITIAL SCROLL TO BOTTOM ===
  commentsContainer.scrollTop = commentsContainer.scrollHeight;

  // === SIMULATE INCOMING MESSAGES ===
  setInterval(() => {
    const bubble = window.renderBubble({
      sender: 'Alice',
      text: 'This is a test message!',
      type: 'incoming',
      timestamp: new Date(),
      viewers: Math.floor(Math.random() * 20)
    });
    commentsContainer.appendChild(bubble);

    if (!userScrolled) commentsContainer.scrollTop = commentsContainer.scrollHeight;
  }, 8000);
});
