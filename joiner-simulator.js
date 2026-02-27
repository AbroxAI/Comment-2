// joiner-simulator.js — Synthetic New Member Simulator
// ====================================================
// Simulates new members joining, with welcome messages and join stickers.
// Integrates with BubbleRenderer and Identity Personas.

(function(){

const MIN_INTERVAL = (window.JOINER_CONFIG?.minIntervalMs) || 1000 * 60 * 60 * 6;
const MAX_INTERVAL = (window.JOINER_CONFIG?.maxIntervalMs) || 1000 * 60 * 60 * 24;
const INITIAL_JOINS = (window.JOINER_CONFIG?.initialJoins) || 3;
const WELCOME_MESSAGE = window.JOINER_CONFIG?.welcomeMessage || "Welcome! Please use Contact Admin to verify.";

const COMMENTS_CONTAINER = document.getElementById('tg-comments-container');

function randomInterval(){
  return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
}

// Generate a new joiner persona
function generateJoiner(){
  if(window.identity?.getRandomPersona){
    return window.identity.getRandomPersona();
  }
  return { name:"Guest", avatar:"https://ui-avatars.com/api/?name=G" };
}

// Emit a joiner event
function emitJoiner(joiner){
  const event = new CustomEvent("joiner:new",{detail:joiner});
  window.dispatchEvent(event);
}

// Display joiner message bubble
function postJoiner(joiner){
  if(!COMMENTS_CONTAINER) return;

  const bubble = window.TGRenderer?.appendMessage?.(joiner, WELCOME_MESSAGE, { type:"incoming", timestamp:new Date() });
  if(bubble) bubble.classList.add("tg-join-sticker");

  // Trigger joiner-reactive realism engine
  emitJoiner(joiner);
}

// Initial burst joins
for(let i=0;i<INITIAL_JOINS;i++){
  setTimeout(()=>{
    const joiner = generateJoiner();
    postJoiner(joiner);
  }, i*400);
}

// Recurring random joiners
function scheduleJoiner(){
  setTimeout(()=>{
    const joiner = generateJoiner();
    postJoiner(joiner);
    scheduleJoiner();
  }, randomInterval());
}

// Start simulation
scheduleJoiner();

console.log("joiner-simulator.js initialized — new members will join periodically.");

})();
