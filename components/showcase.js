/* Vitrine do hero estilo "Explore": cartoes de imagem passando em profundidade.
   Desktop: progresso preso a rolagem do hero. Celular: avanca sozinho, aceita deslizar e tocar.
   Sem dependencias. Usada em / e /curriculo. */
(function () {
  'use strict';
  var hero = document.getElementById('top');
  var stage = document.getElementById('hsStage');
  if (!hero || !stage) return;

  var cards = Array.prototype.slice.call(stage.querySelectorAll('.hs-card'));
  var N = cards.length;
  if (!N) return;
  var countEl = document.getElementById('hsCount');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = window.matchMedia('(min-width:981px)');

  // d = posicao relativa ao cartao ativo: x, y (% do palco), escala, opacidade, escurecimento, rotulo
  var KEY = [
    [-2, -34, -38, .50, 0, .45, 0],
    [-1, -27, -29, .64, .9, .42, 0],
    [0, 0, 0, 1, 1, 0, 1],
    [1, 26, 30, .64, 1, .42, 0],
    [2, 34, 40, .50, 0, .45, 0]
  ];
  function pose(d) {
    if (d <= -2) return KEY[0];
    if (d >= 2) return KEY[4];
    var k = 0;
    while (k < 3 && d > KEY[k + 1][0]) k++;
    var a = KEY[k], b = KEY[k + 1], t = (d - a[0]) / (b[0] - a[0]), o = [d];
    for (var i = 1; i < 7; i++) o.push(a[i] + (b[i] - a[i]) * t);
    return o;
  }

  var W = 0, H = 0;
  function measure() { W = stage.clientWidth; H = stage.clientHeight; }

  var pos = 0;          // posicao atual (suavizada)
  var target = 0;       // posicao alvo
  var circular = false; // celular: o deck gira em loop
  var raf = 0;

  function wrap(d) {
    if (!circular) return d;
    d = ((d % N) + N) % N;
    return d > N / 2 ? d - N : d;
  }

  function render() {
    var front = 0, best = 9;
    for (var i = 0; i < N; i++) {
      var d = wrap(i - pos), p = pose(d), ad = Math.abs(d);
      var c = cards[i];
      c.style.transform = 'translate(-50%,-50%) translate3d(' + (p[1] * W / 100).toFixed(1) + 'px,' + (p[2] * H / 100).toFixed(1) + 'px,0) scale(' + p[3].toFixed(3) + ')';
      c.style.opacity = p[4].toFixed(3);
      c.style.zIndex = String(10 - Math.round(ad * 3));
      c.style.setProperty('--dim', p[5].toFixed(3));
      c.style.setProperty('--lab', Math.max(0, p[6] * 1.4 - .4).toFixed(3));
      c.classList.toggle('is-vis', p[4] > .3);
      if (ad < best) { best = ad; front = i; }
    }
    for (var j = 0; j < N; j++) cards[j].classList.toggle('is-front', j === front);
    if (countEl) countEl.innerHTML = '<b>' + String(front + 1).padStart(2, '0') + '</b> / ' + String(N).padStart(2, '0');
  }

  function tick() {
    raf = 0;
    var diff = target - pos;
    if (Math.abs(diff) < .002) { pos = target; render(); return; }
    pos += diff * (reduce ? 1 : .14);
    render();
    raf = requestAnimationFrame(tick);
  }
  function go() { if (!raf) raf = requestAnimationFrame(tick); }

  // ---------- desktop: rolagem ----------
  var scrub = false;
  function onScroll() {
    if (!scrub) return;
    var r = hero.getBoundingClientRect();
    var span = r.height - window.innerHeight;
    var prog = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    target = prog * (N - 1);
    go();
  }

  // ---------- celular: autoplay, deslizar e tocar ----------
  var timer = 0, paused = false, visible = true, dragX = null;
  function step(n) {
    target = Math.round(target) + n;
    go();
  }
  function startAuto() {
    stopAuto();
    if (reduce || scrub) return;
    timer = setInterval(function () { if (!paused && visible && !document.hidden) step(1); }, 3200);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = 0; } }

  stage.addEventListener('pointerdown', function (e) { if (!scrub) { dragX = e.clientX; paused = true; } });
  window.addEventListener('pointerup', function (e) {
    if (dragX === null) return;
    var dx = e.clientX - dragX; dragX = null;
    if (Math.abs(dx) > 40) { step(dx < 0 ? 1 : -1); startAuto(); }
    setTimeout(function () { paused = false; }, 1200);
  });
  stage.addEventListener('pointercancel', function () { dragX = null; paused = false; });

  // clicar num cartao lateral traz ele para a frente; no da frente abre o case
  cards.forEach(function (c, i) {
    c.addEventListener('click', function (e) {
      var d = wrap(i - pos);
      if (Math.abs(d) > .5) {
        e.preventDefault();
        if (scrub) {
          var r = hero.getBoundingClientRect(), span = r.height - window.innerHeight;
          var y = window.scrollY + r.top + span * (i / (N - 1));
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          target = Math.round(pos) + Math.round(d);
          go();
        }
      }
    });
    c.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: .15 }).observe(stage);
  }
  stage.addEventListener('mouseenter', function () { paused = true; });
  stage.addEventListener('mouseleave', function () { paused = false; });

  function mode() {
    var wantScrub = wide.matches && !reduce;
    measure();
    scrub = wantScrub;
    circular = !wantScrub;
    hero.classList.toggle('is-scrub', wantScrub);
    hero.style.setProperty('--steps', N - 1);
    if (wantScrub) { stopAuto(); onScroll(); }
    else { pos = target = Math.round(target); startAuto(); }
    render();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { mode(); });
  if (wide.addEventListener) wide.addEventListener('change', mode);
  mode();
})();
