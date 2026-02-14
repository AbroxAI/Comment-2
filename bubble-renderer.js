// bubble-renderer.js — modular Telegram-style message rendering

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tg-comments-container");

  if (!container) return;

  // Helper: create a single bubble
  function createBubble({ sender, text, type = "incoming", time = "", viewers = 0, avatar }) {
    const bubble = document.createElement("div");
    bubble.className = `tg-bubble ${type}`;

    // Avatar
    const avatarEl = document.createElement("img");
    avatarEl.className = "tg-bubble-avatar";
    avatarEl.src = avatar || "assets/default-avatar.jpg";
    avatarEl.alt = sender;
    bubble.appendChild(avatarEl);

    // Content wrapper
    const content = document.createElement("div");
    content.className = "tg-bubble-content";

    // Sender name
    const senderEl = document.createElement("div");
    senderEl.className = "tg-bubble-sender";
    senderEl.textContent = sender;
    content.appendChild(senderEl);

    // Message text
    const textEl = document.createElement("div");
    textEl.className = "tg-bubble-text";
    textEl.textContent = text;
    content.appendChild(textEl);

    // Meta (time + viewers)
    const metaEl = document.createElement("div");
    metaEl.className = "tg-bubble-meta";

    if(time){
      const timeEl = document.createElement("span");
      timeEl.textContent = time;
      metaEl.appendChild(timeEl);
    }

    if(viewers){
      const viewersEl = document.createElement("div");
      viewersEl.className = "tg-bubble-viewers";
      viewersEl.textContent = `${viewers} views`;
      metaEl.appendChild(viewersEl);
    }

    content.appendChild(metaEl);

    bubble.appendChild(content);
    return bubble;
  }

  // Append a message to container
  function appendMessage(messageData) {
    const bubble = createBubble(messageData);
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight; // auto-scroll
  }

  // Expose globally for app.js to call
  window.TGRenderer = {
    appendMessage
  };

  // Example: listen to sendMessage event from interactions.js
  document.addEventListener("sendMessage", (e) => {
    const text = e.detail;
    appendMessage({
      sender: "You",
      text,
      type: "outgoing",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      viewers: 0,
      avatar: "assets/my-avatar.jpg"
    });
  });
});
