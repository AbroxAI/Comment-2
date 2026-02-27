// bubble-renderer.js — Progressive Chat Bubble Renderer
// ====================================================
// Handles incoming/outgoing chat bubbles, avatars, reply previews, date stickers, seen indicators, smooth scroll, and joiner integration.

(function(){

const TGRenderer = {};
window.TGRenderer = TGRenderer;

const MESSAGE_MAP = new Map();
const COMMENTS_CONTAINER = document.getElementById('tg-comments-container');
const NEW_PILL = document.getElementById('tg-new-pill');

TGRenderer.appendMessage = function(persona, text, opts={}) {
  const type = opts.type || "incoming";
  const timestamp = opts.timestamp || new Date();
  const id = opts.id || `msg_${Date.now()}_${Math.floor(Math.random()*9999)}`;
  const replyToId = opts.replyToId || null;
  const replyToText = opts.replyToText || null;

  if(!COMMENTS_CONTAINER) return;

  // =========================
  // CREATE BUBBLE ELEMENT
  // =========================
  const bubble = document.createElement('div');
  bubble.classList.add('tg-bubble', type);
  bubble.dataset.id = id;

  // Avatar
  const avatar = document.createElement('img');
  avatar.classList.add('tg-bubble-avatar');
  avatar.src = persona.avatar || `https://ui-avatars.com/api/?name=${persona.name||"U"}`;
  avatar.alt = persona.name || "User";
  bubble.appendChild(avatar);

  // Content wrapper
  const content = document.createElement('div');
  content.classList.add('tg-bubble-content');

  // Reply preview
  if(replyToText && replyToId){
    const reply = document.createElement('div');
    reply.classList.add('tg-bubble-reply');
    reply.textContent = replyToText;
    reply.addEventListener('click', ()=> {
      const target = COMMENTS_CONTAINER.querySelector(`.tg-bubble[data-id='${replyToId}']`);
      if(target) target.scrollIntoView({behavior:'smooth',block:'center'});
    });
    content.appendChild(reply);
  }

  // Message text
  const msgText = document.createElement('span');
  msgText.classList.add('tg-bubble-text');
  msgText.textContent = text;
  content.appendChild(msgText);

  bubble.appendChild(content);

  // =========================
  // DATE STICKER
  // =========================
  const lastBubble = COMMENTS_CONTAINER.lastElementChild;
  if(lastBubble){
    const lastDate = new Date(lastBubble.dataset.timestamp||Date.now());
    if(lastDate.toDateString() !== timestamp.toDateString()){
      const dateSticker = document.createElement('div');
      dateSticker.classList.add('tg-date-sticker');
      dateSticker.textContent = timestamp.toDateString();
      COMMENTS_CONTAINER.appendChild(dateSticker);
    }
  }

  bubble.dataset.timestamp = timestamp;

  COMMENTS_CONTAINER.appendChild(bubble);
  MESSAGE_MAP.set(id,bubble);

  // =========================
  // SCROLL & NEW PILL
  // =========================
  const atBottom = COMMENTS_CONTAINER.scrollHeight - COMMENTS_CONTAINER.scrollTop === COMMENTS_CONTAINER.clientHeight;
  if(atBottom){
    COMMENTS_CONTAINER.scrollTop = COMMENTS_CONTAINER.scrollHeight;
  } else {
    if(NEW_PILL) NEW_PILL.classList.remove('hidden');
  }

  return bubble;
};

TGRenderer.showTyping = function(persona){
  // Optional: implement a small typing indicator if needed
};

TGRenderer.removeBubble = function(id){
  const bubble = MESSAGE_MAP.get(id);
  if(bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
  MESSAGE_MAP.delete(id);
};

// Auto-scroll jump-to-new indicator
if(NEW_PILL){
  NEW_PILL.addEventListener('click', ()=>{
    COMMENTS_CONTAINER.scrollTop = COMMENTS_CONTAINER.scrollHeight;
    NEW_PILL.classList.add('hidden');
  });
}

console.log("bubble-renderer.js initialized — ready to render chat bubbles.");

})();
