document.documentElement.classList.add('preloading');

  window.addEventListener('load', () => {
    const root = document.documentElement;

    root.classList.remove('preloading');
    root.classList.add('loaded');

  });

document.addEventListener('DOMContentLoaded', () => {

    const root = document.documentElement;
    const btn = document.getElementById('menyBtn');
    const navPanel = document.getElementById('navPanel');

    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const nextState = !isOpen;
        btn.setAttribute('aria-expanded', String(nextState));
        root.classList.toggle('nav-open', nextState);
        if (navPanel) {
          navPanel.toggleAttribute('data-open', nextState);
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && root.classList.contains('nav-open')) {
          root.classList.remove('nav-open');
          btn.setAttribute('aria-expanded', 'false');
          if (navPanel) {
            navPanel.removeAttribute('data-open');
          }
        }
      });
    }

    const navLinks = Array.from(document.querySelectorAll('.nav__list a'));
    const normalisePath = (value = '') => value.replace(/\/+$/, '');
    const findNavLink = (slug) => {
      const target = `/${slug}`;
      return navLinks.find((anchor) => normalisePath(anchor.pathname).endsWith(target));
    };

    const onOmMigPage = window.location.pathname.includes("om-mig");
    const omLink = findNavLink('om-mig');
    if(onOmMigPage && omLink) {
      omLink.classList.add('activePage');
      const omMigParEl = document.querySelector('.omMigSpcWordP');
      if (omMigParEl) {
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
        });
      }
    }
    if(window.location.pathname.includes("projekt")) {
      const projektLink = findNavLink('projekt');
      if (projektLink) {
        projektLink.classList.add("activePage");
      }
      document.documentElement.classList.add("projektPage");
    }
    if(window.location.pathname.includes("kontakt")) {
      const kontaktLink = findNavLink('kontakt');
      if(kontaktLink) {
        kontaktLink.classList.add("activePage");
      }
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
