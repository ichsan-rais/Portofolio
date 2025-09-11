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
