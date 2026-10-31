/*
 * Padula tracking helper
 * 1) Marca o seu navegador como tráfego interno (GA4 e Clarity), independente do IP.
 *    Abra o site uma vez com ?internal=1 para marcar e ?internal=0 para desmarcar.
 *    Acessos por localhost ou arquivo local também contam como internos.
 * 2) Registra o evento generate_lead no GA4 em cliques de WhatsApp, e-mail e telefone
 *    e no envio de formulários, com os parâmetros:
 *      lead_method   whatsapp | email | phone | form
 *      link_location onde o contato foi clicado (menu, hero, rodape, contato, depoimentos
 *                    ou case-<pagina>)
 *      page_path     caminho da página
 *
 * Este arquivo roda ANTES do gtag('config') de cada página (sem defer) de propósito:
 * o flag de tráfego interno precisa existir quando o primeiro page_view é enviado.
 */
(function () {
  var KEY = 'padula_internal';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  var internal = false;
  try {
    var flag = new URLSearchParams(window.location.search).get('internal');
    if (flag === '1') { localStorage.setItem(KEY, '1'); }
    if (flag === '0') { localStorage.removeItem(KEY); }
    internal = localStorage.getItem(KEY) === '1';
  } catch (e) {}

  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === 'file:') {
    internal = true;
  }

  window.padulaInternal = internal;

  if (internal) {
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
    window.clarity('set', 'internal', 'true');
  }

  // Descobre onde, na página, o contato foi clicado.
  function leadLocation(el) {
    if (!el || !el.closest) { return 'pagina'; }
    if (el.closest('nav, .nav')) { return 'menu'; }
    if (el.closest('footer')) { return 'rodape'; }
    if (el.closest('.testi-section')) { return 'depoimentos'; }
    if (el.closest('#contato, .contact')) { return 'contato'; }
    if (el.closest('.hero, header')) { return 'hero'; }
    var slug = window.location.pathname.replace(/^\/+|\/+$/g, '').replace(/\.html$/, '');
    if (slug === 'curriculo') { return 'curriculo'; }
    return slug ? 'case-' + slug.replace(/\//g, '-') : 'pagina';
  }

  function sendLead(method, el, extra) {
    var params = {
      lead_method: method,
      link_location: leadLocation(el),
      page_path: window.location.pathname,
      transport_type: 'beacon'
    };
    if (extra) { for (var k in extra) { params[k] = extra[k]; } }
    window.gtag('event', 'generate_lead', params);
  }

  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a || a.hasAttribute('data-no-lead')) { return; }
    var href = a.getAttribute('href') || '';
    var method = null;
    if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href) || /^whatsapp:/i.test(href)) {
      method = 'whatsapp';
    } else if (/^mailto:/i.test(href)) {
      method = 'email';
    } else if (/^tel:/i.test(href)) {
      method = 'phone';
    }
    if (!method) { return; }
    sendLead(method, a, { link_url: href });
  }, true);

  document.addEventListener('submit', function (ev) {
    var f = ev.target;
    if (!f || f.tagName !== 'FORM') { return; }
    sendLead('form', f, { form_id: f.id || '' });
  }, true);

  // Exposto para a página /whatsapp, que envia o lead sem um clique real.
  window.padulaSendLead = sendLead;
})();
