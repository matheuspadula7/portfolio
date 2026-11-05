#!/usr/bin/env node
/**
 * build-blog.mjs — valida e gera o blog estático (PT em /blog/, EN em /en/blog/).
 *
 * Contrato: conteudo/linha-editorial-blog.md (seção 7). Regras editoriais: scripts/blog-regras.json.
 * Fonte:    conteudo/blog/*.md (um arquivo por post e por idioma; *.derivados.md e _*.md são ignorados)
 * Saída:    blog/** e en/blog/** (HTML), rss.xml de cada idioma e sitemap-blog.xml (tudo gerado, fora do git)
 *
 * Uso:
 *   node scripts/build-blog.mjs               produção: publica só posts aprovados/publicados com data vencida;
 *                                             qualquer erro de validação em post aprovado derruba o build
 *   node scripts/build-blog.mjs --rascunhos   preview: inclui rascunhos e agendados, só avisa dos erros
 *   node scripts/build-blog.mjs --validar     só valida todos os posts e mostra o relatório (não gera nada)
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';
import YAML from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'conteudo', 'blog');
const SITE = 'https://matheuspadula.com.br';
const WITH_DRAFTS = process.argv.includes('--rascunhos');
const ONLY_VALIDATE = process.argv.includes('--validar');
const RULES = JSON.parse(readFileSync(join(ROOT, 'scripts', 'blog-regras.json'), 'utf8'));

const STATUS = ['rascunho', 'aprovado', 'publicado'];
const TIPOS = ['guia', 'sintoma', 'explicador', 'bastidor', 'tese'];
const PILARES = ['web-design-que-converte', 'qualidade-e-responsabilidade', 'automacao-e-ia', 'seguranca-web', 'identidade-visual'];
const PUBLICOS = ['b2b-dono', 'b2b-agencia', 'identidade'];
const FUNIS = ['atracao', 'confianca', 'traducao', 'evidencia', 'bastidores'];

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
    cats: { web: 'Web e desenvolvimento', identidade: 'Identidade visual' },
    min: 'min de leitura', toc: 'Neste artigo', share: 'Compartilhar', copy: 'Copiar link', copied: 'Link copiado',
    more: 'Continue lendo', by: 'Por', updated: 'Atualizado em', answer: 'Resposta curta',
    faq: 'Perguntas frequentes', sources: 'Fontes', caseLabel: 'Case relacionado', caseCta: 'Ver o case',
    authorTitle: 'Sobre o autor',
    authorText: (r) => `Sou designer com formação em Publicidade e 9 anos de mercado, combinando criatividade estratégica com execução técnica. Atendo empresas de todo o Brasil, com foco no ${r}, e trabalho de forma independente: você fala comigo do início ao fim, com design e código em um processo só. Uso IA no meu processo e reviso cada texto antes de publicar.`,
    ctaTitle: 'Quer conversar sobre <em>o seu caso?</em>',
    ctaText: 'Me conta o que você tem em mente. Eu respondo direto pelo WhatsApp.',
    ctaBtn: 'Falar comigo',
    empty: 'Os primeiros artigos chegam em breve.',
  },
  en: {
    htmlLang: 'en', locale: 'en_US', dateLocale: 'en-US', base: '/en/blog/',
    blog: 'Blog',
    indexTitle: 'Blog | Padula Design Studio',
    indexDesc: 'Articles on web design, websites that convert, brand identity and behind-the-scenes of real projects, by Matheus Padula.',
    indexH1: 'Ideas on websites that <em>work for you.</em>',
    indexSub: 'Web design, conversion, brand identity and project behind-the-scenes.',
    all: 'All',
    cats: { web: 'Web and development', identidade: 'Visual identity' },
    min: 'min read', toc: 'In this article', share: 'Share', copy: 'Copy link', copied: 'Link copied',
    more: 'Keep reading', by: 'By', updated: 'Updated on', answer: 'Short answer',
    faq: 'Frequently asked questions', sources: 'Sources', caseLabel: 'Related case', caseCta: 'See the case',
    authorTitle: 'About the author',
    authorText: (r) => `I'm a designer with a background in Advertising and 9 years in the market, combining strategic creativity with technical execution. I work with companies across Brazil, with a focus on the ${r} region, and I work independently: you talk to me from start to finish, with design and code in a single process. I use AI in my process and review every text before publishing.`,
    ctaTitle: 'Want to talk about <em>your case?</em>',
    ctaText: 'Tell me what you have in mind. I reply directly on WhatsApp.',
    ctaBtn: 'Talk to me',
    empty: 'The first articles are coming soon.',
  },
};

// ── utilidades ──────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// o marked já entrega título e alt escapados; escapa só o que faltar, sem duplicar (&amp;quot;)
const escOnce = (s) => esc(s).replace(/&amp;(quot|amp|lt|gt|#d+);/g, '&$1;');
const stripTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const abs = (p) => (p.startsWith('http') ? p : SITE + p);
const jsonLd = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const groupOf = (publico) => (publico === 'identidade' ? 'identidade' : 'b2b');

function todaySP() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date()); // YYYY-MM-DD
}
function fmtDate(iso, lang) {
  return new Intl.DateTimeFormat(T[lang].dateLocale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(iso + 'T12:00:00Z'));
}
const caseTitle = (slug) => {
  try {
    const m = readFileSync(join(ROOT, `${slug}.html`), 'utf8').match(/<title>([^<]*)<\/title>/i);
    return m ? m[1].replace(/\s*[—|\-–]\s*Padula.*$/i, '').trim() : slug;
  } catch { return slug; }
};

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
        return `<a href="${esc(href)}"${title ? ` title="${escOnce(title)}"` : ''}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
      image(href, title, text) {
        const img = `<img src="${esc(href)}" alt="${escOnce(text)}" loading="lazy" decoding="async">`;
        return title ? `<figure>${img}<figcaption>${escOnce(title)}</figcaption></figure>` : img;
      },
    },
  });
  const html = marked.parse(body);
  return { html, toc, words: stripTags(html).split(/\s+/).filter(Boolean).length };
}

// ── leitura dos arquivos ────────────────────────────────────────────────────
function readPosts() {
  if (!existsSync(SRC)) return [];
  const posts = [];
  for (const file of readdirSync(SRC).filter((f) => f.endsWith('.md') && !f.startsWith('_') && !f.endsWith('.derivados.md')).sort()) {
    const raw = readFileSync(join(SRC, file), 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) throw new Error(`${file}: faltou o bloco de metadados (--- no topo do arquivo)`);
    let fm;
    try { fm = YAML.parse(m[1]) || {}; } catch (e) { throw new Error(`${file}: YAML inválido: ${e.message.split('\n')[0]}`); }
    const body = m[2].trim();
    const lang = fm.idioma || 'pt';
    posts.push({
      file, fm, body, lang,
      status: fm.status || 'rascunho',
      title: String(fm.titulo || ''), slug: String(fm.slug || (fm.titulo ? slugify(String(fm.titulo)) : '')),
      meta: String(fm.meta_description || ''), keyword: String(fm.palavra_chave || ''),
      resposta: String(fm.resposta_curta || '').trim(),
      tipo: fm.tipo, pilar: fm.pilar, publico: fm.publico, funil: fm.funil,
      group: groupOf(fm.publico), cat: fm.publico === 'identidade' ? 'identidade' : 'web',
      caseSlug: fm.case_relacionado ? String(fm.case_relacionado) : '',
      relatedSlugs: Array.isArray(fm.posts_relacionados) ? fm.posts_relacionados.map(String) : [],
      date: String(fm.data_publicacao || ''), updated: String(fm.data_atualizacao || fm.data_publicacao || ''),
      fontes: Array.isArray(fm.fontes) ? fm.fontes : [], faq: Array.isArray(fm.faq) ? fm.faq : [],
      revisao: fm.revisao || {}, par: fm.par ? String(fm.par) : '',
      cover: fm.capa || '', coverAlt: fm.capa_alt || '', coverCredit: fm.capa_credito || '',
      stock: fm.capa_original !== true,
      url: '', minutes: 1, md: null, alt: null, flag: '', errors: [], warnings: [],
    });
  }
  for (const p of posts) { if (T[p.lang]) p.url = `${T[p.lang].base}${p.slug}/`; }
  return posts;
}

// ── validação (contrato da seção 7 + regras das seções 2, 5, 6 e 11) ────────
function validate(p, all) {
  const errors = [];
  const warnings = [];
  const err = (m) => errors.push(m);

  for (const k of ['titulo', 'slug', 'meta_description', 'resposta_curta', 'tipo', 'pilar', 'publico', 'data_publicacao']) {
    if (!p.fm[k]) err(`campo obrigatório ausente: ${k}`);
  }
  if (!STATUS.includes(p.status)) err(`status inválido: ${p.status} (use ${STATUS.join(' | ')})`);
  if (p.tipo && !TIPOS.includes(p.tipo)) err(`tipo inválido: ${p.tipo}`);
  if (p.pilar && !PILARES.includes(p.pilar)) err(`pilar inválido: ${p.pilar}`);
  if (p.publico && !PUBLICOS.includes(p.publico)) err(`publico inválido: ${p.publico}`);
  if (p.funil && !FUNIS.includes(p.funil)) err(`funil inválido: ${p.funil}`);
  if (!T[p.lang]) err(`idioma inválido: ${p.lang} (use pt ou en)`);
  if (p.date && !/^\d{4}-\d{2}-\d{2}$/.test(p.date)) err('data_publicacao deve ser AAAA-MM-DD');
  if (p.updated && !/^\d{4}-\d{2}-\d{2}$/.test(p.updated)) err('data_atualizacao deve ser AAAA-MM-DD');
  if (p.pilar === 'identidade-visual' && p.publico && p.publico !== 'identidade') err('pilar identidade-visual exige publico: identidade');
  if (p.pilar && p.pilar !== 'identidade-visual' && p.publico === 'identidade') err('publico identidade só vale para o pilar identidade-visual');
  if (p.meta && (p.meta.length < 140 || p.meta.length > 160)) err(`meta_description com ${p.meta.length} caracteres (precisa ter de 140 a 160)`);

  // revisão do Matheus (checklist da seção 13)
  for (const k of ['fatos_conferidos', 'numeros_com_fonte', 'sem_travessao_e_sem_cidade', 'sem_valores_de_preco']) {
    if (p.revisao[k] !== true) err(`revisao.${k} não está marcado como true`);
  }
  if (!(p.revisao.cliente_autorizou === true || p.revisao.cliente_autorizou === 'n/a')) err('revisao.cliente_autorizou precisa ser true ou n/a');

  // texto proibido (seções 5 e 7)
  const text = [p.title, p.meta, p.resposta, p.body, ...p.faq.flatMap((f) => [f && f.p, f && f.r]), ...p.fontes.map((f) => f && f.titulo)].filter(Boolean).join('\n');
  if (/[—–]/.test(text)) err('o texto tem travessão (— ou –)');
  for (const t of RULES.termosProibidos) if (new RegExp(reEsc(t), 'i').test(text)) err(`termo proibido no texto: ${t}`);
  for (const c of RULES.cidadesProibidas) {
    if (new RegExp(`(?<![\\p{L}])${reEsc(c)}(?![\\p{L}])`, 'iu').test(text)) err(`nome de cidade no texto: ${c}`);
  }
  if (/vale do para[ií]ba/i.test(text)) err(`"${RULES.regiao}" só pode aparecer no bloco "sobre o autor" (gerado pelo site), não no texto`);

  // dados e fontes
  if (/\d\s?%/.test(text) && !p.fontes.length) err('há número percentual no texto, mas o post não tem fontes');
  p.fontes.forEach((f, i) => { if (!f || !f.titulo || !f.url || !f.data) err(`fontes[${i}] precisa de titulo, url e data`); });

  // FAQ
  p.faq.forEach((f, i) => { if (!f || !f.p || !f.r) err(`faq[${i}] precisa de p e r`); });
  if (RULES.faqObrigatorioEm.includes(p.tipo) && (p.faq.length < 3 || p.faq.length > 4)) err(`tipo ${p.tipo} exige FAQ com 3 a 4 perguntas (tem ${p.faq.length})`);

  // case relacionado (seção 11)
  const C = RULES.cases;
  if (p.caseSlug) {
    if (C.bloqueados.includes(p.caseSlug)) err(`case_relacionado "${p.caseSlug}" está bloqueado`);
    else if (!existsSync(join(ROOT, `${p.caseSlug}.html`))) err(`case_relacionado "${p.caseSlug}" não existe (não há ${p.caseSlug}.html)`);
    else if (!C.livres.includes(p.caseSlug) && !C[p.group].includes(p.caseSlug)) err(`case_relacionado "${p.caseSlug}" é de outro grupo (${p.group === 'b2b' ? 'identidade' : 'B2B'})`);
  } else if (p.tipo !== 'tese') warnings.push('sem case_relacionado (a seção 6 pede um exemplo real com link para o case)');

  // posts relacionados e links internos não cruzam B2B com identidade
  for (const s of p.relatedSlugs) {
    const q = all.find((x) => x.slug === s && x.lang === p.lang);
    if (!q) err(`posts_relacionados: "${s}" não existe em ${p.lang}`);
    else if (q.group !== p.group) err(`posts_relacionados: "${s}" é de outro grupo`);
  }
  for (const m of p.body.matchAll(/\]\((\/[^)\s#?]*)/g)) {
    const path = m[1].replace(/\/$/, '').replace(/\.html$/, '');
    const bl = path.match(/^\/(?:en\/)?blog\/([^/]+)$/);
    if (bl) {
      const q = all.find((x) => x.slug === bl[1]);
      if (!q) err(`link interno para post inexistente: ${m[1]}`);
      else if (q.group !== p.group) err(`link interno cruza B2B com identidade: ${m[1]}`);
      continue;
    }
    const slug = path.slice(1);
    if (C.bloqueados.includes(slug)) err(`link interno para case bloqueado: ${m[1]}`);
    else if ([...C.b2b, ...C.identidade].includes(slug) && !C[p.group].includes(slug)) err(`link interno para case de outro grupo: ${m[1]}`);
  }

  // tamanho (só aviso)
  const words = p.body.split(/\s+/).filter(Boolean).length;
  const range = RULES.tamanhos[p.tipo];
  if (range && (words < range[0] || words > range[1])) warnings.push(`${words} palavras (o tipo ${p.tipo} pede ${range[0]} a ${range[1]})`);

  return { errors, warnings };
}

// ── carrega, valida e decide o que publicar ─────────────────────────────────
function loadPosts() {
  const all = readPosts();
  const today = todaySP();
  const seen = new Set();
  for (const p of all) {
    const k = `${p.lang}/${p.slug}`;
    if (p.slug && seen.has(k)) throw new Error(`slug duplicado em ${p.lang}: ${p.slug}`);
    seen.add(k);
    Object.assign(p, validate(p, all));
  }

  const live = (p) => p.status === 'aprovado' || p.status === 'publicado';
  const failures = all.filter((p) => live(p) && p.errors.length);

  if (ONLY_VALIDATE) {
    for (const p of all) {
      const lines = [...p.errors.map((e) => `   ERRO   ${e}`), ...p.warnings.map((w) => `   aviso  ${w}`)];
      const mark = p.status === 'rascunho' ? '○' : (p.errors.length ? '✗' : '●');
      console.log(`${mark} ${p.file} [${p.status}]${lines.length ? '\n' + lines.join('\n') : ''}`);
    }
    console.log(`\n${all.length} post(s); ${failures.length} aprovado(s) com erro.`);
    process.exit(failures.length ? 1 : 0);
  }
  if (failures.length && !WITH_DRAFTS) {
    console.error('Build do blog interrompido: posts aprovados com erro de validação.\n');
    for (const p of failures) console.error(`✗ ${p.file}\n${p.errors.map((e) => `   ERRO   ${e}`).join('\n')}`);
    process.exit(1);
  }
  if (WITH_DRAFTS) {
    const pend = all.filter((p) => p.errors.length);
    if (pend.length) console.warn(`aviso: ${pend.length} post(s) com pendências de validação (rode "npm run blog:validar" para ver).`);
  }

  const chosen = all.filter((p) => (live(p) && p.date <= today ? !p.errors.length : WITH_DRAFTS));
  for (const p of chosen) {
    p.flag = p.status === 'rascunho' ? 'RASCUNHO' : (p.date > today ? 'AGENDADO' : (p.errors.length ? 'COM ERROS' : ''));
    p.md = renderMarkdown(p.body);
    p.minutes = Math.max(1, Math.round(p.md.words / 200));
  }
  for (const p of chosen) {
    if (p.par) {
      const other = chosen.find((q) => q.lang !== p.lang && q.slug === p.par);
      if (!other) console.warn(`aviso: ${p.file}: "par: ${p.par}" não encontrado (ou ainda não publicado); o post fica sem versão no outro idioma`);
      else p.alt = other;
    }
  }
  for (const p of chosen) if (p.alt && !p.alt.alt) p.alt.alt = p;
  return chosen.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
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
<link rel="stylesheet" href="/components/blog.css?v=3">
<script defer src="https://stats.matheuspadula.com.br/script.js" data-website-id="8c8a8c97-6407-4df7-857e-8631dd3a3922" data-exclude-hash="true" data-domains="matheuspadula.com.br,www.matheuspadula.com.br"></script>
</head>`;
}

function tail(lang, altMap) {
  return `<div id="footer-root"></div>
<script>window.__BLOG = ${JSON.stringify({ lang, alt: altMap })};</script>
<script src="/components/layout.js?v=5"></script>
<script src="/components/blog.js?v=1"></script>
</body>
</html>
`;
}

const cover = (p, size) => {
  const t = T[p.lang];
  if (p.cover) {
    return `<div class="cover cover-${size}${p.stock ? ' cover-stock' : ''}"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt)}"${size === 'hero' ? '' : ' loading="lazy"'} decoding="async"></div>`;
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
    <p class="card-desc">${esc(p.meta)}</p>
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
  const author = {
    '@type': 'Person', name: 'Matheus Padula', url: SITE,
    worksFor: { '@type': 'ProfessionalService', name: 'Padula Design Studio', url: SITE, areaServed: ['Brasil', RULES.regiao] },
  };
  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting',
      headline: p.title, description: p.meta, inLanguage: t.htmlLang,
      ...(p.keyword ? { keywords: p.keyword } : {}),
      datePublished: p.date, dateModified: p.updated, image: abs(ogImage),
      mainEntityOfPage: abs(p.url), author,
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
  if (p.faq.length) {
    ld.push({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
    });
  }

  // relacionados: os escolhidos no frontmatter; senão, os mais próximos do mesmo grupo
  const picked = p.relatedSlugs.map((s) => all.find((q) => q.lang === p.lang && q.slug === s)).filter(Boolean);
  const related = (picked.length ? picked : all
    .filter((q) => q.lang === p.lang && q !== p && q.group === p.group)
    .sort((a, b) => b.date.localeCompare(a.date))).slice(0, 3);

  const tocItems = [...p.md.toc];
  if (p.faq.length) tocItems.push({ id: 'faq', text: t.faq });
  if (p.fontes.length) tocItems.push({ id: 'fontes', text: t.sources });
  const toc = tocItems.length >= 3
    ? `<aside class="toc" aria-label="${t.toc}">
      <details open>
        <summary>${t.toc}</summary>
        <ol>
${tocItems.map((h) => `          <li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('\n')}
        </ol>
      </details>
    </aside>`
    : '';

  const faqHtml = p.faq.length
    ? `<section class="faq" id="faq" aria-labelledby="faq-h">
        <h2 id="faq-h">${t.faq}</h2>
${p.faq.map((f) => `        <details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join('\n')}
      </section>`
    : '';
  const sourcesHtml = p.fontes.length
    ? `<section class="sources" id="fontes" aria-labelledby="fontes-h">
        <h2 id="fontes-h">${t.sources}</h2>
        <ol>
${p.fontes.map((f) => `          <li><a href="${esc(f.url)}" target="_blank" rel="noopener noreferrer">${esc(f.titulo)}</a>, ${esc(f.data)}</li>`).join('\n')}
        </ol>
      </section>`
    : '';
  const caseHtml = p.caseSlug
    ? `<a class="case-card" href="/${p.caseSlug}">
        <span class="case-label">${t.caseLabel}</span>
        <span class="case-name">${esc(caseTitle(p.caseSlug))}</span>
        <span class="case-cta">${t.caseCta} <span aria-hidden="true">↗</span></span>
      </a>`
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

  // o clique passa por /whatsapp para o generate_lead registrar de qual artigo veio o contato
  const cta = `/whatsapp?utm_source=blog&amp;utm_medium=artigo&amp;utm_campaign=blog_${enc(p.slug)}`;

  return `${head({
    lang: p.lang, title: `${p.title} | Padula Design Studio`, desc: p.meta, canonical: p.url, alternates,
    ogImage, ogType: 'article',
    extra: `${p.flag ? '<meta name="robots" content="noindex">\n' : ''}<meta property="article:published_time" content="${p.date}">\n<meta property="article:author" content="Matheus Padula">\n<script type="application/ld+json">\n${jsonLd(ld)}\n</script>\n`,
  })}
<body class="blog-page">
<div id="nav-root"></div>
<main>
  <article class="post">
    <header class="container post-head">
      <nav class="crumbs" aria-label="breadcrumb"><a href="${t.base}">${t.blog}</a><span aria-hidden="true">/</span><span>${esc(t.cats[p.cat])}</span></nav>
      <h1>${esc(p.title)}</h1>
      <div class="answer"><span class="answer-label">${t.answer}</span><p>${esc(p.resposta)}</p></div>
      <div class="byline">
        <img src="/assets/matheus-autor.jpg?v=2" alt="" width="40" height="40">
        <span>${t.by} <b>Matheus Padula</b></span>
        <span class="dot" aria-hidden="true">·</span>
        <time datetime="${p.date}">${fmtDate(p.date, p.lang)}</time>${p.updated !== p.date ? `
        <span class="dot" aria-hidden="true">·</span>
        <span>${t.updated} <time datetime="${p.updated}">${fmtDate(p.updated, p.lang)}</time></span>` : ''}
        <span class="dot" aria-hidden="true">·</span>
        <span>${p.minutes} ${t.min}</span>${p.flag ? `\n        <span class="draft-flag">${p.flag}</span>` : ''}
      </div>
    </header>
    <div class="container">${cover(p, 'hero')}${p.coverCredit ? `<p class="cover-credit">${esc(p.coverCredit)}</p>` : ''}</div>
    <div class="container post-grid${toc ? '' : ' no-toc'}">
      ${toc}
      <div class="prose">
${p.md.html}
      ${faqHtml}
      ${sourcesHtml}
      ${caseHtml}
        ${share}
      </div>
    </div>
    <section class="container cta-block">
      <h2>${t.ctaTitle}</h2>
      <p>${t.ctaText}</p>
      <a class="btn-cta" href="${cta}" data-no-lead>${t.ctaBtn} <span aria-hidden="true">↗</span></a>
    </section>
    <aside class="container author-box" aria-label="${t.authorTitle}">
      <img src="/assets/matheus-autor.jpg?v=2" alt="" width="76" height="76" loading="lazy">
      <div>
        <span class="author-label">${t.authorTitle}</span>
        <b>Matheus Padula</b>
        <p>${esc(t.authorText(RULES.regiao))}</p>
      </div>
    </aside>
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
      <description>${esc(p.meta)}</description>
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
write('sitemap-blog.xml', sitemap(WITH_DRAFTS ? posts.filter((p) => !p.flag) : posts));

const n = (l) => posts.filter((p) => p.lang === l).length;
console.log(`blog: ${posts.length} post(s) (${n('pt')} PT, ${n('en')} EN)${WITH_DRAFTS ? ', incluindo rascunhos/agendados' : ''}`);
