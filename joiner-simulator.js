// joiner-simulator.js — Realistic Joiner Engine
// ============================================
// Simulates new members joining with bursts, welcome messages, and join stickers.
// Works with BubbleRenderer and identity-personas.

(function(){
  const MIN_INTERVAL = (window.JOINER_CONFIG?.minIntervalMs) || 1000*60*60*6;
  const MAX_INTERVAL = (window.JOINER_CONFIG?.maxIntervalMs) || 1000*60*60*24;
  const INITIAL_JOINS = window.JOINER_CONFIG?.initialJoins || 3;
  const WELCOME_MESSAGE = window.JOINER_CONFIG?.welcomeMessage || "Welcome! Please use Contact Admin to verify.";

  const SyntheticPool = window.identity?.SyntheticPool || [];
  const Admin = window.identity?.Admin;

  const tgContainer = document.getElementById("tg-comments-container");
  const tgMetaLine = document.getElementById("tg-meta-line");

  // Track members
  let memberCount = window.MEMBER_COUNT || 0;
  let onlineCount = window.ONLINE_COUNT || 0;

  function incrementMetaLine(count=1){
    memberCount += count;
    if(tgMetaLine) tgMetaLine.textContent = `${memberCount.toLocaleString()} members, ${onlineCount.toLocaleString()} online`;
  }

  function createJoinSticker(joiners){
    const sticker = document.createElement("div");
    sticker.className = "tg-join-sticker";

    const cluster = document.createElement("div");
    cluster.className = "join-cluster";

    joiners.forEach((p,i)=>{
      const av = document.createElement("img");
      av.className = "join-avatar";
      av.src = p.avatar;
      av.title = p.name;
      av.style.zIndex = 50-i;
      cluster.appendChild(av);
    });

    if(joiners.length>5){
      const more = document.createElement("div");
      more.className = "join-more";
      more.textContent = "+" + (joiners.length-5);
      cluster.appendChild(more);
    }

    sticker.appendChild(cluster);

    const text = document.createElement("div");
    text.textContent = joiners.map(j=>j.name).join(", ") + " joined the chat";
    sticker.appendChild(text);

    tgContainer.appendChild(sticker);
    tgContainer.scrollTop = tgContainer.scrollHeight;
  }

  function sendWelcomeMessage(persona){
    const bubble = document.createElement("div");
    bubble.className = "tg-bubble incoming";

    const avatar = document.createElement("img");
    avatar.className = "tg-bubble-avatar";
    avatar.src = Admin.avatar;
    bubble.appendChild(avatar);

    const content = document.createElement("div");
    content.className = "tg-bubble-content glass-btn";
    content.textContent = `${WELCOME_MESSAGE} — ${persona.name}`;
    bubble.appendChild(content);

    tgContainer.appendChild(bubble);
    tgContainer.scrollTop = tgContainer.scrollHeight;
  }

  function simulateJoin(){
    if(!SyntheticPool.length) return;
    const batchSize = Math.floor(Math.random()*3)+1;
    const joiners = [];
    for(let i=0;i<batchSize;i++){
      const p = SyntheticPool[Math.floor(Math.random()*SyntheticPool.length)];
      joiners.push(p);
    }

    createJoinSticker(joiners);
    joiners.forEach(p=>sendWelcomeMessage(p));
    incrementMetaLine(joiners.length);

    scheduleNextJoin();
  }

  function scheduleNextJoin(){
    const delay = MIN_INTERVAL + Math.random()*(MAX_INTERVAL-MIN_INTERVAL);
    setTimeout(simulateJoin, delay);
  }

  // Initial joins
  for(let i=0;i<INITIAL_JOINS;i++){
    setTimeout(simulateJoin, i*500);
  }

  // Start continuous joins
  scheduleNextJoin();

  console.log("joiner-simulator initialized — min/max interval:",MIN_INTERVAL,"/",MAX_INTERVAL);
})();
