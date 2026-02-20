// ══════════════════════════════════════════════════════════════
// 交大動畫社 — Tailwind Config (共用)
// ══════════════════════════════════════════════════════════════
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: '#D90E2C',
        'brand-dark': '#9E1830',
        'off-white': '#F9F9F9',
        'dark': '#1A1A1A',
        'mid': '#666666',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', '"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
    }
  }
};
