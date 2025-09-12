// isi tahun otomatis (aman kalau elemen tidak ada)
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// tombol dark mode
const btn = document.getElementById('toggle');
if (btn) {
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
} else {
  console.warn('Tombol #toggle tidak ditemukan');
}

/* ===============================
   NAV ACTIVE ON SCROLL (ADD)
   - Menandai link nav sesuai section yang sedang terlihat
================================= */
const sections = document.querySelectorAll('section[id]');     // semua section yang punya id
const navLinks = document.querySelectorAll('.nav-link');       // link navbar

function setActiveLink() {                                     // dipanggil saat scroll & saat load
  let currentId = null;

  // cari section terbawah yang masih melewati ambang 120px dari atas viewport
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 120) currentId = sec.id;
  });

  // update kelas .active
  navLinks.forEach(a => {
    const hrefId = a.getAttribute('href').slice(1);
    a.classList.toggle('active', hrefId === currentId);
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();                                                // jalankan sekali saat load


/* ===============================
   SCROLL REVEAL (ADD)
   - Animasi muncul saat elemen memasuki viewport
   - Menghormati prefers-reduced-motion
================================= */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');                    // tambahkan kelas untuk animasi
        io.unobserve(e.target);                                // animasi sekali saja
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {
  // jika user minta kurangi animasi, tampilkan langsung
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
}

/* ===============================
   HAMBURGER MENU (ADD)
   - Toggle panel nav di mobile
   - Tutup saat klik link, tekan Esc, atau resize ke desktop
================================= */
const menuBtn = document.getElementById('menu-toggle');   // tombol ☰
const navPanel = document.getElementById('nav');          // panel nav

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

  // tutup saat klik salah satu link nav
  navPanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      // hanya tutup di layar kecil
      if (window.matchMedia('(max-width: 768px)').matches) closeMenu();
    });
  });

  // tutup saat tekan Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // tutup otomatis saat kembali ke layar besar (resize)
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 768px)').matches) closeMenu();
  });
}
