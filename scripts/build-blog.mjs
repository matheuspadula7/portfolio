#!/usr/bin/env node
/**
 * build-blog.mjs — gera o blog estático (PT em /blog/, EN em /en/blog/).
 *
 * Fonte:   conteudo/blog/*.md  (um arquivo por post e por idioma)
 * Saída:   blog/** e en/blog/** (HTML), rss.xml de cada idioma e sitemap-blog.xml
 *          Tudo isso é gerado e fica fora do git; o deploy roda este script.
 *
 * Uso:
 *   node scripts/build-blog.mjs               só posts publicados (produção)
 *   node scripts/build-blog.mjs --rascunhos   inclui rascunhos e posts agendados (preview)
 *
 * Um post só é publicado quando `rascunho` não é "true" E a `data` já chegou
 * (fuso de São Paulo). Assim, dá para deixar posts prontos com data futura.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'conteudo', 'blog');
const SITE = 'https://matheuspadula.com.br';
const WHATSAPP = 'https://wa.me/5512974054956';
const WITH_DRAFTS = process.argv.includes('--rascunhos');

// ── textos da interface, por idioma ─────────────────────────────────────────
const T = {
  pt: {
    htmlLang: 'pt-BR', locale: 'pt_BR', dateLocale: 'pt-BR', base: '/blog/',
    blog: 'Blog',
    indexTitle: 'Blog | Padula Design Studio',
    indexDesc: 'Artigos sobre web design, sites que convertem, identidade visual e bastidores de projetos, por Matheus Padula.',
    indexH1: 'Ideias sobre sites que <em>trabalham por você.</em>',
    indexSub: 'Web design, conversão, identidade visual e bastidores dos projetos.',
    all: 'Todos',
    cats: { clientes: 'Para o seu negócio', bastidores: 'Bastidores' },
    min: 'min de leitura', toc: 'Neste artigo', share: 'Compartilhar', copy: 'Copiar link', copied: 'Link copiado',
    more: 'Continue lendo', by: 'Por',
    ctaTitle: 'Quer um site que <em>converta?</em>',
    ctaText: 'Me conta sobre o seu projeto. Eu respondo direto pelo WhatsApp.',
    ctaBtn: 'Falar comigo',
    empty: 'Os primeiros artigos chegam em breve.',
    read: 'Ler artigo', back: 'Todos os artigos', home: 'Início',
  },
  en: {
    htmlLang: 'en', locale: 'en_US', dateLocale: 'en-US', base: '/en/blog/',
    blog: 'Blog',
    indexTitle: 'Blog | Padula Design Studio',
    indexDesc: 'Articles on web design, websites that convert, brand identity and behind-the-scenes of real projects, by Matheus Padula.',
    indexH1: 'Ideas on websites that <em>work for you.</em>',
    indexSub: 'Web design, conversion, brand identity and project behind-the-scenes.',
    all: 'All',
    cats: { clientes: 'For your business', bastidores: 'Behind the scenes' },
    min: 'min read', toc: 'In this article', share: 'Share', copy: 'Copy link', copied: 'Link copied',
    more: 'Keep reading', by: 'By',
    ctaTitle: 'Want a website that <em>converts?</em>',
    ctaText: 'Tell me about your project. I reply directly on WhatsApp.',
    ctaBtn: 'Talk to me',
    empty: 'The first articles are coming soon.',
    read: 'Read article', back: 'All articles', home: 'Home',
  },
};

// ── utilidades ──────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const stripTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const abs = (p) => (p.startsWith('http') ? p : SITE + p);
const jsonLd = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function todaySP() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()); // YYYY-MM-DD
}
function fmtDate(iso, lang) {
  return new Intl.DateTimeFormat(T[lang].dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(iso + 'T12:00:00Z'));
}

function parseFile(file) {
  const raw = readFileSync(join(SRC, file), 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: faltou o bloco de metadados (--- no topo do arquivo)`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) throw new Error(`${file}: linha de metadados inválida: "${line}"`);
    let v = line.slice(i + 1).trim();
    if (/^(".*"|'.*')$/.test(v)) v = v.slice(1, -1);
    meta[line.slice(0, i).trim()] = v;
  }
  return { file, meta, body: m[2].trim() };
}

// ── markdown ────────────────────────────────────────────────────────────────
function renderMarkdown(body) {
  const seen = new Map();
  const toc = [];
  const idFor = (raw) => {
    const base = slugify(raw) || 'secao';
    const n = seen.get(base) || 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(text, level, raw) {
        if (level === 1) level = 2; // o H1 da página é o título do post
        const id = idFor(raw);
        if (level === 2) toc.push({ id, text: stripTags(text).trim() });
        return `<h${level} id="${id}">${text}</h${level}>\n`;
      },
      link(href, title, text) {
        const ext = /^https?:\/\//.test(href) && !href.startsWith(SITE);
        return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
      image(href, title, text) {
        const img = `<img src="${esc(href)}" alt="${esc(text)}" loading="lazy" decoding="async">`;
        return title ? `<figure>${img}<figcaption>${esc(title)}</figcaption></figure>` : img;
      },
    },
  });
  const html = marked.parse(body);
  return { html, toc, words: stripTags(html).split(/\s+/).filter(Boolean).length };
}

// ── carrega e valida os posts ───────────────────────────────────────────────
function loadPosts() {
  if (!existsSync(SRC)) return [];
  const today = todaySP();
  const posts = [];
  for (const file of readdirSync(SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort()) {
    const { meta, body } = parseFile(file);
    const where = (msg) => `${file}: ${msg}`;
    for (const k of ['titulo', 'descricao', 'data', 'categoria']) if (!meta[k]) throw new Error(where(`campo obrigatório ausente: ${k}`));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.data)) throw new Error(where('data deve ser AAAA-MM-DD'));
    const lang = meta.idioma || 'pt';
    if (!T[lang]) throw new Error(where(`idioma inválido: ${lang} (use pt ou en)`));
    if (!T[lang].cats[meta.categoria]) throw new Error(where(`categoria inválida: ${meta.categoria} (use ${Object.keys(T.pt.cats).join(' ou ')})`));
    const slug = meta.slug || slugify(meta.titulo);
    const isDraft = meta.rascunho === 'true';
    const isFuture = meta.data > today;
    if (!WITH_DRAFTS && (isDraft || isFuture)) continue;
    if (meta.descricao.length > 170) console.warn(`aviso: ${where(`descrição com ${meta.descricao.length} caracteres (ideal até 160)`)}`);
    const md = renderMarkdown(body);
    posts.push({
      file, lang, slug, body, md,
      title: meta.titulo, desc: meta.descricao, date: meta.data, updated: meta.atualizado || meta.data,
      cat: meta.categoria, par: meta.par || '', cover: meta.capa || '', coverAlt: meta.capa_alt || '',
      draft: isDraft || isFuture,
      minutes: Math.max(1, Math.round(md.words / 200)),
      url: `${T[lang].base}${slug}/`,
    });
  }
  const keys = new Set();
  for (const p of posts) {
    const k = `${p.lang}/${p.slug}`;
    if (keys.has(k)) throw new Error(`slug duplicado em ${p.lang}: ${p.slug}`);
    keys.add(k);
  }
  for (const p of posts) {
    p.alt = null;
    if (p.par) {
      const other = posts.find((q) => q.lang !== p.lang && q.slug === p.par);
      if (!other) console.warn(`aviso: ${p.file}: "par: ${p.par}" não encontrado (ou ainda é rascunho); o post fica sem versão no outro idioma`);
      else p.alt = other;
    }
  }
  // garante a simetria: se A aponta para B, B também aponta para A
  for (const p of posts) if (p.alt && !p.alt.alt) p.alt.alt = p;
  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

// ── blocos de HTML ──────────────────────────────────────────────────────────
function head({ lang, title, desc, canonical, alternates, ogImage, ogType, extra = '' }) {
  const t = T[lang];
  const hreflang = alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${abs(a.href)}">`).join('\n');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<script src="/tracking.js"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CSJHZ8GRJ0"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-CSJHZ8GRJ0', window.padulaInternal ? { traffic_type: 'internal' } : {});
</script>
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yiovw00pqz");
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="author" content="Matheus Padula">
<link rel="canonical" href="${abs(canonical)}">
${hreflang}
<link rel="alternate" type="application/rss+xml" title="Blog | Padula Design Studio" href="${t.base}rss.xml">
<meta property="og:site_name" content="Padula Design Studio">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:url" content="${abs(canonical)}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${t.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${abs(ogImage)}">
${extra}<link rel="icon" type="image/png" href="/assets/favicon.png">
<link rel="shortcut icon" href="/assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/components/layout.css?v=4">
<link rel="stylesheet" href="/components/blog.css?v=1">
</head>`;
}

function tail(lang, altMap) {
  return `<div id="footer-root"></div>
<script>window.__BLOG = ${JSON.stringify({ lang, alt: altMap })};</script>
<script src="/components/layout.js?v=4"></script>
<script src="/components/blog.js?v=1"></script>
</body>
</html>
`;
}

const cover = (p, size) => {
  const t = T[p.lang];
  if (p.cover) {
    return `<div class="cover cover-${size}"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt)}"${size === 'hero' ? '' : ' loading="lazy"'} decoding="async"></div>`;
  }
  return `<div class="cover cover-${size} cover-type" aria-hidden="true"><span class="cover-cat">// ${esc(t.cats[p.cat])}</span><span class="cover-brand">Padula<i>.</i></span></div>`;
};

function card(p, featured = false) {
  const t = T[p.lang];
  return `<a class="card${featured ? ' card-featured' : ''}" href="${p.url}" data-cat="${p.cat}">
  ${cover(p, featured ? 'feat' : 'card')}
  <div class="card-body">
    <span class="tag">${esc(t.cats[p.cat])}</span>
    <h2 class="card-title">${esc(p.title)}</h2>
    <p class="card-desc">${esc(p.desc)}</p>
    <span class="card-meta"><time datetime="${p.date}">${fmtDate(p.date, p.lang)}</time> · ${p.minutes} ${t.min}</span>
  </div>
</a>`;
}

// ── páginas ─────────────────────────────────────────────────────────────────
function indexPage(lang, posts, hasOther) {
  const t = T[lang];
  const cats = [...new Set(posts.map((p) => p.cat))];
  const other = lang === 'pt' ? 'en' : 'pt';
  const alternates = [{ hreflang: t.htmlLang === 'pt-BR' ? 'pt-BR' : 'en', href: t.base }];
  if (posts.length && hasOther) alternates.push({ hreflang: other === 'pt' ? 'pt-BR' : 'en', href: T[other].base });
  alternates.push({ hreflang: 'x-default', href: T.pt.base });

  const chips = cats.length > 1
    ? `<div class="chips" role="group" aria-label="Filtro">
      <button class="chip on" data-cat="all">${t.all}</button>
      ${cats.map((c) => `<button class="chip" data-cat="${c}">${esc(t.cats[c])}</button>`).join('\n      ')}
    </div>`
    : '';
  const [first, ...rest] = posts;
  const list = posts.length
    ? `${card(first, true)}\n${rest.length ? `<div class="grid">\n${rest.map((p) => card(p)).join('\n')}\n</div>` : ''}`
    : `<p class="empty">${t.empty}</p>`;

  const ld = {
    '@context': 'https://schema.org', '@type': 'Blog', name: 'Blog | Padula Design Studio', url: abs(t.base), inLanguage: t.htmlLang,
    author: { '@type': 'Person', name: 'Matheus Padula', url: SITE },
  };
  return `${head({
    lang, title: t.indexTitle, desc: t.indexDesc, canonical: t.base, alternates,
    ogImage: '/assets/social_preview.jpg', ogType: 'website',
    extra: `${posts.length ? '' : '<meta name="robots" content="noindex">\n'}<script type="application/ld+json">\n${jsonLd(ld)}\n</script>\n`,
  })}
<body class="blog-page">
<div id="nav-root"></div>
<main class="blog-index">
  <div class="container">
    <header class="index-head">
      <span class="eyebrow">// blog</span>
      <h1>${t.indexH1}</h1>
      <p class="index-sub">${t.indexSub}</p>
    </header>
    ${chips}
    <div class="list">
${list}
    </div>
  </div>
</main>
${tail(lang, { pt: T.pt.base, en: T.en.base })}`;
}

function postPage(p, all) {
  const t = T[p.lang];
  const other = p.lang === 'pt' ? 'en' : 'pt';
  const alternates = [{ hreflang: t.htmlLang === 'pt-BR' ? 'pt-BR' : 'en', href: p.url }];
  if (p.alt) alternates.push({ hreflang: other === 'pt' ? 'pt-BR' : 'en', href: p.alt.url });
  const ptUrl = p.lang === 'pt' ? p.url : p.alt && p.alt.url;
  if (ptUrl) alternates.push({ hreflang: 'x-default', href: ptUrl });
  const altMap = { [p.lang]: p.url, [other]: p.alt ? p.alt.url : T[other].base };

  const ogImage = p.cover || '/assets/social_preview.jpg';
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: p.title, description: p.desc, inLanguage: t.htmlLang,
      datePublished: p.date, dateModified: p.updated, image: abs(ogImage),
      mainEntityOfPage: abs(p.url),
      author: { '@type': 'Person', name: 'Matheus Padula', url: SITE },
      publisher: { '@type': 'Organization', name: 'Padula Design Studio', logo: { '@type': 'ImageObject', url: abs('/assets/logo.png') } },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.blog, item: abs(t.base) },
        { '@type': 'ListItem', position: 2, name: p.title, item: abs(p.url) },
      ],
    },
  ];

  const related = all
    .filter((q) => q.lang === p.lang && q !== p)
    .sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat) || b.date.localeCompare(a.date))
    .slice(0, 3);

  const toc = p.md.toc.length >= 3
    ? `<aside class="toc" aria-label="${t.toc}">
      <details open>
        <summary>${t.toc}</summary>
        <ol>
${p.md.toc.map((h) => `          <li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('\n')}
        </ol>
      </details>
    </aside>`
    : '';

  const enc = encodeURIComponent;
  const pageUrl = abs(p.url);
  const share = `<div class="share">
      <span class="share-label">${t.share}</span>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${enc(pageUrl)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
      <a href="https://twitter.com/intent/tweet?url=${enc(pageUrl)}&text=${enc(p.title)}" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
      <a href="https://wa.me/?text=${enc(p.title + ' ' + pageUrl)}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WhatsApp</a>
      <button type="button" class="copy-link" data-copied="${t.copied}" data-url="${esc(pageUrl)}">${t.copy}</button>
    </div>`;

  return `${head({
    lang: p.lang, title: `${p.title} | Padula Design Studio`, desc: p.desc, canonical: p.url, alternates,
    ogImage, ogType: 'article',
    extra: `${p.draft ? '<meta name="robots" content="noindex">\n' : ''}<meta property="article:published_time" content="${p.date}">\n<meta property="article:author" content="Matheus Padula">\n<script type="application/ld+json">\n${jsonLd(ld)}\n</script>\n`,
  })}
<body class="blog-page">
<div id="nav-root"></div>
<main>
  <article class="post">
    <header class="container post-head">
      <nav class="crumbs" aria-label="breadcrumb"><a href="${t.base}">${t.blog}</a><span aria-hidden="true">/</span><span>${esc(t.cats[p.cat])}</span></nav>
      <h1>${esc(p.title)}</h1>
      <p class="lede">${esc(p.desc)}</p>
      <div class="byline">
        <img src="/assets/matheus.png" alt="" width="40" height="40">
        <span>${t.by} <b>Matheus Padula</b></span>
        <span class="dot" aria-hidden="true">·</span>
        <time datetime="${p.date}">${fmtDate(p.date, p.lang)}</time>
        <span class="dot" aria-hidden="true">·</span>
        <span>${p.minutes} ${t.min}</span>${p.draft ? '\n        <span class="draft-flag">RASCUNHO</span>' : ''}
      </div>
    </header>
    <div class="container">${cover(p, 'hero')}</div>
    <div class="container post-grid${toc ? '' : ' no-toc'}">
      ${toc}
      <div class="prose">
${p.md.html}
        ${share}
      </div>
    </div>
    <section class="container cta-block">
      <h2>${t.ctaTitle}</h2>
      <p>${t.ctaText}</p>
      <a class="btn-cta" href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">${t.ctaBtn} <span aria-hidden="true">↗</span></a>
    </section>
  </article>
${related.length ? `  <section class="container related">
    <h2>${t.more}</h2>
    <div class="grid">
${related.map((q) => card(q)).join('\n')}
    </div>
  </section>
` : ''}</main>
${tail(p.lang, altMap)}`;
}

function rss(lang, posts) {
  const t = T[lang];
  const items = posts.slice(0, 30).map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(p.url)}</link>
      <guid isPermaLink="true">${abs(p.url)}</guid>
      <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <category>${esc(t.cats[p.cat])}</category>
      <description>${esc(p.desc)}</description>
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog | Padula Design Studio</title>
    <link>${abs(t.base)}</link>
    <description>${esc(t.indexDesc)}</description>
    <language>${t.htmlLang}</language>
    <atom:link href="${abs(t.base)}rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function sitemap(posts) {
  const link = (hreflang, href) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${abs(href)}"/>`;
  const hl = (l) => (l === 'pt' ? 'pt-BR' : 'en');
  const urls = [];
  for (const lang of ['pt', 'en']) {
    const list = posts.filter((p) => p.lang === lang);
    if (!list.length) continue;
    urls.push(`  <url>\n    <loc>${abs(T[lang].base)}</loc>\n    <lastmod>${list[0].updated}</lastmod>\n  </url>`);
  }
  for (const p of posts) {
    const links = [link(hl(p.lang), p.url)];
    if (p.alt) links.push(link(hl(p.alt.lang), p.alt.url));
    urls.push(`  <url>\n    <loc>${abs(p.url)}</loc>\n    <lastmod>${p.updated}</lastmod>\n${links.join('\n')}\n  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
}

// ── execução ────────────────────────────────────────────────────────────────
function write(rel, content) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

const posts = loadPosts();
rmSync(join(ROOT, 'blog'), { recursive: true, force: true });
rmSync(join(ROOT, 'en', 'blog'), { recursive: true, force: true });

for (const lang of ['pt', 'en']) {
  const list = posts.filter((p) => p.lang === lang);
  // as duas listagens sempre existem (o menu e o seletor de idioma apontam para elas);
  // sem posts, mostram "em breve" e ficam como noindex
  const dir = T[lang].base.slice(1); // "blog/" ou "en/blog/"
  const hasOther = posts.some((p) => p.lang !== lang);
  write(`${dir}index.html`, indexPage(lang, list, hasOther));
  write(`${dir}rss.xml`, rss(lang, list));
  for (const p of list) write(`${dir}${p.slug}/index.html`, postPage(p, posts));
}
write('sitemap-blog.xml', sitemap(posts));

const n = (l) => posts.filter((p) => p.lang === l).length;
console.log(`blog: ${posts.length} post(s) (${n('pt')} PT, ${n('en')} EN)${WITH_DRAFTS ? ', incluindo rascunhos/agendados' : ''}`);
