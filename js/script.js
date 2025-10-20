document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menyBtn');
  
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        document.documentElement.classList.toggle('nav-open');
    });


    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && document.documentElement.classList.contains('nav-open')) {
        document.documentElement.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
})