const input = document.getElementById("tg-comment-input");
const sendBtn = document.getElementById("tg-send-btn");
const cameraBtn = document.getElementById("tg-camera-btn");

input.addEventListener("input", () => {
  if (input.value.trim().length > 0) {
    sendBtn.style.display = "flex";
    cameraBtn.style.display = "none";
  } else {
    sendBtn.style.display = "none";
    cameraBtn.style.display = "flex";
  }
});
