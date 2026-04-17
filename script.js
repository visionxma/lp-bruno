// ======================================================
// ROTA MILIONÁRIA — JS
// ======================================================

// 1) Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 2) Countdown até sábado às 13:00 (horário de Brasília = UTC-3)
// Ajusta para o próximo sábado 13:00 automaticamente se já passou.
(function countdown() {
  const el = {
    d: document.getElementById('cd-d'),
    h: document.getElementById('cd-h'),
    m: document.getElementById('cd-m'),
    s: document.getElementById('cd-s'),
  };
  if (!el.d) return;

  // Calcula próximo sábado às 13:00 em Brasília (UTC-3)
  function nextTarget() {
    const now = new Date();
    // converte "agora" para hora de Brasília
    const brNow = new Date(now.getTime() + (now.getTimezoneOffset() + (-180)) * 60000);
    const target = new Date(brNow);
    const day = brNow.getDay(); // 0 dom ... 6 sáb
    let daysUntilSat = (6 - day + 7) % 7;
    if (daysUntilSat === 0 && brNow.getHours() >= 13) daysUntilSat = 7;
    target.setDate(brNow.getDate() + daysUntilSat);
    target.setHours(13, 0, 0, 0);
    // converte de volta para o fuso local
    const localTarget = new Date(target.getTime() - (now.getTimezoneOffset() + (-180)) * 60000);
    return localTarget;
  }

  const target = nextTarget();

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

// 3) Reveal on scroll (suave)
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
