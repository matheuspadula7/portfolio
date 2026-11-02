/**
 * blog.js — comportamentos da listagem e dos artigos: filtro por categoria,
 * copiar link, índice (TOC) recolhido no celular e destaque da seção atual.
 */
(function () {
  // Filtro por categoria na listagem
  const chips = document.querySelectorAll('.chip');
  if (chips.length) {
    const cards = document.querySelectorAll('.list .card');
    chips.forEach(chip => chip.addEventListener('click', () => {
      const cat = chip.dataset.cat;
      chips.forEach(c => c.classList.toggle('on', c === chip));
      cards.forEach(card => { card.hidden = cat !== 'all' && card.dataset.cat !== cat; });
      // se o destaque sumiu, o grid fica sem o card grande: tudo bem, é só um filtro
    }));
  }

  // Copiar link
  document.querySelectorAll('.copy-link').forEach(btn => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.url);
        btn.textContent = btn.dataset.copied;
        setTimeout(() => { btn.textContent = label; }, 2000);
      } catch (e) {
        window.prompt('', btn.dataset.url);
      }
    });
  });

  // Índice: recolhido no celular
  const toc = document.querySelector('.toc details');
  if (toc && window.matchMedia('(max-width: 900px)').matches) toc.removeAttribute('open');

  // Destaca no índice a seção que está na tela
  const links = Array.from(document.querySelectorAll('.toc li a'));
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const heads = Array.from(byId.keys()).map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.remove('on'));
        const a = byId.get(en.target.id);
        if (a) a.classList.add('on');
      });
    }, { rootMargin: '-90px 0px -70% 0px' });
    heads.forEach(h => io.observe(h));
  }
})();
