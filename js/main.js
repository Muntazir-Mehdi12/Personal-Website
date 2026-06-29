const nav = document.getElementById("nav");
window.addEventListener("scroll", () => { nav.classList.toggle("scrolled", window.scrollY > 40); });
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => { navLinks.classList.toggle("open"); });
navLinks.querySelectorAll("a").forEach((link) => { link.addEventListener("click", () => navLinks.classList.remove("open")); });
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
revealElements.forEach((el) => revealObserver.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
// Floating particle field
(function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];
  let mouse = { x: 0, y: 0, active: false };
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = prefersReduced ? 25 : window.innerWidth < 768 ? 45 : 70;
  const connectionDist = 120;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createParticles() {
    particles = Array.from({ length: count }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-0.35, 0.35),
      vy: rand(-0.35, 0.35),
      r: rand(1, 2.8),
      gold: Math.random() > 0.35,
      alpha: rand(0.25, 0.85),
      parallax: rand(0.02, 0.06),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (mouse.active && !prefersReduced) {
        p.x += (mouse.x - width / 2) * p.parallax * 0.002;
        p.y += (mouse.y - height / 2) * p.parallax * 0.002;
      }

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < connectionDist) {
          const lineAlpha = (1 - dist / connectionDist) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212, 168, 83, ${lineAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      const glow = p.gold ? `rgba(232, 201, 122, ${p.alpha})` : `rgba(241, 245, 249, ${p.alpha * 0.7})`;
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.gold && p.r > 2) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(212, 168, 83, ${p.alpha * 0.25})`;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", () => {
    mouse.active = false;
  });

  resize();
  createParticles();
  draw();
})();
