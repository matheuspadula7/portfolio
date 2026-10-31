/* Vitrine do hero: pilha de projetos, pagina rolando, abas, deslizar, paralaxe leve.
   Sem dependencias. Usada em / e /curriculo (precisa do objeto global I18N e de window.__currentLang). */
(function () {
  'use strict';
  var hero = document.getElementById('top');
  var vis = document.getElementById('heroVisual');
  if (!hero || !vis) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var SL = [
    { name: 'Diálogos Estruturantes', key: 'hero.hv1' },
    { name: 'IHS Advogados', key: 'hero.hv2' },
    { name: 'Dr. Rafael Nora Resende', key: 'hero.hv3' }
  ];
  var N = SL.length;
  var q = function (sel) { return Array.prototype.slice.call(vis.querySelectorAll(sel)); };
  var cards = q('.bf');
  var pages = q('.bf-page');
  var tabs = q('.bf-tabs button');
  var devImgs = q('.hv-dev img');
  var devChips = q('.hv-chip');
  var panels = q('.hv-sp');
  var deck = document.getElementById('bfDeck');
  var nameEl = document.getElementById('bfName');
  var typeEl = document.getElementById('bfType');
  var countEl = document.getElementById('bfCount');
  var cur = 0;

  function dict() { try { return I18N[window.__currentLang || 'pt'] || {}; } catch (e) { return {}; } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function measure(i) {
    var card = cards[i], img = pages[i];
    var screen = card.querySelector('.bf-screen');
    var d = Math.max(0, img.getBoundingClientRect().height - screen.clientHeight);
    img.style.setProperty('--dist', d + 'px');
    vis.style.setProperty('--dur', Math.min(18, Math.max(10, d / 135)).toFixed(1) + 's');
  }

  function meta() {
    nameEl.textContent = SL[cur].name;
    typeEl.setAttribute('data-i18n', SL[cur].key);
    typeEl.textContent = dict()[SL[cur].key] || '';
    countEl.innerHTML = '<b>' + pad(cur + 1) + '</b> / ' + pad(N);
    tabs.forEach(function (b, k) {
      b.classList.toggle('on', k === cur);
      b.setAttribute('aria-selected', k === cur ? 'true' : 'false');
    });
    devImgs.forEach(function (im, k) { im.classList.toggle('on', k === cur); });
    devChips.forEach(function (c, k) { c.classList.toggle('on', k === cur); });
    panels.forEach(function (p, k) { p.classList.toggle('on', k === cur); });
  }

  function show(i) {
    i = ((i % N) + N) % N;
    var prev = cur;
    if (i !== prev) {
      var old = pages[prev];
      old.classList.remove('is-active');
      old.classList.add('is-leaving');
      setTimeout(function () { old.classList.remove('is-leaving'); }, 950);
    }
    cur = i;
    cards.forEach(function (c, k) { c.setAttribute('data-pos', String(((k - cur) % N + N) % N)); });
    var img = pages[cur];
    img.classList.remove('is-leaving');
    measure(cur);
    void img.offsetWidth;
    img.classList.add('is-active');
    meta();
    // reinicia a barra de progresso da aba ativa
    var on = tabs[cur];
    on.classList.remove('on'); void on.offsetWidth; on.classList.add('on');
  }

  /* fim da rolagem da pagina da frente -> proximo projeto */
  pages.forEach(function (p, k) {
    p.addEventListener('animationend', function (e) {
      if (e.animationName === 'bfscroll' && k === cur && !reduce) show(cur + 1);
    });
  });

  /* clique em um cartao de tras traz ele para a frente; o da frente abre o case */
  var swiped = false;
  cards.forEach(function (c, k) {
    c.addEventListener('click', function (ev) {
      if (swiped) { ev.preventDefault(); return; }
      if (k !== cur) { ev.preventDefault(); show(k); }
    });
  });
  tabs.forEach(function (b, k) {
    b.addEventListener('click', function () { show(k); });
    b.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowRight') { ev.preventDefault(); show(cur + 1); tabs[cur].focus(); }
      if (ev.key === 'ArrowLeft') { ev.preventDefault(); show(cur - 1); tabs[cur].focus(); }
    });
  });

  /* deslizar para o lado (toque ou mouse) troca de projeto */
  var sx = 0, sy0 = 0, down = false;
  deck.addEventListener('pointerdown', function (e) { down = true; swiped = false; sx = e.clientX; sy0 = e.clientY; });
  deck.addEventListener('pointerup', function (e) {
    if (!down) return; down = false;
    var dx = e.clientX - sx, dy = e.clientY - sy0;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swiped = true;
      show(dx < 0 ? cur + 1 : cur - 1);
      setTimeout(function () { swiped = false; }, 350);
    }
  });
  deck.addEventListener('pointercancel', function () { down = false; });

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.lang button')) setTimeout(meta, 0);
  });
  window.addEventListener('resize', function () { measure(cur); });
  if (pages[0].complete) { measure(0); } else { pages[0].addEventListener('load', function () { measure(0); }); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { measure(cur); }); }

  /* estado inicial (o HTML ja traz data-pos e a primeira pagina ativa) */
  show(0);
  if (reduce) { pages[0].classList.remove('is-active'); }

  if (reduce) return;

  /* ---------- paralaxe: mouse (so com cursor) + deriva na rolagem ---------- */
  var layers = q('.hv-layer').map(function (el) {
    return { el: el, d: parseFloat(el.getAttribute('data-depth')) || 0, x: 0, y: 0 };
  });
  var mx = 0, my = 0, sy = 0, raf = 0;
  function tick() {
    for (var n = 0; n < layers.length; n++) {
      var l = layers[n];
      var tx = mx * l.d * 16;
      var ty = my * l.d * 12 + sy * l.d * 38;
      l.x += (tx - l.x) * 0.08;
      l.y += (ty - l.y) * 0.08;
      l.el.style.transform = 'translate3d(' + l.x.toFixed(2) + 'px,' + l.y.toFixed(2) + 'px,0)';
    }
    raf = requestAnimationFrame(tick);
  }
  if (fine) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    hero.addEventListener('mouseleave', function () { mx = 0; my = 0; });
  }
  window.addEventListener('scroll', function () {
    sy = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.85)));
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var on = es[0].isIntersecting;
      hero.classList.toggle('is-off', !on);
      if (on && !raf) raf = requestAnimationFrame(tick);
      if (!on && raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.02 }).observe(hero);
  } else {
    raf = requestAnimationFrame(tick);
  }
})();
