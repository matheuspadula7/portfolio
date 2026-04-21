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
    <a href="${base}#top" class="logo"><img src="${isHome ? '' : '../'}assets/logo.png" alt="Padula" style="height:28px;display:block;"></a>
    <div class="nav-links">
      <a href="${base}#portfolio">Portfolio</a>
      <a href="${base}#sobre">Sobre</a>
      <a href="${base}#contato">Contato</a>
    </div>
    <div class="nav-right">
      <div class="lang" role="tablist">
        <button class="on" data-lang="pt">PT</button>
        <button data-lang="en">EN</button>
      </div>
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
      initLang();
    });
  } else {
    inject('nav-root', navHTML);
    inject('footer-root', footerHTML);
    initNav();
    initLang();
  }

  // ── NAV SCROLL BEHAVIOR ───────────────────────────────────────────────────
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── BURGER TOGGLE ──────────────────────────────────────────────────────
    const burger = nav.querySelector('.burger');
    const navLinks = nav.querySelector('.nav-links');
    if (burger && navLinks) {
      burger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        navLinks.classList.toggle('open', !isOpen);
        burger.textContent = isOpen ? 'MENU' : 'FECHAR';
        document.body.style.overflow = isOpen ? '' : 'hidden';
      });
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          navLinks.classList.remove('open');
          burger.textContent = 'MENU';
          document.body.style.overflow = '';
        });
      });
    }

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

  // ── I18N ──────────────────────────────────────────────────────────────────
  const CASE_I18N = {
    pt: {
      'nav.portfolio': 'Portfolio',
      'nav.about': 'Sobre',
      'nav.contact': 'Contato',
      'nav.cta': 'Falar comigo',
      'case.label.web': 'Case Study — Web Design',
      'case.label.ecommerce': 'Case Study — E-commerce',
      'case.client': 'Cliente',
      'case.year': 'Ano',
      'case.scope': 'Escopo',
      'case.stack': 'Stack',
      'case.platform': 'Plataforma',
      'case.live': 'Ver site ao vivo',
      'case.store': 'Ver loja ao vivo',
      'case.next': 'Próximo projeto',
      's01': '01 — O desafio',
      's02': '02 — A solução',
      's03': '03 — Capturas do projeto',
      's04': '04 — O resultado',
    },
    en: {
      'nav.portfolio': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.cta': 'Talk to me',
      'case.label.web': 'Case Study — Web Design',
      'case.label.ecommerce': 'Case Study — E-commerce',
      'case.client': 'Client',
      'case.year': 'Year',
      'case.scope': 'Scope',
      'case.stack': 'Stack',
      'case.platform': 'Platform',
      'case.live': 'View live site',
      'case.store': 'View live store',
      'case.next': 'Next project',
      's01': '01 — The challenge',
      's02': '02 — The solution',
      's03': '03 — Project screenshots',
      's04': '04 — The result',
    }
  };

  function applyCaseLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (CASE_I18N[lang] && CASE_I18N[lang][key]) {
        el.innerHTML = CASE_I18N[lang][key];
      }
    });
    document.querySelectorAll('.lang button').forEach(b => {
      b.classList.toggle('on', b.dataset.lang === lang);
    });
    localStorage.setItem('lang', lang);
  }

  function initLang() {
    const saved = localStorage.getItem('lang') || 'pt';
    applyCaseLang(saved);
    document.querySelectorAll('.lang button').forEach(b => {
      b.addEventListener('click', () => applyCaseLang(b.dataset.lang));
    });
  }

})();
