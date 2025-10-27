

(() => {
  if(!window.location.pathname.includes("projekt")) return;

  const projects = [
    {
      id: 'flapocalypse',
      title: 'Flapocalypse',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/flapocalypse',
      size: 1.0,
      group: 'frontend', 
    },
    {
      id: 'themovie-database',
      title: 'The Movie Database',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/orion',
      size: 1.0,
      group: 'frontend', 
    },
    {
      id: 'foodchart',
      title: 'Foodchart',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/orion',
      size: 1.0,
      group: 'frontend', 
    },
    {
      id: 'AstroDash',
      title: 'AstroDash',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/orion',
      size: 1.0,
      group: 'frontend', 
    },
    {
      id: 'assist-me',
      title: 'Assist Me',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/orion',
      size: 1.0,
      group: 'backend', 
    },
    {
      id: 'bookworm',
      title: 'Bookworm',
      subtitle: 'Spel / Socket.IO + Prisma',
      url: 'https://example.com/orion',
      size: 1.0,
      group: 'backend', 
    },
  ];


let animStart = null;
let animDuration = 3000;
let animRunning = false;
let animHasPlayed = false
let paths = [];

// === konstanter för intro ===
const RESPECT_RM = true;
const STAR_RANDOMIZE = true;
const STAR_STAGGER_MS = 500;


function shuffle(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }

function buildConstellationPaths() {
  paths = [];
  Object.values(groups).forEach(list => {
    if (!list || list.length < 2) return;

    // ordna så dragningen blir stabil
    const ordered = [...list].sort((a,b)=> (a.x+a.y) - (b.x+b.y));

    // pixelkoordinater 
    const pts = ordered.map(p => ({ x: p.x * w, y: p.y * h }));

    // bygg segment + längder
    const segments = [];
    let totalLen = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i+1];
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      segments.push({ a, b, len });
      totalLen += len;
    }
    paths.push({ segments, totalLen });
  });
}

function drawConstellationsAnimated(progress) {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(183,240,255,0.35)';
  ctx.shadowColor = 'rgba(183,240,255,0.35)';
  ctx.shadowBlur = 6;

  for (const path of paths) {
    const { segments, totalLen } = path;
    let target = totalLen * progress;
    ctx.beginPath();

    for (const seg of segments) {
      if (target <= 0) break;
      const { a, b, len } = seg;

      if (target >= len) {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        target -= len;
      } else {
        const t = target / len;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        break;
      }
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawConstellationsFull() {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(183,240,255,0.35)';
  ctx.shadowColor = 'rgba(183,240,255,0.35)';
  ctx.shadowBlur = 6;

  for (const path of paths) {
    ctx.beginPath();
    for (const seg of path.segments) {
      ctx.moveTo(seg.a.x, seg.a.y);
      ctx.lineTo(seg.b.x, seg.b.y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function revealStarsSequential(onDone){
  const prefersReduce = RESPECT_RM && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const stars = Array.from(document.querySelectorAll('.star'));
  if (STAR_RANDOMIZE) shuffle(stars);

  // Om reduce-motion: visa direkt
  if (prefersReduce){
    stars.forEach(el => el.dataset.visible = 'true');
    onDone?.();
    return;
  }

  let i = 0;
  function step(){
    if (i < stars.length){
      stars[i].dataset.visible = 'true';
      i++;
      setTimeout(step, STAR_STAGGER_MS);
    } else {
      onDone?.();
    }
  }
  step();
}

  // ==== 2) Element & state ====
  const section = document.getElementById('projects-sky');
  const canvas = document.getElementById('sky-canvas');
  const starsLayer = document.getElementById('stars-layer');
  const tooltip = document.getElementById('star-tooltip');
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalLink = document.getElementById('modal-link');

  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, dpr = Math.max(1, window.devicePixelRatio || 1);
  let mouse = { x: 0.5, y: 0.5 };
  let rafId = null;

  // Konstellationer: grupper → linjer mellan ordnade stjärnor
  const groups = {};
  projects.forEach(p => { if (!groups[p.group]) groups[p.group] = []; groups[p.group].push(p); });

  // ==== 3) Hjälpare ====
  // Stabil position baserat på titel (seeded)
  function seededRandom(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    // två olika floats
    const a = ((h >>> 0) % 10000) / 10000;
    const b = (((h * 48271) >>> 0) % 10000) / 10000;
    return [a, b];
  }

  function placeProjects() {
    projects.forEach(p => {
      if (typeof p.x !== 'number' || typeof p.y !== 'number') {
        const [rx, ry] = seededRandom(p.title);
        // undvik kanter (10% padding)
        p.x = 0.1 + rx * 0.8;
        p.y = 0.12 + ry * 0.75;
      }
    });
  }

  function resize() {
    const rect = section.getBoundingClientRect();
    w = Math.floor(rect.width);
    h = Math.floor(starsLayer.getBoundingClientRect().height);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
    buildConstellationPaths();
    positionStarButtons();
  
    // RITA ENDAST FULLA LINJER EFTER FÖRSTA ANIM
    if (animHasPlayed) {
      animRunning = false;
    } else {
      animRunning = false;
    }
  
    drawOnce();
  }
  
  

  function positionStarButtons() {
    projects.forEach(p => {
      const el = document.querySelector(`[data-star="${p.id}"]`);
      if (!el) return;
      el.style.left = (p.x * 100) + '%';
      el.style.top  = (p.y * 100) + '%';
      const px = 8 + (p.size || 1) * 6;
      el.style.setProperty('--size', px + 'px');
      el.style.setProperty('--glow', (0.6 + (p.size-1)*0.8).toFixed(2));
    });
  }

  function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }

  // ==== 4) Rita stjärnhimmel ====
  function drawOnce(timestamp = performance.now()){
    ctx.clearRect(0,0,w,h);
  
    // linjer
    if (animRunning) {
      if (animStart == null) animStart = timestamp;
      const raw = Math.min(1, (timestamp - animStart) / animDuration);
      const p = easeOutCubic(raw);
      drawConstellationsAnimated(p);
      if (raw >= 1) {
        animRunning = false;
        animHasPlayed = true;
      }
    } else if (animHasPlayed) {

      if (paths.length) drawConstellationsFull();
    }


  }

  function loop(t) {
    drawOnce(t);
    rafId = requestAnimationFrame(loop);
  }

  // ==== 5) Interaktiva stjärnor (knappar) ====
  function buildStars() {
    const frag = document.createDocumentFragment();
    projects.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'star';
      btn.setAttribute('role', 'listitem');
      btn.setAttribute('aria-label', `${p.title} – öppna`);
      btn.dataset.star = p.id;

      btn.addEventListener('mouseenter', e => {
        showTooltip(p, e.currentTarget);
        stopAutoTips();
      });
      btn.addEventListener('mouseleave', () => {
        hideTooltip();
        startAutoTips();
      });
      btn.addEventListener('focus', e => showTooltip(p, e.currentTarget));
      btn.addEventListener('blur', hideTooltip);
      btn.addEventListener('click', () => openModal(p));

      frag.appendChild(btn);
    });
    starsLayer.appendChild(frag);
  }

  function startSkyIntro(){

    revealStarsSequential(() => {

      if (!animHasPlayed){
        animRunning = true;
        animStart = null;
      }
    });
  }



const AUTO_TIPS_ENABLED = true;
const AUTO_TIP_INTERVAL_MS = 6000;
const AUTO_TIP_SHOW_MS = 4000;
const AUTO_TIP_PAUSE_AFTER_INTERACT = 3000;
const AUTO_TIP_START_DELAY_MS = 2000;

let autoTipTimer = null;
let autoTipHideTimer = null;
let autoTipIndex = 0;
let autoTipOrder = [];
let lastUserInteraction = 0;

function buildAutoTipOrder() {
  autoTipOrder = projects.map(p => p.id);
  for (let i = autoTipOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [autoTipOrder[i], autoTipOrder[j]] = [autoTipOrder[j], autoTipOrder[i]];
  }
  autoTipIndex = 0;
}

function nextAutoTipId() {
  if (autoTipOrder.length === 0) buildAutoTipOrder();
  const id = autoTipOrder[autoTipIndex % autoTipOrder.length];
  autoTipIndex++;
  return id;
}

function startAutoTips() {
  if (!AUTO_TIPS_ENABLED) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  stopAutoTips();
  autoTipTimer = setInterval(() => {

    const modalOpen = typeof modal !== 'undefined' && !modal.hidden;
    if (Date.now() - lastUserInteraction < AUTO_TIP_PAUSE_AFTER_INTERACT || modalOpen) return;

    const id = nextAutoTipId();
    const p = projects.find(x => x.id === id);
    const el = document.querySelector(`[data-star="${id}"]`);
    if (!p || !el) return;

    showTooltip(p, el);

    clearTimeout(autoTipHideTimer);
    autoTipHideTimer = setTimeout(() => {
      
      hideTooltip();
    }, AUTO_TIP_SHOW_MS);
  }, AUTO_TIP_INTERVAL_MS);
}

function stopAutoTips() {
  clearInterval(autoTipTimer);
  autoTipTimer = null;
  clearTimeout(autoTipHideTimer);
  autoTipHideTimer = null;
}

function markInteractionAndPause() {
  lastUserInteraction = Date.now();
}

['pointerdown','touchstart','keydown','focusin'].forEach(evt => {
  window.addEventListener(evt, markInteractionAndPause, { passive: true });
});

window.addEventListener('resize', () => {
  hideTooltip();
  stopAutoTips();
  setTimeout(() => {
    startAutoTips();
  }, 1000)
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopAutoTips();
  else startAutoTips();
});

  function showTooltip(project, el) {
    const rect = el.getBoundingClientRect();
    const host = starsLayer.getBoundingClientRect();
  
    tooltip.innerHTML = `<strong>${project.title}</strong><div class="meta">${project.subtitle || ''}</div>`;
    tooltip.dataset.show = 'true';
  
    const tooltipRect = tooltip.getBoundingClientRect();
    const halfW = tooltipRect.width / 2;
    const halfH = tooltipRect.height / 2;
  
    let left = rect.left - host.left + rect.width / 2;
    let top = rect.top - host.top;
  
    const minX = halfW + 8;
    const maxX = host.width - halfW - 8;
    if (left < minX) left = minX;
    if (left > maxX) left = maxX;
  
    const tooltipHeight = tooltipRect.height;
    const margin = 10;
    const wouldOverflowTop = rect.top - tooltipHeight - margin < 0;
    if (wouldOverflowTop) {
      tooltip.style.transform = 'translate(-50%, calc(100% + 8px))';
    } else {
      tooltip.style.transform = 'translate(-50%, calc(-100% - 8px))';
    }
  
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  
    projects.forEach(p => {
      document
        .querySelector(`[data-star="${p.id}"]`)
        ?.setAttribute('data-active', String(p.id === project.id));
    });
  }
  function hideTooltip() {
    tooltip.dataset.show = 'false';
    projects.forEach(p => {
      document.querySelector(`[data-star="${p.id}"]`)?.setAttribute('data-active', 'false');
    });
  }

  // ==== 6) Modal ====
  function openModal(p) {
    modalTitle.textContent = p.title;
    modalSubtitle.textContent = p.subtitle || '';
    modalBody.innerHTML = p.description || '';
    modalLink.href = p.url || '#';
    modal.hidden = false;

    document.documentElement.classList.add('nav-open-modal');

    modal.querySelector('.modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true;
    document.documentElement.classList.remove('nav-open-modal');
  }
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
  });

  // ==== 7) Init ====
  function init() {
    placeProjects();
    buildStars();
    resize();
    buildConstellationPaths();
    startSkyIntro();
    loop();
    setTimeout(() => {
      startAutoTips();
    }, AUTO_TIP_START_DELAY_MS || 2000);

    starsLayer.addEventListener('pointermove', (e) => {
      const r = starsLayer.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && rafId) cancelAnimationFrame(rafId);
      else if (!document.hidden && !rafId) rafId = requestAnimationFrame(loop);
    });
  }

  // starta när DOM finns
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
