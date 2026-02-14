// interactions.js — dynamic header meta updates

const memberCountEl = document.getElementById("tg-member-count");
const onlineCountEl = document.getElementById("tg-online-count");
const metaLineEl   = document.getElementById("tg-meta-line"); // new combined line

// Example: initial values
let members = 1284;
let online  = 128;

// Utility: format numbers with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update header meta dynamically
function updateHeaderMeta() {
  if (metaLineEl) {
    metaLineEl.textContent = `${formatNumber(members)} members, ${formatNumber(online)} online`;
  } else {
    // fallback: individual spans
    if (memberCountEl) memberCountEl.textContent = `${formatNumber(members)} members`;
    if (onlineCountEl)  onlineCountEl.textContent = `${formatNumber(online)} online`;
  }
}

// Simulate member activity (for testing)
function simulateMemberActivity() {
  // Randomly change online count
  online = Math.max(1, online + Math.floor(Math.random()*5-2));
  updateHeaderMeta();
}

// Example: admin broadcast triggers a pin banner
const pinBanner = document.getElementById("tg-pin-banner");
function showPin(stickerUrl, caption) {
  if (!pinBanner) return;
  pinBanner.innerHTML = `<img src="${stickerUrl}" alt="Pin sticker" style="height:36px;width:36px;border-radius:6px;margin-right:8px;" />
                         <span>${caption}</span>`;
  pinBanner.classList.remove("hidden");
  // Hide after 10s (optional)
  setTimeout(()=>pinBanner.classList.add("hidden"), 10000);
}

// Initialize
updateHeaderMeta();
setInterval(simulateMemberActivity, 5000); // update every 5s
