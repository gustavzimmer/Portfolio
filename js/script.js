document.documentElement.classList.add('preloading');

  window.addEventListener('load', () => {
    const root = document.documentElement;

    root.classList.remove('preloading');
    root.classList.add('loaded');

  });

document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('menyBtn');
    const root = document.documentElement;
  
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        root.classList.toggle('nav-open');
    });


    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && root.classList.contains('nav-open')) {
        root.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    const omBtn = document.getElementById('om-mig-btn');
    if(window.location.pathname.includes("om-mig")) {
      omBtn.classList.toggle("activePage");
      
      const omMigParEl = document.querySelector('.omMigSpcWordP');
      const omMigWordArr = omMigParEl.textContent.split(' ');
      omMigParEl.textContent = '';
      omMigWordArr.forEach((word) => {
        const span = document.createElement('span');
        span.classList.add('om-mig-spcWord');
  
        if(word === '·') {
          span.classList.add('dot-word');
        }
        
        span.textContent = word + ' ';
        omMigParEl.appendChild(span);
      })
    }
    const projektBtn = document.getElementById('projektBtn');
    const projektMoonEl = document.querySelector('.moon-wrapper');
    if(window.location.pathname.includes("projekt")) {
      projektBtn.classList.toggle("activePage");
      document.documentElement.classList.add("projektPage");
    }
    const kontaktBtn = document.getElementById('kontaktBtn');
    if(window.location.pathname.includes("kontakt")) {
      kontaktBtn.classList.toggle("activePage");
    }

    /* Squeeze hover effect */
    const textHoverEl = document.querySelectorAll('.text-hover-effekt');

    textHoverEl.forEach(el => {

      const text = el.textContent;
      el.textContent = '';

      const textArr = text.split('');

      const total = textArr.length;
      const duration = 200;

      const step = total > 1 ? duration / (total - 1) : 0;

      textArr.forEach((char, i) => {
        const span = document.createElement('span');

        if(char === ' ') {
          char = '\u00A0';
        }
        span.textContent = char
        span.classList.add('char-span');

        /* Set animation delay */
        span.style.animationDelay = `${step * i}ms`;

        el.appendChild(span);
      });

    });

    /* Swap hover effect for plain text */
    const navHoverEl = document.querySelectorAll('.nav-hover-effekt');

    navHoverEl.forEach(el => {

      const text = el.textContent;
      el.textContent = '';

      const textArr = text.split('');

      const total = textArr.length;
      const duration = 100;

      const step = total > 1 ? duration / (total - 1) : 0;

      textArr.forEach((char, i) => {
        const c = char === ' ' ? '\u00A0' : char;

        const cell = document.createElement('span');
        cell.classList.add("char")

        const layerTop = document.createElement('span');
        layerTop.className = "layer top"
        layerTop.textContent = c;

        const layerBottom = document.createElement('span');
        layerBottom.className = "layer bot"
        layerBottom.textContent = c;

        /* Set animation delay */
        layerTop.style.transitionDelay = `${step * i}ms`;
        layerBottom.style.transitionDelay = `${step * i}ms`;

        cell.appendChild(layerTop);
        cell.appendChild(layerBottom);
        el.appendChild(cell);
      });

    });

    /* swap hover effect for texts with svg */
    const iconHoverEl = document.querySelectorAll('.icon-hover-effekt');

    iconHoverEl.forEach(el => {

      const child = el.querySelector('span');
      child.classList.add("char")

      const svgEl = child.querySelector('svg');
      const svgClone = svgEl.cloneNode(true);

      svgEl.classList.add("layer", "top");
      svgClone.classList.add("layer", "bot");
      child.appendChild(svgClone);

      el.removeChild(child);

      const text = el.textContent.trim();
      el.textContent = '';

      const textArr = text.split('');

      const total = textArr.length;
      const duration = 100;

      const step = total > 1 ? duration / (total - 1) : 0;

      textArr.forEach((char, i) => {
        const c = char === ' ' ? '\u00A0' : char;

        const cell = document.createElement('span');
        cell.classList.add("char")

        const layerTop = document.createElement('span');
        layerTop.className = "layer top"
        layerTop.textContent = c;

        const layerBottom = document.createElement('span');
        layerBottom.className = "layer bot"
        layerBottom.textContent = c;

        /* Set animation delay */
        layerTop.style.transitionDelay = `${step * i}ms`;
        layerBottom.style.transitionDelay = `${step * i}ms`;

        cell.appendChild(layerTop);
        cell.appendChild(layerBottom);
        el.appendChild(cell);
      });
      el.insertBefore(child, el.firstChild);

    });

    
})