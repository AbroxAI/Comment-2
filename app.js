// ==============================
// APP.JS — Floating Input + Send Transform + Header Meta
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("tg-comment-input");
  const sendBtn = document.getElementById("tg-send-btn");
  const cameraBtn = document.getElementById("tg-camera-btn");
  const memberCount = document.getElementById("tg-member-count");
  const onlineCount = document.getElementById("tg-online-count");
  const metaLine = document.getElementById("tg-meta-line");

  // -----------------------------
  // Floating pill input send transform
  // -----------------------------
  const updateSendBtn = () => {
    if (input.value.trim().length > 0) {
      sendBtn.classList.remove("hidden");
      cameraBtn.classList.add("hidden");
    } else {
      sendBtn.classList.add("hidden");
      cameraBtn.classList.remove("hidden");
    }
  };

  input.addEventListener("input", updateSendBtn);
  updateSendBtn(); // init state

  // Optional: submit message on Enter
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      // Trigger bubble renderer or send logic here
      console.log("Message sent:", input.value);
      input.value = "";
      updateSendBtn();
    }
  });

  // -----------------------------
  // Header meta dynamic updates
  // -----------------------------
  const updateMeta = () => {
    if (metaLine) return; // already using single line
    if (memberCount && onlineCount) {
      const members = memberCount.textContent.replace("members", "").trim();
      const online = onlineCount.textContent.replace("online", "").trim();
      const metaContainer = document.createElement("div");
      metaContainer.id = "tg-meta-line";
      metaContainer.className = "tg-meta";
      metaContainer.textContent = `${members} members, ${online} online`;
      memberCount.parentNode.replaceWith(metaContainer);
    }
  };

  updateMeta();

  // -----------------------------
  // Pin banner interaction placeholder
  // -----------------------------
  const pinBanner = document.getElementById("tg-pin-banner");
  const showPinBanner = (message, stickerUrl) => {
    if (!pinBanner) return;
    pinBanner.innerHTML = `
      <img src="${stickerUrl}" alt="Pin Sticker" style="width:32px;height:32px;border-radius:6px;" />
      <span>${message}</span>
    `;
    pinBanner.classList.remove("hidden");
    // Auto hide after X seconds if desired
    setTimeout(() => pinBanner.classList.add("hidden"), 8000);
  };

  // Example usage:
  // showPinBanner("Welcome Admin Broadcast!", "assets/broadcast.jpg");

  // -----------------------------
  // Optional: Scroll jump indicator
  // -----------------------------
  const jumpIndicator = document.getElementById("tg-jump-indicator");
  const commentsContainer = document.getElementById("tg-comments-container");
  if (jumpIndicator && commentsContainer) {
    commentsContainer.addEventListener("scroll", () => {
      const atBottom =
        commentsContainer.scrollHeight -
          commentsContainer.scrollTop -
          commentsContainer.clientHeight <
        60;
      jumpIndicator.classList.toggle("hidden", atBottom);
    });
    jumpIndicator.addEventListener("click", () => {
      commentsContainer.scrollTo({ top: commentsContainer.scrollHeight, behavior: "smooth" });
    });
  }
});
