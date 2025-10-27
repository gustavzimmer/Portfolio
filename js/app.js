document.addEventListener("DOMContentLoaded", function(event){

    console.log("DOM loaded");
   
    //wait until images, links, fonts, stylesheets, and js is loaded
    window.addEventListener("load", function(e){

      // Om mig section animation
      if(window.location.pathname.includes("om-mig")) {
        gsap.set('.omMigSection', { opacity: 0, scale: 0.95, rotateX: 10 });
        gsap.set('.omMigHeader', { opacity: 0, y: 20, scale: 0.8 });
        gsap.set('.omMigText p, .om-mig-spcWord', { opacity: 0, y: 15, rotate: -5 });
        
      
        const tl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });
      
        tl.to('.omMigSection', { opacity: 1, scale: 1, rotateX: 0, duration: 0.6 })
          .to('.omMigHeader', { opacity: 1, y: 0, scale: 1, duration: 0.5 }, '-=0.3')
          .to('.omMigText p', {
            opacity: 1, y: 0, rotate: 0, duration: 0.4, stagger: 0.15
          }, '-=0.2')
          .to('.om-mig-spcWord', {
            opacity: 1, y: 0, rotate: 0, duration: 0.3, stagger: 0.08
          }, '-=0.1');

          return;
      }

      // Kontakt Sektion aniamtion 
      if(window.location.pathname.includes("kontakt")) {
        console.log("Kontakt page loaded - starting animation");
        const section = document.querySelector('main.contain > section') 
               || document.querySelector('.contain > section') 
               || document.querySelector('main.contain section');

        const title = document.querySelector('.subPageTitle');
        const linksHdr = document.querySelector('.kontaktLinksHeader');
        const links = gsap.utils.toArray('.kontaktLinks a');

        if (!section || !title) {
          console.warn('[GSAP] Hittade inte section eller title', { section, title });
          return;
        }

        // Splitta rubriken radvis (tål olika <br>-varianter)
        const parts = title.innerHTML.split(/<br\s*\/?>/i);
        title.innerHTML = parts.map(line => `
          <span class="title-line" style="display:block; overflow:hidden">
            <span class="title-line-inner">${line.trim()}</span>
          </span>
        `).join('');

        // Pre-state
        gsap.set(section, { opacity: 0, y: 12 });
        gsap.set('.title-line-inner', { yPercent: 120, opacity: 0 });
        if (linksHdr) gsap.set(linksHdr, { opacity: 0, y: 8 });
        gsap.set(links, { opacity: 0, x: 12 });

        // Starta länkarna med gradienten utanför (för sweepen)
        links.forEach(a => a.style.backgroundPosition = '200% 0');

        // Timeline
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.to(section, { opacity: 1, y: 0, duration: 0.45 })
          .to('.title-line-inner', { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.1');

        if (linksHdr) tl.to(linksHdr, { opacity: 1, y: 0, duration: 0.45 }, '-=0.2');

        tl.to(links, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, '-=0.25')
          .to(links, { backgroundPosition: '0% 0', duration: 0.5, stagger: 0.08 }, '<')
          .to(links, { backgroundPosition: 'right 0', duration: 0.5, stagger: 0.08 }, '>-0.25');


          gsap.utils.toArray('.kontaktLinks a').forEach(link => {
            const strength = 20;
            const qx = gsap.quickTo(link, 'x', { duration: 0.3 });
            const qy = gsap.quickTo(link, 'y', { duration: 0.3 });
            const qr = gsap.quickTo(link, 'rotation', { duration: 0.3 });
          
            link.addEventListener('mousemove', e => {
              const rect = link.getBoundingClientRect();
              const dx = e.clientX - (rect.left + rect.width / 2);
              const dy = e.clientY - (rect.top + rect.height / 2);
              qx((dx / rect.width) * strength);
              qy((dy / rect.height) * strength);
              qr((dx / rect.width) * 5);
            });
          
            link.addEventListener('mouseleave', () => {
              qx(0); qy(0); qr(0);
            });
          });

          return;
      }

      if(window.location.pathname.includes("projekt")) return;

      const h1 = document.querySelector('.frontpage-title h1');
      const h2 = document.querySelector('.frontpage-title h2');
      if (!h1 || !h2) return;
    
      const H1_TEXT = 'Gustav Zimmer';
      const H2_TEXT = 'Frontend Developer';
    
      const origH1 = h1.textContent;
      const origH2 = h2.textContent;
    
      h1.textContent = '';
      h2.textContent = '';
    
      // Scramble-sekvens (ingen cursor, ingen y/x-animation)
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
    
      tl.to(h1, {
        duration: 1.4,
        scrambleText: {
          text: H1_TEXT,
          chars: 'upperAndLowerCase',
          speed: 0.7,
          tweenLength: true
        }
      })
      .to(h2, {
        duration: 1.4,
        scrambleText: {
          text: H2_TEXT,
          chars: 'upperAndLowerCase',
          speed: 0.7,
          tweenLength: true
        }
      }, '>-0.15');

      const MoonEl = document.querySelector('.moon-wrapper');
      if (!MoonEl) return;
    
      // Scale-in på load
      gsap.set(MoonEl, { scale: 0.2, transformOrigin: '50% 50%' });
      gsap.to(MoonEl, { scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.05 });
    
      // Draggable
      gsap.registerPlugin(Draggable);
      Draggable.create(MoonEl, {
        bounds: window,
        inertia: true,
      });


     }, false);
   
   });