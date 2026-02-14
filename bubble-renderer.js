// ==============================
// BUBBLE-RENDERER.JS
// ==============================

/**
 * Append a message bubble to the comments container
 * @param {Object} messageData - message info
 *   { senderName, avatarUrl, text, isAdmin, timestamp, viewers }
 */
function addBubble(messageData) {
  const container = document.getElementById("tg-comments-container");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble");
  bubble.classList.add(messageData.isAdmin ? "admin" : "member");
  if (messageData.isPinned) bubble.classList.add("pinned");

  // Avatar
  const avatar = document.createElement("img");
  avatar.className = "tg-bubble-avatar";
  avatar.src = messageData.avatarUrl || "assets/default-avatar.jpg";
  avatar.alt = messageData.senderName || "User";

  // Content
  const content = document.createElement("div");
  content.className = "tg-bubble-content";

  // Sender name
  if (!messageData.isAdmin) {
    const sender = document.createElement("div");
    sender.className = "tg-bubble-sender";
    sender.textContent = messageData.senderName || "User";
    content.appendChild(sender);
  }

  // Message text
  const text = document.createElement("div");
  text.className = "tg-bubble-text";
  text.textContent = messageData.text || "";
  content.appendChild(text);

  // Meta (timestamp + viewers)
  const meta = document.createElement("div");
  meta.className = "tg-bubble-meta";

  // Timestamp
  if (messageData.timestamp) {
    const ts = document.createElement("span");
    ts.className = "tg-bubble-timestamp";
    ts.textContent = messageData.timestamp;
    meta.appendChild(ts);
  }

  // Viewers (eye icon + count)
  if (messageData.viewers !== undefined) {
    const viewers = document.createElement("span");
    viewers.className = "tg-bubble-viewers";
    viewers.innerHTML = `<i data-lucide="eye"></i> ${messageData.viewers}`;
    meta.appendChild(viewers);
  }

  if (meta.children.length) content.appendChild(meta);

  // Assemble bubble
  if (messageData.isAdmin) {
    bubble.appendChild(content);
    bubble.appendChild(avatar); // admin avatar on right
  } else {
    bubble.appendChild(avatar);
    bubble.appendChild(content);
  }

  container.appendChild(bubble);

  // Scroll to bottom
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

  // Activate lucide icons
  if (window.lucide) lucide.createIcons();
}

// ==============================
// Optional helper: add a typing bubble
// ==============================
function addTypingBubble(senderName, avatarUrl) {
  const container = document.getElementById("tg-comments-container");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = "tg-bubble typing-bubble member";

  const avatar = document.createElement("img");
  avatar.className = "tg-bubble-avatar";
  avatar.src = avatarUrl || "assets/default-avatar.jpg";
  avatar.alt = senderName || "User";

  const content = document.createElement("div");
  content.className = "tg-bubble-content";

  const dots = document.createElement("div");
  dots.className = "typing-dots";
  dots.innerHTML = '<span></span><span></span><span></span>';

  content.appendChild(dots);
  bubble.appendChild(avatar);
  bubble.appendChild(content);
  container.appendChild(bubble);

  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

  return bubble; // return to allow removal later
}

// ==============================
// Expose globally
// ==============================
window.addBubble = addBubble;
window.addTypingBubble = addTypingBubble;
