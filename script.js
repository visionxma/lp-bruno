// ======================================================
// ROTA MILIONÁRIA — JS
// ======================================================

// 1) Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 2) Countdown até 27/04/2026 às 20:15 (horário de Brasília = UTC-3)
(function countdown() {
  const el = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s'),
  };
  if (!el.d) return;

  // 27/04/2026 às 20:15 em Brasília (UTC-3) = 23:15 UTC
  const target = new Date('2026-04-27T23:15:00Z');

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function tick() {
    const diff = target - new Date();
    if (diff <= 0) {
      el.d.textContent = '00';
      el.h.textContent = '00';
      el.m.textContent = '00';
      el.s.textContent = '00';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    el.d.textContent = pad(days);
    el.h.textContent = pad(hours);
    el.m.textContent = pad(mins);
    el.s.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();

// 3) Floating CTA — só aparece depois que a hero sair da viewport
(function floatingCtaVisibility() {
  const cta = document.querySelector('.floating-cta');
  const hero = document.querySelector('.hero');
  if (!cta || !hero || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(([entry]) => {
    cta.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });

  io.observe(hero);
})();

// 4) Reveal on scroll (suave)
(function revealOnScroll() {
  const items = document.querySelectorAll('.about-photo, .about-copy, .final-card');
  if (!('IntersectionObserver' in window)) return;

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();
