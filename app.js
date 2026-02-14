// app.js — Telegram-style chat app logic

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tg-comments-container");
  const pinBanner = document.getElementById("tg-pin-banner");

  if (!container) return;

  // Example: initialize with a few messages
  const initialMessages = [
    {
      sender: "Alice",
      text: "Hey everyone! Welcome to Profit Hunters Chat.",
      type: "incoming",
      time: "10:30 AM",
      viewers: 12,
      avatar: "assets/avatar1.jpg"
    },
    {
      sender: "Bob",
      text: "Thanks! Excited to be here.",
      type: "incoming",
      time: "10:31 AM",
      viewers: 8,
      avatar: "assets/avatar2.jpg"
    }
  ];

  initialMessages.forEach(msg => window.TGRenderer.appendMessage(msg));

  // Pin banner demo
  function showPinBanner(message) {
    if(!pinBanner) return;
    pinBanner.textContent = message;
    pinBanner.classList.remove("hidden");

    // Auto-hide after 5s
    setTimeout(() => {
      pinBanner.classList.add("hidden");
    }, 5000);
  }

  // Example: show pin banner after 2s
  setTimeout(() => {
    showPinBanner("📌 New pinned message: Trading tips updated!");
  }, 2000);

  // Auto-scroll on new messages handled in bubble-renderer.js

  // Optional: hook into live updates or API
  // Example:
  // fetch('/api/messages').then(res => res.json()).then(msgs => msgs.forEach(window.TGRenderer.appendMessage));

});
