// bubble-renderer.js

const commentsContainer = document.getElementById("tg-comments-container");

// Utility to format timestamp
function formatTimestamp(date = new Date()) {
  const hours = date.getHours().toString().padStart(2,"0");
  const minutes = date.getMinutes().toString().padStart(2,"0");
  return `${hours}:${minutes}`;
}

// Render a message bubble
function renderBubble({ sender, text, timestamp = new Date(), viewers = 0, pinned = false, outgoing = false }) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble");
  bubble.classList.add(outgoing ? "outgoing" : "incoming");
  if (pinned) bubble.classList.add("pinned");

  // Avatar (only for incoming)
  if (!outgoing) {
    const avatar = document.createElement("img");
    avatar.src = sender.avatar || "assets/default-avatar.jpg";
    avatar.classList.add("tg-bubble-avatar");
    bubble.appendChild(avatar);
  }

  // Bubble content
  const content = document.createElement("div");
  content.classList.add("tg-bubble-content");

  // Sender name (optional)
  if (!outgoing) {
    const senderEl = document.createElement("div");
    senderEl.classList.add("tg-bubble-sender");
    senderEl.textContent = sender.name || "Member";
    content.appendChild(senderEl);
  }

  // Message text
  const textEl = document.createElement("div");
  textEl.classList.add("tg-bubble-text");
  textEl.textContent = text;
  content.appendChild(textEl);

  // Meta (timestamp + viewers)
  const metaEl = document.createElement("div");
  metaEl.classList.add("tg-bubble-meta");

  const ts = document.createElement("span");
  ts.classList.add("tg-bubble-timestamp");
  ts.textContent = formatTimestamp(timestamp);
  metaEl.appendChild(ts);

  if (!outgoing) {
    const viewersEl = document.createElement("span");
    viewersEl.classList.add("tg-bubble-viewers");
    viewersEl.innerHTML = `<i data-lucide="eye"></i> ${viewers}`;
    metaEl.appendChild(viewersEl);
  }

  content.appendChild(metaEl);
  bubble.appendChild(content);

  commentsContainer.appendChild(bubble);
  bubble.scrollIntoView({ behavior: "smooth", block: "end" });

  // Refresh lucide icons
  lucide.createIcons();
}

// Example usage
renderBubble({
  sender: { name: "Admin", avatar: "assets/logo.jpg" },
  text: "Welcome to Profit Hunters! 🎉",
  viewers: 128,
  pinned: true,
  outgoing: false
});

renderBubble({
  sender: { name: "You" },
  text: "Glad to be here!",
  viewers: 0,
  outgoing: true
});
