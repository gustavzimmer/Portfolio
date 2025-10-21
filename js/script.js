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
    }
    const projektBtn = document.getElementById('projektBtn');
    if(window.location.pathname.includes("projekt")) {
      projektBtn.classList.toggle("activePage");
    }
    const kontaktBtn = document.getElementById('kontaktBtn');
    if(window.location.pathname.includes("kontakt")) {
      kontaktBtn.classList.toggle("activePage");
    }
})