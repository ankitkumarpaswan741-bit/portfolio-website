// ============================================================
//  ANKIT KUMAR PASWAN — PORTFOLIO JAVASCRIPT
//  File: script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Navbar scroll effect ──────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ── 2. Hamburger / Mobile Menu ───────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });


  // ── 3. Smooth active link highlight on scroll ────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);


  // ── 4. Scroll Reveal ────────────────────────────────────────
  // Add .reveal class to elements we want to animate in
  const revealTargets = [
    '.skill-card',
    '.project-card',
    '.edu-item',
    '.cert-card',
    '.stat-card',
    '.about-text',
    '.hero-content',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });


  // ── 5. Typing effect in hero ─────────────────────────────────
  const roles = [
    'AI/ML Enthusiast',
    'MERN Stack Developer',
    'Problem Solver',
    'Open Source Contributor',
  ];

  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    let roleIndex   = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    let isPausing   = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isPausing) return;

      if (!isDeleting) {
        // Typing
        heroSub.textContent = currentRole.substring(0, charIndex + 1) +
          ' — building smart solutions from Jharkhand, India.';
        charIndex++;

        if (charIndex === currentRole.length) {
          isPausing = true;
          setTimeout(() => {
            isPausing  = false;
            isDeleting = true;
          }, 2000);
        }
      } else {
        // Deleting
        heroSub.textContent = currentRole.substring(0, charIndex - 1) +
          ' — building smart solutions from Jharkhand, India.';
        charIndex--;

        if (charIndex === 0) {
          isDeleting  = false;
          roleIndex   = (roleIndex + 1) % roles.length;
        }
      }

      const speed = isDeleting ? 50 : 90;
      setTimeout(typeEffect, speed);
    }

    // Start typing after short delay
    setTimeout(typeEffect, 1000);
  }


  // ── 6. Stats counter animation ───────────────────────────────
  function animateCounter(el, target, duration = 1200) {
    let start     = 0;
    const isPlus  = String(target).includes('+');
    const num     = parseInt(target);
    const step    = num / (duration / 16);

    const tick = () => {
      start += step;
      if (start >= num) {
        el.textContent = isPlus ? `${num}+` : num;
        return;
      }
      el.textContent = isPlus
        ? `${Math.floor(start)}+`
        : Math.floor(start);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = el.textContent.trim();
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNums.forEach(el => counterObserver.observe(el));


  // ── 7. Skill card tilt on hover ──────────────────────────────
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -5;
      const rotateY = ((x - cx) / cx) *  5;

      card.style.transform =
        `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ── 8. Cursor glow (desktop only) ───────────────────────────
  if (window.innerWidth > 900) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top  = `${e.clientY}px`;
    });
  }

});