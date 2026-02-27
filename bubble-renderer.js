// bubble-renderer.js — Full Telegram 2026 bubble renderer

(function () {
  const container = document.getElementById("tg-comments-container");
  if (!container) {
    console.error("bubble-renderer.js: tg-comments-container missing");
    return;
  }

  const MESSAGE_MAP = new Map();
  const DATE_FORMAT = { weekday: "short", month: "short", day: "numeric" };

  function createAvatar(persona) {
    const img = document.createElement("img");
    img.className = "tg-bubble-avatar";
    img.src = persona.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(persona.name)}&size=256&background=random`;
    img.alt = persona.name || "user";
    img.onerror = () => {
      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(persona.name || "U")}&size=256&background=random`;
    };
    return img;
  }

  function formatDateSticker(date) {
    return new Intl.DateTimeFormat("en-US", DATE_FORMAT).format(date);
  }

  function appendDateStickerIfNeeded(date) {
    const lastSticker = container.querySelector(".tg-date-sticker:last-of-type");
    const formatted = formatDateSticker(date);
    if (!lastSticker || lastSticker.textContent !== formatted) {
      const sticker = document.createElement("div");
      sticker.className = "tg-date-sticker";
      sticker.textContent = formatted;
      container.appendChild(sticker);
    }
  }

  function createBubble(persona, text, opts = {}) {
    const bubble = document.createElement("div");
    bubble.className = `tg-bubble ${opts.type || "incoming"}`;
    bubble.dataset.id = opts.id || `msg_${Date.now()}_${Math.floor(Math.random()*9999)}`;

    // Avatar
    const avatarEl = createAvatar(persona);
    bubble.appendChild(avatarEl);

    // Content
    const content = document.createElement("div");
    content.className = "tg-bubble-content";

    if (opts.replyToText) {
      const replyPreview = document.createElement("div");
      replyPreview.className = "tg-bubble-reply";
      replyPreview.textContent = opts.replyToText;
      replyPreview.addEventListener("click", () => {
        const target = Array.from(container.querySelectorAll(".tg-bubble"))
          .find(b => b.dataset.id === opts.replyToId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("tg-highlight");
          setTimeout(() => target.classList.remove("tg-highlight"), 2600);
        }
      });
      content.appendChild(replyPreview);
    }

    const textNode = document.createElement("span");
    textNode.className = "tg-bubble-text";
    textNode.textContent = text;
    content.appendChild(textNode);

    // Optional image
    if (opts.image) {
      const imgEl = document.createElement("img");
      imgEl.src = opts.image;
      imgEl.style.width = "100%";
      imgEl.style.borderRadius = "12px";
      imgEl.style.marginTop = "6px";
      content.appendChild(imgEl);
    }

    // Optional caption / admin glass
    if (opts.caption) {
      const captionEl = document.createElement("div");
      captionEl.className = "glass-btn";
      captionEl.textContent = opts.caption;
      content.appendChild(captionEl);
    }

    bubble.appendChild(content);

    if (opts.timestamp) appendDateStickerIfNeeded(opts.timestamp);

    MESSAGE_MAP.set(bubble.dataset.id, bubble);
    return bubble;
  }

  function appendMessage(persona, text, opts = {}) {
    const bubble = createBubble(persona, text, opts);
    container.appendChild(bubble);

    // Smooth scroll to bottom if near bottom
    const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 50;
    if (atBottom) {
      bubble.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    return bubble.dataset.id;
  }

  // Expose API
  window.TGRenderer = window.TGRenderer || {};
  Object.assign(window.TGRenderer, {
    appendMessage,
    createBubble
  });

})();
