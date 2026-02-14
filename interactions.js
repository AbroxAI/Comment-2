// Update header member count dynamically
function updateHeaderMeta(members, online) {
  const metaLine = document.getElementById("tg-meta-line");
  metaLine.textContent = `${members} members, ${online} online`;
}

// Show a pin banner
function showPinBanner(sticker, caption) {
  const pin = document.getElementById("tg-pin-banner");
  pin.innerHTML = `<img src="${sticker}" style="width:32px;height:32px;margin-right:8px;"> ${caption}`;
  pin.classList.remove("hidden");
}

// Example usage
updateHeaderMeta("1,284", "128");
showPinBanner("assets/broadcast.jpg", "Welcome to Profit Hunters!");
