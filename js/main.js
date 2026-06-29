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
