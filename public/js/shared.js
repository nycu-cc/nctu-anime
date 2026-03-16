// ══════════════════════════════════════════════════════════════
// NCTU Animation Club - Shared Scripts
// Usage: call these before </body> on each page:
//   buildNav(root, currentPage);
//   buildFooter();
//   initShared();
// ══════════════════════════════════════════════════════════════


/* -- Navbar injection --
 *  root        : relative path to project root. Use '' on home, '../' on subpages.
 *  currentPage : 'home' (default) or 'charter', used to mark the active link.
 */
function buildNav(root, currentPage) {
  root = root || '';
  currentPage = currentPage || 'home';

  var isHome = (currentPage === 'home');

  // Section links: use #anchor on home, point back to index.html on subpages.
  var sec = isHome ? '' : root + 'index.html';
  var charterHref = isHome ? 'pages/charter.html' : 'charter.html';
  var charterActive = (currentPage === 'charter') ? ' active' : '';
  var brandHref = isHome ? '#hero' : root + 'index.html';

  var moonPath = 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z';
  var sunPath  = 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z';

  function svgIcon(cls, path) {
    return '<svg class="' + cls + '" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">'
         + '<path stroke-linecap="round" stroke-linejoin="round" d="' + path + '"/></svg>';
  }
  function themeBtn(extra) {
    return '<button class="theme-toggle ' + (extra || '')
         + ' w-8 h-8 flex items-center justify-center text-dark/60 hover:text-dark transition-colors" aria-label="切換夜間模式">'
         + svgIcon('icon-moon w-5 h-5', moonPath)
         + svgIcon('icon-sun w-5 h-5 hidden', sunPath)
         + '</button>';
  }

  var nav = document.getElementById('nav');
  if (!nav) return;

  nav.className = 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200';

  nav.innerHTML =
    '<div class="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">'
      // Brand
    + '<a href="' + brandHref + '" class="flex items-center gap-3">'
    +   '<span class="text-brand font-bold text-lg tracking-tight">交大動畫社</span>'
    + '</a>'

      // Desktop links
    + '<div class="hidden md:flex items-center gap-8 text-sm font-medium">'
    +   '<a href="' + sec + '#activity" class="nav-link text-dark/70 hover:text-dark transition-colors">社課主軸</a>'
    +   '<a href="' + sec + '#topics"   class="nav-link text-dark/70 hover:text-dark transition-colors">往期內容</a>'
    +   '<a href="' + sec + '#gallery"  class="nav-link text-dark/70 hover:text-dark transition-colors">活動剪影</a>'
    +   '<a href="' + sec + '#officers" class="nav-link text-dark/70 hover:text-dark transition-colors">幹部介紹</a>'
    +   '<a href="' + charterHref + '" class="nav-link' + charterActive + ' text-dark/70 hover:text-dark transition-colors">社團章程</a>'
    +   themeBtn()
    +   '<a href="' + sec + '#contact" class="btn-fill px-5 py-2 text-xs font-semibold tracking-wider uppercase">加入我們</a>'
    + '</div>'

      // Mobile controls
    + '<div class="flex items-center gap-2 md:hidden">'
    +   themeBtn()
    +   '<button id="menuBtn" class="w-8 h-8 flex flex-col justify-center items-center gap-1.5" aria-label="選單">'
    +     '<span class="block w-5 h-[2px] bg-dark transition-all duration-300" id="ml1"></span>'
    +     '<span class="block w-5 h-[2px] bg-dark transition-all duration-300" id="ml2"></span>'
    +     '<span class="block w-5 h-[2px] bg-dark transition-all duration-300" id="ml3"></span>'
    +   '</button>'
    + '</div>'
  + '</div>'

    // Mobile drawer
  + '<div id="mobileMenu" class="md:hidden hidden bg-white border-t border-gray-100">'
  +   '<div class="px-6 py-6 flex flex-col gap-4 text-sm font-medium">'
  +     '<a href="' + sec + '#activity" class="mob-link text-dark/70 hover:text-dark py-2">社課主軸</a>'
  +     '<a href="' + sec + '#topics"   class="mob-link text-dark/70 hover:text-dark py-2">往期內容</a>'
  +     '<a href="' + sec + '#gallery"  class="mob-link text-dark/70 hover:text-dark py-2">活動剪影</a>'
  +     '<a href="' + sec + '#officers" class="mob-link text-dark/70 hover:text-dark py-2">幹部介紹</a>'
  +     '<a href="' + charterHref + '" class="mob-link text-dark/70 hover:text-dark py-2">社團章程</a>'
  +     '<a href="' + sec + '#contact" class="mob-link btn-fill inline-block px-5 py-3 text-xs font-semibold tracking-wider uppercase text-center mt-2">加入我們</a>'
  +   '</div>'
  + '</div>';
}


/* -- Footer injection (with dynamic copyright year) -- */
function buildFooter() {
  var footer = document.getElementById('footer');
  if (!footer) return;

  var year = new Date().getFullYear();

  footer.className = 'bg-[#111] text-white/35 py-8';
  footer.innerHTML =
    '<div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">'
    + '<p class="text-xs font-display">NCTU Animation Club &copy; ' + year + '</p>'
    + '<div class="flex gap-8 text-xs">'
    +   '<a href="https://www.facebook.com/NCTUanime" target="_blank" rel="noopener" class="hover:text-white transition-colors">Facebook</a>'
    +   '<a href="https://clubportal.nycu.edu.tw/club/view/join/AB47E02F-4454-4277-8D3B-5104A5924B8A" class="hover:text-white transition-colors">交大單一入口入社</a>'
    +   '<a href="https://github.com/nycu-cc" class="hover:text-white transition-colors">Github Organization</a>'
    +   '<a href="https://github.com/nycu-cc/nctu-anime" class="hover:text-white transition-colors">Source Code</a>'
    + '</div>'
    + '</div>';
}


/* -- Initialize all interactive behaviors (run after buildNav/buildFooter) -- */
function initShared() {

  /* Mobile menu toggle */
  (function () {
    var menuBtn    = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    var ml1        = document.getElementById('ml1');
    var ml2        = document.getElementById('ml2');
    var ml3        = document.getElementById('ml3');

    if (!menuBtn || !mobileMenu) return;

    var menuOpen = false;

    menuBtn.addEventListener('click', function () {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('hidden');
      if (menuOpen) {
        ml1.style.transform = 'rotate(45deg) translate(3px, 3px)';
        ml2.style.opacity   = '0';
        ml3.style.transform = 'rotate(-45deg) translate(3px, -3px)';
      } else {
        ml1.style.transform = '';
        ml2.style.opacity   = '';
        ml3.style.transform = '';
      }
    });

    /* Close menu after link click */
    document.querySelectorAll('.mob-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuOpen            = false;
        ml1.style.transform = '';
        ml2.style.opacity   = '';
        ml3.style.transform = '';
      });
    });
  })();

  /* Nav shadow on scroll */
  (function () {
    var nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('shadow-sm', window.scrollY > 50);
    }, { passive: true });
  })();

  /* Lightbox */
  (function () {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lbImg   = document.getElementById('lightboxImg');
    var lbTitle = document.getElementById('lightboxTitle');
    var lbDate  = document.getElementById('lightboxDate');
    var lbDesc  = document.getElementById('lightboxDesc');
    var lbClose = document.getElementById('lightboxClose');

    function openLightbox(item) {
      lbImg.src              = item.dataset.src   || '';
      lbImg.alt              = item.dataset.title || '';
      lbTitle.textContent    = item.dataset.title || '';
      lbDate.textContent     = item.dataset.date  || '';
      lbDesc.textContent     = item.dataset.desc  || '';
      lbDesc.style.display   = item.dataset.desc  ? '' : 'none';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery-item[data-src]').forEach(function (item) {
      item.addEventListener('click', function () { openLightbox(item); });
    });

    lbClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  })();

  /* Dark mode toggle */
  (function () {
    var html    = document.documentElement;
    var toggles = document.querySelectorAll('.theme-toggle');

    function applyTheme(isDark) {
      html.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      toggles.forEach(function (btn) {
        btn.querySelector('.icon-moon').classList.toggle('hidden', isDark);
        btn.querySelector('.icon-sun').classList.toggle('hidden', !isDark);
      });
    }

    /* Sync icons with the existing <html> state (class already set by inline script in head) */
    var isDark = html.classList.contains('dark');
    toggles.forEach(function (btn) {
      btn.querySelector('.icon-moon').classList.toggle('hidden', isDark);
      btn.querySelector('.icon-sun').classList.toggle('hidden', !isDark);
    });

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(!html.classList.contains('dark'));
      });
    });

    /* Follow system preference when no manual setting exists */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) applyTheme(e.matches);
    });
  })();
}
