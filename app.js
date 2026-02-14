// app.js

// ============================
// MESSAGE DATA / SIMULATION
// ============================

let messages = [
  {
    id: 1,
    sender: "Alice",
    type: "incoming",
    text: "Hey, anyone tried the new Abrox bot?",
    timestamp: new Date().toLocaleTimeString(),
    viewers: 12,
    pinned: false
  },
  {
    id: 2,
    sender: "Admin",
    type: "outgoing",
    text: "Yes! It’s working perfectly. Check the latest signals.",
    timestamp: new Date().toLocaleTimeString(),
    viewers: 45,
    pinned: true
  }
];

// ============================
// BUBBLE RENDERER
// ============================

const commentsContainer = document.getElementById("tg-comments-container");

function createBubble(msg) {
  const bubble = document.createElement("div");
  bubble.classList.add("tg-bubble", msg.type);
  if (msg.pinned) bubble.classList.add("pinned");

  // Avatar
  const avatar = document.createElement("img");
  avatar.classList.add("tg-bubble-avatar");
  avatar.src = msg.type === "incoming" ? "assets/user.jpg" : "assets/logo.jpg";
  avatar.alt = `${msg.sender} avatar`;

  // Content
  const content = document.createElement("div");
  content.classList.add("tg-bubble-content");

  const senderEl = document.createElement("div");
  senderEl.classList.add("tg-bubble-sender");
  senderEl.textContent = msg.sender;

  const textEl = document.createElement("div");
  textEl.classList.add("tg-bubble-text");
  textEl.textContent = msg.text;

  // Meta (timestamp + viewers)
  const metaEl = document.createElement("div");
  metaEl.classList.add("tg-bubble-meta");

  const timeEl = document.createElement("span");
  timeEl.textContent = msg.timestamp;

  const viewersEl = document.createElement("div");
  viewersEl.classList.add("tg-bubble-viewers");
  viewersEl.innerHTML = `<i data-lucide="eye"></i> ${msg.viewers}`;

  metaEl.appendChild(timeEl);
  metaEl.appendChild(viewersEl);

  // Assemble
  content.appendChild(senderEl);
  content.appendChild(textEl);
  content.appendChild(metaEl);

  bubble.appendChild(avatar);
  bubble.appendChild(content);

  return bubble;
}

// ============================
// RENDER ALL MESSAGES
// ============================

function renderMessages() {
  commentsContainer.innerHTML = "";
  messages.forEach(msg => {
    const bubble = createBubble(msg);
    commentsContainer.appendChild(bubble);
  });
  // Scroll to bottom after render
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

renderMessages();

// ============================
// SEND MESSAGE FUNCTION
// ============================

function sendMessage(text) {
  const newMsg = {
    id: messages.length + 1,
    sender: "You",
    type: "outgoing",
    text,
    timestamp: new Date().toLocaleTimeString(),
    viewers: 1,
    pinned: false
  };
  messages.push(newMsg);
  const bubble = createBubble(newMsg);
  commentsContainer.appendChild(bubble);
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
}

// ============================
// PIN BANNER HANDLER
// ============================

const pinBanner = document.getElementById("tg-pin-banner");

function updatePinBanner() {
  const pinnedMsg = messages.find(msg => msg.pinned);
  if (pinnedMsg) {
    pinBanner.innerHTML = `<i data-lucide="pin"></i> ${pinnedMsg.sender}: ${pinnedMsg.text}`;
    pinBanner.classList.remove("hidden");
    lucide.createIcons();
  } else {
    pinBanner.classList.add("hidden");
  }
}

updatePinBanner();

// ============================
// NEW MESSAGE JUMP INDICATOR
// ============================

const jumpIndicator = document.getElementById("tg-jump-indicator");

commentsContainer.addEventListener("scroll", () => {
  const scrollBottom = commentsContainer.scrollHeight - commentsContainer.scrollTop - commentsContainer.clientHeight;
  if (scrollBottom > 100) {
    jumpIndicator.classList.remove("hidden");
  } else {
    jumpIndicator.classList.add("hidden");
  }
});

jumpIndicator.addEventListener("click", () => {
  commentsContainer.scrollTop = commentsContainer.scrollHeight;
  jumpIndicator.classList.add("hidden");
});

// ============================
// INITIALIZE LUCIDE ICONS
// ============================

lucide.createIcons();
