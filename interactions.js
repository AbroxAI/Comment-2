// ============================
// interactions.js
// ============================

// DOM references
const pinBanner = document.getElementById("tg-pin-banner");
const memberCountElem = document.getElementById("tg-member-count");
const onlineCountElem = document.getElementById("tg-online-count");
const metaLine = document.getElementById("tg-meta-line"); // if using combined line

// ============================
// Header Meta Updates
// ============================
export function updateHeaderMeta(members, online) {
  if (metaLine) {
    // Telegram style: "1,284 members, 128 online"
    metaLine.textContent = `${members.toLocaleString()} members, ${online.toLocaleString()} online`;
  } else {
    // Fallback if separate spans
    if (memberCountElem) memberCountElem.textContent = `${members.toLocaleString()} members`;
    if (onlineCountElem) onlineCountElem.textContent = `${online.toLocaleString()} online`;
  }
}

// ============================
// Pin Banner Handling
// ============================
export function showPinBanner(stickerUrl, caption) {
  if (!pinBanner) return;
  pinBanner.innerHTML = ""; // clear previous

  // Sticker
  const img = document.createElement("img");
  img.src = stickerUrl;
  img.alt = "Pinned";
  img.style.width = "36px";
  img.style.height = "36px";
  img.style.borderRadius = "8px";
  img.style.objectFit = "cover";

  // Caption
  const span = document.createElement("span");
  span.textContent = caption;
  span.style.flex = "1";
  span.style.fontSize = "13px";
  span.style.color = "inherit";

  pinBanner.appendChild(img);
  pinBanner.appendChild(span);
  pinBanner.classList.remove("hidden");
}

// Optional: hide pin banner after some time
export function hidePinBanner(delay = 5000) {
  if (!pinBanner) return;
  setTimeout(() => {
    pinBanner.classList.add("hidden");
  }, delay);
}

// ============================
// Example usage (can be triggered from app.js)
// ============================
// updateHeaderMeta(1284, 128);
// showPinBanner("assets/broadcast.jpg", "Welcome to Profit Hunters Chat!");
// hidePinBanner(8000);
