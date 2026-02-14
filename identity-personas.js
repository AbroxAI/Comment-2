// identity-personas.js
// Handles admin & member personas, avatars, and simulated activity

const personas = {
  admin: {
    id: "admin_001",
    name: "Admin",
    avatar: "assets/admin.jpg", // admin avatar
    role: "admin",
    broadcastHistory: [], // stores broadcast messages for pinning
  },
  members: [
    // Example members
    {
      id: "member_001",
      name: "Alice",
      avatar: "assets/avatars/alice.jpg",
    },
    {
      id: "member_002",
      name: "Bob",
      avatar: "assets/avatars/bob.jpg",
    },
    {
      id: "member_003",
      name: "C",
      avatar: null, // fallback to first-letter avatar
    },
    {
      id: "member_004",
      name: "Daisy",
      avatar: "assets/avatars/daisy.jpg",
    },
    // More members are generated dynamically by realism-engine
  ],
};

// Helper: Generate first-letter avatar for members without an image
function getAvatar(persona) {
  if (persona.avatar) return persona.avatar;
  const firstLetter = persona.name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128`;
}

// Randomly select a member for realistic activity
function getRandomMember() {
  const idx = Math.floor(Math.random() * personas.members.length);
  return personas.members[idx];
}

// Admin sends a broadcast message
function adminBroadcast(messageText, imageUrl = null, date = null) {
  const broadcast = {
    id: `broadcast_${Date.now()}`,
    sender: personas.admin,
    text: messageText,
    image: imageUrl, // optional jpg for the broadcast
    timestamp: date || new Date(), // March 18, 2025 can be simulated here
    pinned: false,
  };
  personas.admin.broadcastHistory.push(broadcast);

  // Add to feed using realism engine
  appendMessageToFeed(broadcast);
  return broadcast;
}

// Apply pinned status to a broadcast
function pinBroadcast(broadcast) {
  broadcast.pinned = true;
  const pinBanner = document.getElementById("tg-pin-banner");
  if (!pinBanner) return;

  // Render pin banner dynamically
  pinBanner.innerHTML = `
    <i data-lucide="pin"></i>
    <div class="tg-pin-text">
      <strong>📌 ${broadcast.text}</strong>
      ${broadcast.image ? `<img src="${broadcast.image}" alt="Broadcast Image" />` : ""}
      <div class="tg-pin-meta">${formatDate(broadcast.timestamp)}</div>
    </div>
    <button id="tg-pin-action" class="tg-pin-action">Contact Admin</button>
  `;
  pinBanner.classList.remove("hidden");
  lucide.createIcons();

  // Scroll feed to original broadcast
  document.getElementById(broadcast.id)?.scrollIntoView({ behavior: "smooth" });
}

// Format date similar to Telegram
function formatDate(d) {
  const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(d).toLocaleString("en-US", options);
}

// Expose functions for other scripts
window.personas = personas;
window.getAvatar = getAvatar;
window.getRandomMember = getRandomMember;
window.adminBroadcast = adminBroadcast;
window.pinBroadcast = pinBroadcast;

// Optional: Prepopulate some older chat history (March 2025)
(function populateInitialHistory() {
  const initialMessages = [
    {
      sender: getRandomMember(),
      text: "Welcome to Profit Hunters Chat! Excited to join.",
      timestamp: new Date("2025-03-18T09:15:00"),
    },
    {
      sender: getRandomMember(),
      text: "Does anyone have tips for trading AI bots?",
      timestamp: new Date("2025-03-18T09:20:00"),
    },
    {
      sender: personas.admin,
      text: "Please follow the group rules!",
      timestamp: new Date("2025-03-18T09:25:00"),
    },
  ];

  initialMessages.forEach((msg) => appendMessageToFeed(msg));
})();
