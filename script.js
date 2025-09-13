// Tahun otomatis
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// Tema: default dark; toggle ke .light dan simpan preferensi
const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null
if (saved === 'light') document.body.classList.add('light');
const themeBtn = document.getElementById('toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// Header shadow saat scroll
const header = document.querySelector('.site-header');
const onScrollHeader = () => {
  if (!header) return;
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScrollHeader);
onScrollHeader();

// NAV active on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function setActiveLink() {
  let currentId = null;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 120) currentId = sec.id;
  });
  navLinks.forEach(a => {
    const hrefId = a.getAttribute('href').slice(1);
    a.classList.toggle('active', hrefId === currentId);
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Scroll reveal (hormati prefers-reduced-motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
}

// Hamburger menu (mobile)
const menuBtn = document.getElementById('menu-toggle');
const navPanel = document.getElementById('nav');
function closeMenu() {
  if (!navPanel) return;
  navPanel.classList.remove('open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}
function toggleMenu() {
  if (!navPanel) return;
  const open = navPanel.classList.toggle('open');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
if (menuBtn && navPanel) {
  menuBtn.addEventListener('click', toggleMenu);
  navPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) closeMenu();
    });
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 768px)').matches) closeMenu();
  });
}
