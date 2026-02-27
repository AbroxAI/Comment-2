// bubble-renderer.js — Telegram 2026 fully compatible
(function () {
  const MESSAGE_MAP = new Map();
  const TGRenderer = window.TGRenderer || {};

  // ================= SAFE APPEND =================
  function appendMessage(persona, text, opts = {}) {
    const container = document.getElementById("tg-comments-container");
    if (!container) return null;

    const messageId = "msg_" + Date.now() + "_" + Math.floor(Math.random() * 9999);
    MESSAGE_MAP.set(messageId, { persona, text, opts });

    const bubble = document.createElement("div");
    bubble.className = "tg-bubble " + (opts.type === "outgoing" ? "outgoing" : "incoming");
    bubble.dataset.id = messageId;

    // avatar
    const avatar = document.createElement("img");
    avatar.className = "tg-bubble-avatar";
    avatar.src = persona.avatar || "assets/admin.jpg";
    avatar.alt = persona.name || "User";
    avatar.onerror = () => avatar.src = "assets/admin.jpg";

    // bubble content
    const content = document.createElement("div");
    content.className = "tg-bubble-content";

    // reply preview
    if (opts.replyToText) {
      const reply = document.createElement("div");
      reply.className = "tg-bubble-reply";
      reply.textContent = opts.replyToText.slice(0, 60);
      content.appendChild(reply);
    }

    // text
    const textNode = document.createElement("span");
    textNode.className = "tg-bubble-text";
    textNode.textContent = text || "";
    content.appendChild(textNode);

    // image/caption
    if (opts.image) {
      const img = document.createElement("img");
      img.src = opts.image;
      img.style.maxWidth = "100%";
      img.style.borderRadius = "12px";
      img.onerror = () => img.src = persona.avatar || "assets/admin.jpg";
      content.appendChild(img);
      if (opts.caption) {
        const caption = document.createElement("div");
        caption.textContent = opts.caption;
        caption.style.fontSize = "0.85rem";
        caption.style.marginTop = "4px";
        content.appendChild(caption);
      }
    }

    // append
    bubble.appendChild(avatar);
    bubble.appendChild(content);
    container.appendChild(bubble);

    // scroll
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    return messageId;
  }

  // ================= TYPING =================
  function showTyping(persona, duration = 1200) {
    const container = document.getElementById("tg-comments-container");
    if (!container) return;

    const bubble = document.createElement("div");
    bubble.className = "tg-bubble incoming tg-typing";
    const avatar = document.createElement("img");
    avatar.className = "tg-bubble-avatar";
    avatar.src = persona.avatar || "assets/admin.jpg";
    avatar.alt = persona.name || "User";
    bubble.appendChild(avatar);

    const content = document.createElement("div");
    content.className = "tg-bubble-content";
    content.textContent = "typing...";
    bubble.appendChild(content);

    container.appendChild(bubble);
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });

    setTimeout(() => bubble.remove(), duration);
  }

  // ================= DATE STICKERS =================
  let lastDateStr = "";
  function maybeInsertDateSticker(timestamp = Date.now()) {
    const container = document.getElementById("tg-comments-container");
    if (!container) return;

    const date = new Date(timestamp);
    const dateStr = date.toDateString();
    if (dateStr === lastDateStr) return;
    lastDateStr = dateStr;

    const sticker = document.createElement("div");
    sticker.className = "tg-date-sticker";
    sticker.textContent = dateStr;
    container.appendChild(sticker);
  }

  // ================= PUBLIC =================
  TGRenderer.appendMessage = appendMessage;
  TGRenderer.showTyping = showTyping;
  TGRenderer.maybeInsertDateSticker = maybeInsertDateSticker;
  window.TGRenderer = TGRenderer;

  console.log("bubble-renderer.js initialized — ready to append messages");
})();
