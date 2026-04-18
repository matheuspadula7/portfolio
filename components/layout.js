/**
 * layout.js — Padula Design Studio
 * Injeta nav e footer em todas as páginas.
 * Detecta se está na home (index.html ou /) ou numa página filha
 * e ajusta os hrefs dos links âncora adequadamente.
 */

(function () {
  const isHome = ['/', '/index.html', ''].some(p =>
    window.location.pathname === p ||
    window.location.pathname.endsWith('/index.html')
  );

  // Prefixo para links âncora: vazio na home, "index.html" nas pages filhas
  const base = isHome ? '' : 'index.html';

  // ── NAV ──────────────────────────────────────────────────────────────────
  const navHTML = `
<nav class="nav" id="nav">
  <div class="container row">
    <a href="${base}#top" class="logo"><span class="star">✸</span> Padula</a>
    <div class="nav-links">
      <a href="${base}#portfolio">Portfolio</a>
      <a href="${base}#sobre">Sobre</a>
      <a href="${base}#contato">Contato</a>
    </div>
    <div class="nav-right">
      <a href="https://wa.me/5512974054956" target="_blank" rel="noopener noreferrer" class="cta-btn">
        Falar comigo <span class="arrow">↗</span>
      </a>
      <span class="burger">MENU</span>
    </div>
  </div>
</nav>`;

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const footerHTML = `
<footer>
  <div class="container foot">
    <div>© 2026 Matheus Padula · Design + Dev por Matheus Padula</div>
    <div class="links">
      <a href="${base}#portfolio">Portfolio</a>
      <a href="${base}#sobre">Sobre</a>
      <a href="${base}#contato">Contato</a>
    </div>
  </div>
</footer>`;

  // ── INJECT ────────────────────────────────────────────────────────────────
  function inject(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  // Injeta imediatamente se o DOM já estiver pronto, senão aguarda
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      inject('nav-root', navHTML);
      inject('footer-root', footerHTML);
      initNav();
    });
  } else {
    inject('nav-root', navHTML);
    inject('footer-root', footerHTML);
    initNav();
  }

  // ── NAV SCROLL BEHAVIOR ───────────────────────────────────────────────────
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Cursor lg em links do nav
    nav.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const cur = document.getElementById('cursor');
        if (cur) cur.classList.add('lg');
      });
      el.addEventListener('mouseleave', () => {
        const cur = document.getElementById('cursor');
        if (cur) cur.classList.remove('lg');
      });
    });
  }
})();
