

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


  ];

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
    drawOnce(); // uppdatera bakgrund direkt
    positionStarButtons();
  }

  function positionStarButtons() {
    projects.forEach(p => {
      const el = document.querySelector(`[data-star="${p.id}"]`);
      if (!el) return;
      el.style.left = (p.x * 100) + '%';
      el.style.top  = (p.y * 100) + '%';
      const px = 8 + (p.size || 1) * 6; // 8–16px
      el.style.setProperty('--size', px + 'px');
      el.style.setProperty('--glow', (0.6 + (p.size-1)*0.8).toFixed(2));
    });
  }

  // ==== 4) Rita stjärnhimmel + konstellationer (canvas) ====
  function drawOnce(t=0) {
    ctx.clearRect(0,0,w,h);

    // Mjuk drift baserat på mus (parallaxkänsla, väldigt subtilt)
    const driftX = 0;
    const driftY = 0;

/*     // Stjärn bakgrund – sparsamt
    ctx.save();
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < Math.min(160, Math.round((w*h)/9000)); i++) {
      const x = (i * 73 % w) + driftX * 0.3;
      const y = (i * 131 % h) + driftY * 0.25;
      const r = (i % 3 === 0 ? 1.1 : 0.6);
      ctx.fillStyle = i % 7 === 0 ? 'rgba(183,240,255,0.8)' : 'rgba(255,255,255,0.8)';
      ctx.beginPath();
      ctx.arc((x+w)%w, (y+h)%h, r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.restore(); */

    // Konstellationslinjer per grupp
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(183,240,255,0.35)';
    ctx.shadowColor = 'rgba(183,240,255,0.35)';
    ctx.shadowBlur = 6;

    Object.values(groups).forEach(list => {
      if (list.length < 2) return;
      // sortera för stabil linjedragning (x+y)
      const ordered = [...list].sort((a,b)=> (a.x+a.y) - (b.x+b.y));
      ctx.beginPath();
      ordered.forEach((p, i) => {
        const x = p.x * w + driftX * 0.4;
        const y = p.y * h + driftY * 0.35;
        if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
    });
    ctx.restore();
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

      btn.addEventListener('mouseenter', e => showTooltip(p, e.currentTarget));
      btn.addEventListener('mouseleave', hideTooltip);
      btn.addEventListener('focus', e => showTooltip(p, e.currentTarget));
      btn.addEventListener('blur', hideTooltip);
      btn.addEventListener('click', () => openModal(p));

      frag.appendChild(btn);
    });
    starsLayer.appendChild(frag);
  }

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
    // lås scroll i bakgrunden
    document.documentElement.classList.add('nav-open-modal');
    // fokus-hantering
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
    loop();

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
