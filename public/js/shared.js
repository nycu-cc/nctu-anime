// ══════════════════════════════════════════════════════════════
// 交大動畫社 — Shared Scripts
// Mobile menu, Nav scroll, Lightbox, Dark mode toggle
// ══════════════════════════════════════════════════════════════

/* ── Mobile menu toggle ── */
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const ml1 = document.getElementById('ml1');
  const ml2 = document.getElementById('ml2');
  const ml3 = document.getElementById('ml3');

  if (!menuBtn || !mobileMenu) return;

  let menuOpen = false;

  menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden');
    if (menuOpen) {
      ml1.style.transform = 'rotate(45deg) translate(3px, 3px)';
      ml2.style.opacity = '0';
      ml3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
    } else {
      ml1.style.transform = '';
      ml2.style.opacity = '';
      ml3.style.transform = '';
    }
  });

  /* Close mobile menu on link click */
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuOpen = false;
      ml1.style.transform = '';
      ml2.style.opacity = '';
      ml3.style.transform = '';
    });
  });
})();

/* ── Nav shadow on scroll ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-sm', window.scrollY > 50);
  }, { passive: true });
})();

/* ── Lightbox ── */
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg   = document.getElementById('lightboxImg');
  const lbTitle  = document.getElementById('lightboxTitle');
  const lbDate   = document.getElementById('lightboxDate');
  const lbDesc   = document.getElementById('lightboxDesc');
  const lbClose  = document.getElementById('lightboxClose');

  function openLightbox(item) {
    lbImg.src           = item.dataset.src   || '';
    lbImg.alt           = item.dataset.title || '';
    lbTitle.textContent = item.dataset.title || '';
    lbDate.textContent  = item.dataset.date  || '';
    lbDesc.textContent  = item.dataset.desc  || '';
    lbDesc.style.display = item.dataset.desc ? '' : 'none';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
})();

/* ── Dark mode toggle ── */
(function () {
  const html = document.documentElement;
  const toggles = document.querySelectorAll('.theme-toggle');

  function applyTheme(isDark) {
    html.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    toggles.forEach(btn => {
      btn.querySelector('.icon-moon').classList.toggle('hidden', isDark);
      btn.querySelector('.icon-sun').classList.toggle('hidden', !isDark);
    });
  }

  // Sync icons with current state (class already set by head script)
  const isDark = html.classList.contains('dark');
  toggles.forEach(btn => {
    btn.querySelector('.icon-moon').classList.toggle('hidden', isDark);
    btn.querySelector('.icon-sun').classList.toggle('hidden', !isDark);
  });

  // Toggle on click
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(!html.classList.contains('dark'));
    });
  });

  // Listen for system preference changes when no manual override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });
})();
