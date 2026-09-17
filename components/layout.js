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

  // Prefixo para links âncora: vazio na home, "/" nas pages filhas
  const base = isHome ? '' : '/';

  // ── NAV ──────────────────────────────────────────────────────────────────
  const navHTML = `
<nav class="nav" id="nav">
  <div class="container row">
    <a href="${base}#top" class="logo"><img src="${isHome ? '' : '../'}assets/logo.png" alt="Padula" style="height:28px;display:block;"></a>
    <div class="nav-links">
      <a href="${base}#portfolio" data-i18n="nav.portfolio">Portfolio</a>
      <a href="${base}#sobre" data-i18n="nav.about">Sobre</a>
      <a href="${base}#contato" data-i18n="nav.contact">Contato</a>
    </div>
    <div class="nav-right">
      <div class="lang" role="tablist">
        <button class="on" data-lang="pt">PT</button>
        <button data-lang="en">EN</button>
      </div>
      <a href="https://wa.me/5512974054956" target="_blank" rel="noopener noreferrer" class="cta-btn">
        <span data-i18n="nav.cta">Falar comigo</span> <span class="arrow">↗</span>
      </a>
      <span class="burger" data-i18n="nav.menu">MENU</span>
    </div>
  </div>
</nav>`;

  // ── FOOTER ────────────────────────────────────────────────────────────────
  const footerHTML = `
<footer>
  <div class="container foot">
    <div data-i18n="ft.by">© 2026 Matheus Padula · Design + Dev por Matheus Padula</div>
    <div class="links">
      <a href="${base}#portfolio" data-i18n="nav.portfolio">Portfolio</a>
      <a href="${base}#sobre" data-i18n="nav.about">Sobre</a>
      <a href="${base}#contato" data-i18n="nav.contact">Contato</a>
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
      const burgerCloseLabel = () => (window.__currentLang === 'en' ? 'CLOSE' : 'FECHAR');
      burger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        navLinks.classList.toggle('open', !isOpen);
        burger.textContent = isOpen ? 'MENU' : burgerCloseLabel();
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
  const CASE_I18N = window.CASE_I18N = {
    pt: {
      'nav.portfolio': 'Portfolio',
      'nav.about': 'Sobre',
      'nav.contact': 'Contato',
      'nav.cta': 'Falar comigo',
      'nav.menu': 'MENU',
      'ft.by': '© 2026 Matheus Padula · Design + Dev por Matheus Padula',
      'case.label.web': 'Case Study — Web Design',
      'case.label.ecommerce': 'Case Study — E-commerce',
      'case.label.branding': 'Case Study — Branding + Web Design',
      'case.client': 'Cliente',
      'case.year': 'Ano',
      'case.scope': 'Escopo',
      'case.stack': 'Stack',
      'case.platform': 'Plataforma',
      'case.partner': 'Parceria',
      'case.live': 'Ver site ao vivo',
      'case.store': 'Ver loja ao vivo',
      'case.next': 'Próximo projeto',
      's01': '01 — O desafio',
      's02': '02 — A solução',
      's03': '03 — Capturas do projeto',
      's04': '04 — O resultado',

      // Agro Ribeiro
      'agro.scope': 'Identidade Visual + Site + LP',
      'agro.caption': 'Visão geral — Homepage Agro Ribeiro',
      'agro.ch.title': 'Vender confiança antes de vender terra',
      'agro.ch.p1': 'A Agro Ribeiro atua na intermediação de fazendas de alto padrão, um mercado onde a decisão de compra envolve valores altos e exige confiança técnica antes de qualquer visita.',
      'agro.ch.p2': 'O desafio foi duplo: criar uma identidade visual e um site que comunicassem seriedade documental e rigor técnico, e construir uma infraestrutura que desse ao cliente autonomia total para publicar novas fazendas no catálogo sem depender de desenvolvedor a cada atualização.',
      'agro.sol.title': 'Identidade de marca sobre uma stack headless de alta performance',
      'agro.sol.tag1': 'Identidade Visual',
      'agro.sol.p1': 'Desenvolvemos a identidade visual completa da marca, com logotipo, paleta e sistema tipográfico, e implementamos o site com Astro como gerador de site estático, entregando performance e SEO otimizados por página pré-renderizada. A gestão do catálogo de fazendas é feita via Sanity, um CMS headless que dá ao cliente um painel dedicado para cadastrar, editar e publicar novas propriedades sem depender de código.',
      'agro.sol.p2': 'A publicação de uma nova fazenda no Sanity dispara automaticamente um pipeline de CI/CD via GitHub Actions, que rebuilda o site estático e publica a nova versão na Hostinger sem intervenção manual. Do clique em "publicar" no CMS ao site atualizado em produção, todo o processo é automatizado.',
      'agro.sol.p3': 'O restante do conteúdo institucional do site, como a seção "O que verificamos", foi desenvolvido diretamente no código, garantindo performance máxima nas páginas fixas do site.',
      'agro.res.title': 'Autonomia de conteúdo com performance de site estático',
      'agro.res.d1': 'Cliente publica novas fazendas direto no CMS sem depender de desenvolvedor',
      'agro.res.d2': 'Deploy automatizado do CMS à produção via CI/CD, sem etapas manuais',
      'agro.res.d3': 'Performance e SEO otimizados por geração estática de página',
      'agro.res.text': 'A stack Astro + Sanity entregou ao cliente uma combinação rara no mercado imobiliário rural: velocidade de carregamento de site estático com a flexibilidade de gestão de um CMS moderno. Cada nova fazenda publicada já nasce otimizada para SEO, e o pipeline de CI/CD elimina qualquer fricção entre a decisão de publicar e o conteúdo estar no ar.',

      // HL Wallwonders
      'hl.scope': 'Desenvolvimento WordPress',
      'hl.caption': 'Visão geral — Homepage HL Wallwonders',
      'hl.ch.title': 'Implementar um projeto internacional com fidelidade total ao design',
      'hl.ch.p1': 'A HL Wallwonders é uma empresa especializada em instalação de papel de parede de luxo na região da Nova Inglaterra, Estados Unidos. O projeto veio através de uma parceria com a Vitrine Digital, agência responsável pela estratégia e pelo layout completo no Figma.',
      'hl.ch.p2': 'O desafio foi transformar esse design em um site institucional real no WordPress, mantendo fidelidade total ao layout entregue, com estrutura de blog e uma base técnica sólida para suportar um trabalho de SEO aprofundado.',
      'hl.sol.title': 'Desenvolvimento fiel ao design, com base técnica para SEO',
      'hl.sol.tag4': 'SEO Técnico',
      'hl.sol.p1': 'Atuando como desenvolvedor no projeto, implementei integralmente o layout definido pela Vitrine Digital no WordPress, com atenção a cada detalhe de espaçamento, tipografia e responsividade definidos no Figma. Foi estruturada uma área de blog completa, permitindo à equipe de marketing publicar conteúdo de forma independente.',
      'hl.sol.p2': 'Paralelamente ao desenvolvimento, foi conduzido um trabalho de SEO técnico completo — estruturação de metadados, hierarquia de headings, performance de carregamento e otimizações on-page — para dar ao site uma base sólida de indexação desde o lançamento.',
      'hl.res.title': 'Site institucional pronto para crescer organicamente',
      'hl.res.d1': 'Fidelidade ao layout entregue pela Vitrine Digital, do Figma à implementação',
      'hl.res.d2': 'Estrutura própria de conteúdo para captação orgânica contínua',
      'hl.res.d3': 'Base técnica otimizada para indexação e crescimento orgânico',
      'hl.res.text': 'O projeto reforçou a capacidade de atuar como peça técnica dentro de fluxos de parceria com agências, entregando um site fiel ao design estratégico definido pela Vitrine Digital, com uma base de SEO pensada para sustentar o crescimento orgânico do negócio nos Estados Unidos.',

      // IHS Advogados
      'ihs.scope': 'Design + Dev',
      'ihs.caption': 'Visão geral — Homepage IHS Advogados',
      'ihs.ch.title': 'Dar credibilidade digital a um escritório sem perder agilidade',
      'ihs.ch.p1': 'O IHS Advogados precisava de um site institucional que comunicasse autoridade jurídica e facilitasse o primeiro contato do cliente, sem depender de uma estrutura pesada para manter no dia a dia.',
      'ihs.ch.p2': 'O desafio foi entregar uma presença digital sólida com um processo de desenvolvimento mais rápido que o modelo tradicional, do briefing à página no ar.',
      'ihs.sol.title': 'Site institucional construído com Claude Code',
      'ihs.sol.tag4': 'Responsivo',
      'ihs.sol.p1': 'A arquitetura de informação foi estruturada em torno das áreas de atuação do escritório, com hierarquia clara entre apresentação institucional, especialidades e canal de contato direto.',
      'ihs.sol.p2': 'Todo o desenvolvimento foi feito com Claude Code, unindo design e implementação em um único fluxo, sem o handoff tradicional entre ferramentas de design e código.',
      'ihs.sol.p3': 'O resultado é um site leve, responsivo e fácil de manter, hoje na fase final de aprovação antes da transferência para o domínio definitivo do cliente.',
      'ihs.res.title': 'Site institucional pronto para aprovação final',
      'ihs.res.n1': 'fluxo',
      'ihs.res.d1': 'Design e desenvolvimento no mesmo fluxo, sem handoff entre ferramentas, usando Claude Code',
      'ihs.res.d2': 'Site responsivo, otimizado para desktop e mobile desde a primeira entrega',
      'ihs.res.n3': 'Fase final',
      'ihs.res.d3': 'Projeto em aprovação, pronto para transferência ao domínio definitivo do cliente',
      'ihs.res.text': 'O novo site do IHS Advogados entrega credibilidade institucional numa experiência rápida de carregar e simples de navegar, com um processo de desenvolvimento mais ágil que o modelo tradicional de design e dev separados.',

      // Menndel & Melo
      'menndel.scope': 'Dev / Framer',
      'menndel.caption': 'Visão geral — Homepage Menndel & Melo',
      'menndel.ch.title': 'Posicionar um escritório como boutique tributária de alto padrão',
      'menndel.ch.p1': 'O Menndel & Melo não é um escritório de advocacia comum. Com atuação nacional e internacional na área tributária, o escritório opera como uma boutique especializada — seleto, técnico e de alta complexidade. O problema: o site anterior comunicava generalismo quando o diferencial é exatamente o oposto.',
      'menndel.ch.p2': 'O desafio foi redesenhar a presença digital para refletir esse posicionamento com precisão: um escritório que atende grandes operações, não qualquer demanda. O site precisava transmitir sofisticação e autoridade técnica para um público exigente de executivos e gestores financeiros.',
      'menndel.sol.title': 'Implementação fiel à identidade de boutique',
      'menndel.sol.tag4': 'Responsivo',
      'menndel.sol.p1': 'O trabalho foi desenvolvido em colaboração com a equipe interna de marketing e design do escritório, que trouxe a direção visual e estratégica. Minha responsabilidade foi a implementação completa no Framer, garantindo que cada detalhe do design fosse traduzido com precisão para o ambiente digital.',
      'menndel.sol.p2': 'A linguagem visual adotada — tipografia refinada, muito espaço negativo e hierarquia clara — foi implementada com atenção a animações de scroll sutis e interações que reforçam a sensação de premium sem recorrer a excessos visuais.',
      'menndel.sol.p3': 'A estrutura do Framer foi organizada com componentes reutilizáveis e CMS ativo, permitindo que a equipe do escritório atualize conteúdo — casos, publicações e team — de forma autônoma, sem depender de dev para cada alteração.',
      'menndel.res.title': 'Presença digital alinhada ao padrão boutique',
      'menndel.res.n1': 'sem',
      'menndel.res.d1': 'Do alinhamento com a equipe ao site publicado e funcionando em produção',
      'menndel.res.d2': 'Editável via CMS do Framer, com autonomia total para a equipe interna do escritório',
      'menndel.res.n3': 'países',
      'menndel.res.d3': 'Atuação nacional e internacional representada com clareza na nova arquitetura do site',
      'menndel.res.text': 'O novo site do Menndel & Melo comunica com precisão o que o escritório é: uma boutique tributária de alto nível, com capacidade técnica para operações complexas em escala nacional e internacional. A implementação no Framer garantiu fidelidade total ao design e flexibilidade para a equipe manter o conteúdo atualizado.',

      // Diálogos Estruturantes
      'dialogos.scope': 'Dev / Framer',
      'dialogos.caption': 'Visão geral — Landing Page Diálogos Estruturantes',
      'dialogos.ch.title': 'Lançar uma nova identidade e um novo posicionamento em poucos dias',
      'dialogos.ch.p1': 'A Diálogos Estruturantes nasceu como uma revista sobre tributação e está migrando para uma plataforma de conexão entre os setores de agro, infraestrutura e portos — reunindo conteúdo, podcast, eventos e networking em um só lugar. Com a nova identidade visual e o novo posicionamento já definidos, faltava um espaço para comunicar essa transição enquanto o site completo da plataforma não ficava pronto.',
      'dialogos.ch.p2': 'O desafio era técnico e de prazo: entregar uma landing page institucional, fiel à nova marca, capaz de captar o interesse do público certo — e publicá-la em poucos dias, sem abrir mão de qualidade visual nem de uma experiência que já refletisse a ambição da nova proposta.',
      'dialogos.sol.title': 'Da wireframe à landing page publicada em dias',
      'dialogos.sol.tag1': 'Wireframe em IA',
      'dialogos.sol.tag4': 'Responsivo',
      'dialogos.sol.p1': 'O processo começou pela estruturação do wireframe direto no Claude, via artefato interativo — definindo hierarquia de conteúdo, blocos e fluxo de leitura antes de qualquer linha de código, o que acelerou a validação com o cliente logo no início.',
      'dialogos.sol.p2': 'A partir dessa base, o desenvolvimento completo — layout visual e programação — foi feito em Framer, aplicando a nova identidade da marca em cada seção: do hero à apresentação dos três setores (agro, infraestrutura e portos) e dos formatos de conteúdo da plataforma.',
      'dialogos.sol.p3': 'O formulário de captura foi codado para entregar o lead diretamente no RD Station do cliente, já preparando a base de contatos antes do lançamento oficial da plataforma completa.',
      'dialogos.res.title': 'Landing page publicada dentro do prazo, já captando leads',
      'dialogos.res.n1': 'dias',
      'dialogos.res.d1': 'Do wireframe estruturado no Claude à landing page publicada e no ar',
      'dialogos.res.d2': 'Captura de lead codada para entregar direto no RD Station do cliente',
      'dialogos.res.n3': 'setores',
      'dialogos.res.d3': 'Arquitetura de conteúdo já preparada para Agro, Infraestrutura e Portos',
      'dialogos.res.text': 'A landing page colocou a nova proposta da Diálogos Estruturantes no ar dentro do prazo apertado do cliente, validando a base de captação antes da chegada do site completo da plataforma — sem comprometer identidade visual nem qualidade de implementação.',

      // Dr. Rafael Nora Resende
      'dr.scope': 'Design + Dev',
      'dr.caption': 'Visão geral — Homepage Dr. Rafael Nora Resende',
      'dr.ch.title': 'Transformar medo de cirurgia em decisão informada',
      'dr.ch.p1': 'Dr. Rafael é cirurgião do aparelho digestivo especializado em videolaparoscopia, técnica minimamente invasiva para hérnia, vesícula, refluxo e cirurgia bariátrica. O desafio foi construir um site que reduzisse o principal obstáculo do paciente antes da consulta: o medo da cirurgia, muitas vezes baseado em informação desatualizada sobre técnicas cirúrgicas.',
      'dr.ch.p2': 'A página precisava funcionar como ferramenta de educação e conversão ao mesmo tempo, guiando o paciente da dúvida até o agendamento com clareza médica e confiança.',
      'dr.sol.title': 'Jornada estruturada da dúvida ao agendamento',
      'dr.sol.tag4': 'Responsivo',
      'dr.sol.p1': 'A estrutura do site segue a lógica da consulta real: primeiro identifica os sintomas com que o paciente já convive, depois explica como a videolaparoscopia muda o cenário (menos dor, recuperação rápida, cicatrizes discretas), detalha o passo a passo do atendimento e reforça com depoimentos e FAQ técnico antes do CTA de agendamento.',
      'dr.sol.p2': 'Todo o desenvolvimento foi feito com Claude Code, permitindo iterar rápido sobre a copy médica e a hierarquia visual sem depender de handoff entre design e implementação.',
      'dr.sol.p3': 'O agendamento acontece via WhatsApp, o canal que esse público já usa no dia a dia, removendo fricção do formulário tradicional de contato.',
      'dr.res.title': 'Site no ar reduzindo a barreira de decisão do paciente',
      'dr.res.n1': 'seções',
      'dr.res.d1': 'Da identificação dos sintomas ao agendamento, cobrindo toda a jornada de decisão do paciente',
      'dr.res.d2': 'Desenvolvido com Claude Code, unindo design e implementação em um único fluxo',
      'dr.res.n3': 'No ar',
      'dr.res.d3': 'Site publicado, 92 de performance e 100 em SEO no PageSpeed',
      'dr.res.text': 'O site do Dr. Rafael está no ar e comunica com clareza técnica e humanidade a proposta da videolaparoscopia, reduzindo o principal obstáculo emocional antes da consulta e direcionando o paciente para o agendamento pelo canal que ele já usa.',

      // Alligators
      'allig.caption': 'Visão geral — Loja Alligators',
      'allig.ch.title': 'Transformar uma identidade esportiva em marca de moda',
      'allig.ch.p1': 'O Brasília Alligators é uma equipe de futebol americano com identidade visual forte e base de fãs consolidada. Seus fundadores decidiram criar uma linha de roupas que traduzia esse universo para o dia a dia — mas a necessidade era ir além de uma loja de merch: construir uma marca de moda com personalidade própria.',
      'allig.ch.p2': 'O desafio foi criar um e-commerce que carregasse a energia da equipe sem ser limitado a ela — uma loja que qualquer pessoa pudesse comprar sem necessariamente ser fã de futebol americano, mas que ainda assim comunicasse atitude, identidade e pertencimento.',
      'allig.sol.title': 'E-commerce com identidade de marca, não de clube',
      'allig.sol.tag3': 'UX de Compra',
      'allig.sol.p1': 'A loja foi estruturada na plataforma Tray com foco em uma jornada de compra fluida: navegação por categoria clara, páginas de produto com hierarquia visual bem definida e checkout sem fricção. Cada decisão de layout priorizou a conversão sem sacrificar a identidade visual.',
      'allig.sol.p2': 'A linguagem visual da loja foi calibrada para comunicar atitude e streetwear — tipografia pesada, paleta que referencia as cores da equipe mas funciona de forma independente, e fotografia de produto como elemento central da experiência.',
      'allig.sol.p3': 'A estrutura da Tray foi customizada para permitir que a equipe gerenciasse estoque, variações de produto e campanhas de forma autônoma, sem depender de suporte técnico para operações do dia a dia.',
      'allig.res.title': 'Loja no ar com identidade de marca independente',
      'allig.res.n1': 'sem',
      'allig.res.d1': 'Do briefing à loja publicada e operando em produção na Tray',
      'allig.res.d2': 'Gestão autônoma de estoque, produtos e campanhas pela equipe da marca',
      'allig.res.n3': 'marca',
      'allig.res.d3': 'Identidade visual que funciona além do universo do futebol americano',
      'allig.res.text': 'A Alligators saiu do campo e entrou no mercado de moda com uma loja que comunica muito além do esporte. A plataforma Tray entregou a estrutura operacional necessária para o time vender, gerenciar e crescer de forma independente desde o primeiro dia.',

      // JHS Studio
      'jhs.scope': 'Desenvolvimento',
      'jhs.caption': 'Visão geral — Homepage JHS Studio',
      'jhs.ch.title': 'Ir além das redes sociais e construir presença digital própria',
      'jhs.ch.p1': 'A JHS Studio é um estúdio de audiovisual com portfólio sólido e reputação construída principalmente pelo boca a boca e pela presença em redes sociais. Apesar da qualidade do trabalho, a empresa não tinha um espaço digital próprio que centralizasse essa produção e apresentasse a marca de forma profissional para novos clientes.',
      'jhs.ch.p2': 'O desafio foi criar um site que funcionasse como vitrine de autoridade — um lugar onde um potencial cliente chegasse, entendesse rapidamente o que o estúdio faz, visse a qualidade do trabalho e tomasse a decisão de entrar em contato. Sem depender do algoritmo de nenhuma rede.',
      'jhs.sol.title': 'Site institucional com portfólio em destaque',
      'jhs.sol.p1': 'O design foi construído para colocar o trabalho do estúdio em primeiro plano. A estrutura visual usa muito contraste e espaço para respirar, criando um ambiente que não compete com os vídeos e fotos exibidos — ele os emoldura.',
      'jhs.sol.p2': 'A arquitetura de informação foi pensada para uma leitura escaneada: quem chega pela primeira vez entende em segundos o que o estúdio faz, quais são os serviços e como entrar em contato. O portfólio é o coração do site, com galeria de projetos organizados por categoria.',
      'jhs.sol.p3': 'O desenvolvimento no WordPress com Elementor entregou um painel de gestão simples para a equipe do estúdio adicionar novos projetos, atualizar serviços e manter o conteúdo em dia sem precisar de suporte técnico.',
      'jhs.res.title': 'Presença digital própria, independente de algoritmo',
      'jhs.res.n1': 'sem',
      'jhs.res.d1': 'Do briefing ao site publicado, com design e desenvolvimento integrados',
      'jhs.res.d2': 'Editável pelo time do estúdio via painel WordPress, sem depender de dev',
      'jhs.res.d3': 'Canal próprio que centraliza portfólio, serviços e contato em um só lugar',
      'jhs.res.text': 'A JHS Studio passou a ter um endereço digital que representa o nível do trabalho que produz. O site funciona como ponto de chegada para indicações e como argumento de credibilidade em propostas — um ativo que cresce junto com o estúdio.',

      // Instituto Oka
      'oka.scope': 'Design + Dev',
      'oka.caption': 'Visão geral — Homepage Instituto Oka',
      'oka.ch.title': 'Organizar 15 anos de atuação ambiental em uma interface clara',
      'oka.ch.p1': 'O Instituto Oka precisava de uma presença digital que refletisse seus mais de 15 anos de experiência e a seriedade de suas ações ambientais, com foco na Serra da Mantiqueira e no Vale do Paraíba.',
      'oka.ch.p2': 'O desafio foi organizar uma vasta gama de atividades — da pesquisa científica ao ecoturismo — em uma interface institucional, educativa e convidativa para doadores e voluntários, equilibrando conteúdo técnico com apelo emocional, e garantindo navegação intuitiva para públicos distintos: cientistas, escolas, turistas e doadores.',
      'oka.sol.title': 'Arquitetura clara para 5 áreas de atuação',
      'oka.sol.tag4': 'Responsivo',
      'oka.sol.p1': 'Em parceria com a designer Amanda, desenvolvemos uma interface com paleta inspirada na natureza e foco total em legibilidade. A navegação guia o usuário pelas 5 áreas de atuação do instituto — Educação, Ciência Cidadã, Pesquisa, Gestão e Ecoturismo — com divisão clara entre "O Que Fazemos" e "Onde Atuamos".',
      'oka.sol.p2': 'Criamos seções de engajamento com CTAs distintos para doadores e voluntários, e priorizamos a experiência mobile para viabilizar acesso em campo e em visitas às áreas protegidas.',
      'oka.res.title': 'Presença digital que reflete a credibilidade do instituto',
      'oka.res.n1': 'áreas',
      'oka.res.d1': 'Áreas de atuação organizadas com clareza: Educação, Ciência Cidadã, Pesquisa, Gestão e Ecoturismo',
      'oka.res.d2': 'Mobile-first, viabilizando acesso em campo e em visitas às áreas protegidas',
      'oka.res.n3': 'públicos',
      'oka.res.d3': 'Públicos-alvo atendidos com jornadas e CTAs distintos — doadores e voluntários',
      'oka.res.text': 'O novo design trouxe maior credibilidade institucional e facilitou o acesso às informações sobre conservação. A organização dos projetos por regiões e atividades permitiu que parceiros em potencial compreendessem rapidamente o escopo do Instituto.',

      // Essent.IA
      'ess.scope': 'Design + Dev',
      'ess.caption': 'Visão geral — Homepage Essent.IA',
      'ess.ch.title': 'Traduzir IA complexa em confiança imediata',
      'ess.ch.p1': 'A Essent.IA entrega soluções de automação inteligente para empresas que querem escalar via dados. O problema: quanto mais sofisticada a tecnologia, mais difícil é comunicá-la para decisores que precisam confiar antes de contratar.',
      'ess.ch.p2': 'O desafio central foi construir um site institucional que transmitisse autoridade técnica sem afastar o público de negócio, equilibrando densidade de informação com clareza de proposta de valor.',
      'ess.sol.title': 'Arquitetura focada em conversão',
      'ess.sol.p1': 'A estrutura de navegação foi desenhada para guiar dois perfis distintos: o gestor que quer entender o serviço rapidamente, e o técnico que precisa de profundidade. Cada seção tem uma hierarquia de informação deliberada.',
      'ess.sol.p2': 'A paleta dark com acentos de cor foi escolhida para sinalizar tecnologia de ponta sem cair em clichês de startup. A tipografia combina um display geométrico para títulos com uma sans-serif de alta legibilidade para corpo de texto, criando contraste sem ruído.',
      'ess.sol.p3': 'O desenvolvimento foi feito inteiramente no Framer, aproveitando animações de scroll e interações nativas para dar sensação de produto premium sem comprometer o desempenho.',
      'ess.res.title': 'Site no ar em 3 semanas, pronto para escalar',
      'ess.res.n1': 'sem',
      'ess.res.d1': 'Do briefing ao site publicado, com design e desenvolvimento integrados',
      'ess.res.d2': 'Desenvolvido no Framer com CMS ativo, permitindo atualizações sem depender de dev',
      'ess.res.n3': 'perfis',
      'ess.res.d3': 'Arquitetura que serve simultaneamente o decisor de negócio e o perfil técnico',
      'ess.res.text': 'O site entregou uma presença digital que reflete a sofisticação da Essent.IA sem sacrificar clareza. O fluxo de informação reduz atrito para conversão, e a estrutura em Framer permite que o time atualize conteúdo de forma autônoma.',

      // Identity case pages — shared
      'case.label.identity': 'Case Study — Identidade Visual',
      's02id': '02 — O conceito',
      's03id': '03 — A marca',
      's04pal': '04 — Paleta de cores',
      's05typ': '05 — Tipografia',
      's06app': '06 — Aplicações',
      's07res': '07 — O resultado',
      'id.logo.title': 'Logotipo e variações',
      'id.apps.title': 'A marca em contexto real',
      'id.tag.identity': 'Identidade Visual',

      // Blended
      'blended.ch.title': 'Uma assessoria de marketing precisa parecer o que vende',
      'blended.ch.p1': 'A Blended entrega estratégia, marca e resultado para seus clientes — mas antes de vender isso para o mercado, precisava de uma identidade que provasse na prática o que promete entregar.',
      'blended.ch.p2': 'O desafio foi criar uma marca acolhedora e ao mesmo tempo premium, que transmitisse confiança sem cair em um tom corporativo frio — alinhada aos quatro pilares definidos para a marca: acolhedora, confiável, premium e humanizada.',
      'blended.co.title': 'Blended vira forma',
      'blended.co.p1': 'O lettering serifado nasce do encontro entre as letras: elas se tocam, se fundem e formam uma assinatura proprietária. Um símbolo que traduz, na própria construção tipográfica, a essência do trabalho da Blended — unir estratégia, marca e resultado em uma só direção.',
      'blended.co.p2': 'A paleta terracota e os tons terrosos reforçam o lado acolhedor e humano da marca, enquanto a tipografia editorial (Bevenida) equilibra peso e sofisticação nos títulos.',
      'blended.pal.title': 'Terracota, terra e tons de apoio',
      'blended.typ.title': 'Peso editorial e clareza geométrica',
      'blended.res.title': 'Uma marca que já parece o que promete',
      'blended.res.d1': 'Versões de logotipo cobrindo aplicações claras, escuras e monocromáticas',
      'blended.res.d2': 'Sistema cromático completo, de primárias a cores de apoio pontual',
      'blended.res.d3': 'Papelaria, redes sociais e materiais impressos com identidade consistente',
      'blended.res.text': 'A Blended ganhou uma identidade que traduz na prática o que vende para seus clientes: estratégia, marca e resultado em uma só direção, aplicada com consistência do cartão de visita ao Instagram.',
      'blended.logo.1': 'Principal — colorido',
      'blended.logo.2': 'Sobre fundo escuro',
      'blended.logo.3': 'Redução — colorido',
      'blended.logo.4': 'Redução — sobre escuro',

      // Alpha Valle
      'alpha.ch.title': 'Nascer como referência em um mercado tradicional',
      'alpha.ch.p1': 'Fundada em 2025, a Alpha Valle chegou ao mercado imobiliário do Vale do Paraíba e da Mantiqueira para romper padrões e redefinir a experiência de comprar e investir em imóveis na região.',
      'alpha.ch.p2': 'O desafio foi construir, desde o primeiro dia, uma identidade que já comunicasse solidez e inovação — sem o histórico de mercado que competidores mais antigos têm a favor.',
      'alpha.co.title': 'Prédio, sombra e as iniciais da marca em um só símbolo',
      'alpha.co.p1': 'O símbolo central é uma composição geométrica que representa, simultaneamente, um prédio e sua sombra — remetendo à construção civil e à verticalização de empreendimentos modernos — e as letras "A" e "V", iniciais de Alpha e Valle.',
      'alpha.co.p2': 'A sobreposição e a interseção das formas transmitem a integração de diferentes áreas de atuação, além de sugerir movimento, inovação e crescimento contínuo — reflexo da visão de futuro da empresa.',
      'alpha.pal.title': 'Verde, azul e neutros — natureza e urbanismo',
      'alpha.typ.title': 'Três famílias para cada nível de hierarquia',
      'alpha.res.title': 'Uma marca pronta para liderar desde o lançamento',
      'alpha.res.d1': 'Versões de marca cobrindo aplicações sobre fundo claro, escuro e isolado',
      'alpha.res.d2': 'Sistema tipográfico hierárquico para títulos, corpo e materiais digitais',
      'alpha.res.d3': 'Identidade construída para liderar o mercado imobiliário do Vale do Paraíba e Mantiqueira',
      'alpha.res.text': 'A Alpha Valle entrou no mercado com uma identidade que já comunica solidez, modernidade e conexão com a região — pronta para aplicação em anúncios, papelaria e materiais de venda desde o primeiro empreendimento divulgado.',
      'alpha.logo.1': 'Horizontal — colorido',
      'alpha.logo.2': 'Sobre fundo escuro',
      'alpha.logo.3': 'Vertical',

      // Amanda Mársico
      'amanda.ch.title': 'Traduzir sofisticação e cuidado em uma marca de saúde',
      'amanda.ch.p1': 'Amanda Mársico é cirurgiã-dentista em Cruzeiro-SP, com estilo sofisticado e minimalista, atuação em clínica geral, ortodontia, odontologia estética e harmonização facial — além de trabalho voluntário na Amazônia.',
      'amanda.ch.p2': 'O desafio foi criar uma identidade que equilibrasse a delicadeza e a docilidade da profissional com a confiança técnica que a área da saúde exige, sem cair em clichês do setor odontológico.',
      'amanda.co.title': 'Diamante, dente e as iniciais do nome',
      'amanda.co.p1': 'O símbolo da marca é baseado em quatro elementos sobrepostos: um diamante, que representa a preciosidade do cuidado da Amanda com seus pacientes; a letra "A", inicial de Amanda; a letra "M", inicial de Mársico; e uma malha 3D que desenha a silhueta de um dente e remete à tecnologia usada em seus procedimentos.',
      'amanda.co.p2': 'Os tons de azul comunicam cuidado, higiene e modernidade, enquanto o rosa funciona como contraponto, trazendo a docilidade e a delicadeza da marca.',
      'amanda.pal.title': 'Azul e rosa — cuidado com um toque de delicadeza',
      'amanda.typ.title': 'Docilidade, elegância e modernidade',
      'amanda.res.title': 'Uma marca de saúde com personalidade própria',
      'amanda.res.d1': 'Versões de logotipo para horizontal, vertical, selo e negativo',
      'amanda.res.d2': 'Paleta enxuta e memorável, fácil de aplicar em qualquer material',
      'amanda.res.d3': 'Padrão gráfico próprio para uso em ambientes e materiais de apoio',
      'amanda.res.text': 'A identidade da Drª Amanda Mársico une delicadeza e confiança técnica — do letreiro na recepção do consultório ao aplicativo de agendamento, comunicando com consistência o cuidado que é a marca registrada do seu atendimento.',
      'amanda.logo.1': 'Principal — colorido',
      'amanda.logo.2': 'Negativo — sobre escuro',
      'amanda.logo.3': 'Versão vertical',
      'amanda.logo.4': 'Selo',

      // Rio Advocacia
      'rio.ch.title': 'Traduzir 13 anos de experiência em prestígio visual',
      'rio.ch.p1': 'Com mais de 13 anos de atuação em Direito Cível, o advogado Raphael Rio construiu uma trajetória sólida em casos complexos, formado pelo UNISAL e pós-graduado em Direito Tributário.',
      'rio.ch.p2': 'O desafio foi criar uma marca própria — a Rio Advocacia — que comunicasse sofisticação e confiança à altura dessa experiência, com uma identidade moderna e versátil para diferentes materiais de comunicação.',
      'rio.co.title': '"R" e "O" se unem para formar "RIO"',
      'rio.co.p1': 'A união das letras "R" e "O" forma a palavra "RIO", simbolizando fluidez e estabilidade. A geometria minimalista do "R" reflete uma abordagem moderna, enquanto o "O" circular sugere integridade e completude.',
      'rio.co.p2': 'A escolha do dourado sobre fundo escuro acrescenta sofisticação e prestígio, evocando confiança e profissionalismo — qualidades centrais para a atuação jurídica.',
      'rio.pal.title': 'Dourado, azul-escuro e bege',
      'rio.typ.title': 'Modernidade com a formalidade do setor jurídico',
      'rio.res.title': 'Uma marca própria à altura da experiência',
      'rio.res.d1': 'De experiência em Direito Cível agora representados por uma marca própria',
      'rio.res.d2': 'Versões de logotipo para aplicações claras, bege e escuras',
      'rio.res.d3': 'Sistema visual completo, de papelaria a sinalização de fachada',
      'rio.res.text': 'A Rio Advocacia ganhou uma identidade que comunica sofisticação e confiança à primeira vista — presente na fachada do escritório, na papelaria e em cada peça de comunicação com clientes.',
      'rio.logo.1': 'Sobre claro',
      'rio.logo.2': 'Sobre bege',
      'rio.logo.3': 'Sobre escuro',

      // Barbosa Advogados
      'barbosa.ch.title': 'Modernizar quase vinte anos de tradição sem perder identidade',
      'barbosa.ch.p1': 'Fundado há quase vinte anos pelo Dr. Júnior Barbosa, o escritório Barbosa Advogados atua nas áreas Cível, Previdenciária, Regularização Imobiliária, Recuperação de Créditos, Trabalhista e Holding, com atendimento individualizado para empresários e trabalhadores.',
      'barbosa.ch.p2': 'O desafio foi atualizar a marca para um ambiente mais competitivo, tornando-a mais sofisticada e flexível sem romper com a tradição que o escritório construiu ao longo de quase duas décadas.',
      'barbosa.co.title': 'Tradição aliada à modernidade',
      'barbosa.co.tag1': 'Rebranding',
      'barbosa.co.p1': 'O novo design é mais limpo e moderno, com formas geométricas que transmitem clareza e organização. O laranja traz vivacidade e dinamismo, enquanto o azul escuro reflete a confiança e a seriedade que os clientes esperam do escritório.',
      'barbosa.co.p2': 'Essa renovação reforça o compromisso do Barbosa Advogados em evoluir e se adaptar às necessidades contemporâneas, mantendo-se à frente no mercado jurídico.',
      'barbosa.pal.title': 'Azul, laranja e bege',
      'barbosa.typ.title': 'Clareza técnica com toque editorial',
      'barbosa.res.title': 'Tradição renovada para um mercado competitivo',
      'barbosa.res.d1': 'De tradição do escritório agora representados por uma marca atualizada',
      'barbosa.res.d2': 'De atuação jurídica unificadas sob uma identidade visual consistente',
      'barbosa.res.d3': 'Versões de logotipo para aplicações claras, escuras e monocromáticas',
      'barbosa.res.text': 'O Barbosa Advogados renovou sua imagem sem perder a tradição construída ao longo de quase vinte anos — uma marca mais limpa e moderna, pronta para papelaria, brindes e materiais de comunicação do dia a dia do escritório.',
      'barbosa.logo.1': 'Sobre claro',
      'barbosa.logo.2': 'Sobre escuro',
      'barbosa.logo.3': 'Monocromática',

      // Fire Art
      'fireart.ch.title': 'Dar cara a uma galeria que só existe online',
      'fireart.ch.p1': 'A Fire Art é uma galeria de arte online que funciona como plataforma, unindo consumidores de arte a artistas independentes. Sem espaço físico, a marca precisava comunicar exclusividade de conteúdo, qualidade de atendimento e valorização do artista só através da experiência digital.',
      'fireart.ch.p2': 'O desafio foi criar uma identidade minimalista e versátil o suficiente para se adaptar a um ambiente 100% digital, sem perder personalidade.',
      'fireart.co.title': 'Uma chama escondida dentro do "a"',
      'fireart.co.p1': 'O conceito visual é baseado na própria tipografia do nome da marca: ligaduras em algumas letras trazem a ideia de fluidez, já que a marca é pautada no ambiente digital e precisa se adaptar facilmente a mudanças.',
      'fireart.co.p2': 'Dentro da letra "a" de "art" mora uma chama, representando o primeiro nome da marca — "Fire" — e funcionando como símbolo isolado para aplicações reduzidas, como favicon e redes sociais.',
      'fireart.pal.title': 'Laranja vivo, chumbo e branco',
      'fireart.typ.title': 'Minimalismo com exclusividade',
      'fireart.res.title': 'Uma marca 100% digital com personalidade própria',
      'fireart.res.d1': 'Versões de logotipo para aplicações claras, escuras e reduzidas',
      'fireart.res.d2': 'Paleta enxuta que reforça o minimalismo e a exclusividade da marca',
      'fireart.res.d3': 'Padrão gráfico próprio a partir da repetição do símbolo da chama',
      'fireart.res.text': 'A Fire Art ganhou uma identidade fluida e minimalista que funciona inteiramente no ambiente digital — do ícone reduzido na barra de navegação às embalagens das obras vendidas, comunicando exclusividade em cada ponto de contato com o colecionador.',
      'fireart.logo.1': 'Principal',
      'fireart.logo.2': 'Negativo — sobre escuro',
      'fireart.logo.3': 'Redução — colorido',
      'fireart.logo.4': 'Redução — sobre escuro',

      // Agro Ribeiro — Identidade Visual
      'agro2.caption': 'Placa de entrada — aplicação em metal e madeira',
      'agro2.ch.title': 'Vender terra exige parecer perito, não corretor',
      'agro2.ch.p1': 'A Agro Ribeiro atua na negociação de fazendas de alto padrão — um mercado em que a decisão de compra passa por histórico, documentação e avaliação técnica antes de qualquer visita ao terreno.',
      'agro2.ch.p2': 'O desafio foi construir uma identidade que comunicasse os quatro pilares da marca — confiança, sofisticação, precisão e herança — sem depender de clichês visuais do agronegócio.',
      'agro2.co.title': 'Um selo, não um logotipo',
      'agro2.co.p1': 'O símbolo é uma moldura oval que funciona como marca de autenticidade e precisão — a mesma lógica de um carimbo ou brasão. Dentro dela, uma espiga estilizada nasce de um único ponto, com folhas douradas se abrindo; na base, uma linha em creme representa o relevo do terreno.',
      'agro2.co.p2': 'O resultado é reconhecível mesmo isolado — como ícone de aplicativo, carimbo em couro ou bordado —, ancorando a marca no território em vez de recorrer a um ícone genérico de agronegócio.',
      'agro2.pal.title': 'Verde-floresta, dourado, off-white e grafite',
      'agro2.typ.title': 'Serifa editorial com apoio grotesco contemporâneo',
      'agro2.res.title': 'Um selo de autenticidade em cada ponto de contato',
      'agro2.res.d1': 'Versões de logotipo cobrindo claro, escuro, verde e selo isolado',
      'agro2.res.d2': 'Cores fixas definidas, com paleta de apoio para gráficos e materiais',
      'agro2.res.d3': 'De papelaria a bordado, couro e sinalização — o mesmo selo em cada superfície',
      'agro2.res.text': 'A Agro Ribeiro ganhou um manual de marca que funciona como referência única para qualquer fornecedor — gráfica, bordadeira ou comunicação visual — garantindo que o selo de autenticidade da marca chegue idêntico a cada ponto de contato com o cliente.',
      'agro2.logo.1': 'Principal — sobre claro',
      'agro2.logo.2': 'Off-white — sobre escuro',
      'agro2.logo.3': 'Dourada — sobre verde',
      'agro2.logo.4': 'Selo isolado',
    },
    en: {
      'nav.portfolio': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.cta': 'Talk to me',
      'nav.menu': 'MENU',
      'ft.by': '© 2026 Matheus Padula · Design + Dev by Matheus Padula',
      'case.label.web': 'Case Study — Web Design',
      'case.label.ecommerce': 'Case Study — E-commerce',
      'case.label.branding': 'Case Study — Branding + Web Design',
      'case.client': 'Client',
      'case.year': 'Year',
      'case.scope': 'Scope',
      'case.stack': 'Stack',
      'case.platform': 'Platform',
      'case.partner': 'Partnership',
      'case.live': 'View live site',
      'case.store': 'View live store',
      'case.next': 'Next project',
      's01': '01 — The challenge',
      's02': '02 — The solution',
      's03': '03 — Project screenshots',
      's04': '04 — The result',

      // Agro Ribeiro
      'agro.scope': 'Visual Identity + Website + LP',
      'agro.caption': 'Overview — Agro Ribeiro homepage',
      'agro.ch.title': 'Selling trust before selling land',
      'agro.ch.p1': 'Agro Ribeiro works as an intermediary for high-end farm properties, a market where the purchase decision involves large sums and requires technical trust before any visit.',
      'agro.ch.p2': 'The challenge was twofold: create a visual identity and website that communicated documental seriousness and technical rigor, and build an infrastructure that gave the client full autonomy to publish new farms to the catalog without depending on a developer for every update.',
      'agro.sol.title': 'A brand identity built on a high-performance headless stack',
      'agro.sol.tag1': 'Visual Identity',
      'agro.sol.p1': 'We developed the brand\'s complete visual identity — logo, palette and typographic system — and built the site with Astro as a static site generator, delivering optimized performance and SEO through pre-rendered pages. The farm catalog is managed via Sanity, a headless CMS that gives the client a dedicated panel to register, edit and publish new properties without touching code.',
      'agro.sol.p2': 'Publishing a new farm in Sanity automatically triggers a CI/CD pipeline via GitHub Actions, which rebuilds the static site and publishes the new version on Hostinger with no manual intervention. From clicking "publish" in the CMS to the updated site going live, the whole process is automated.',
      'agro.sol.p3': 'The rest of the site\'s institutional content, like the "What we verify" section, was built directly in code, ensuring maximum performance on the site\'s fixed pages.',
      'agro.res.title': 'Content autonomy with static-site performance',
      'agro.res.d1': 'Client publishes new farms directly in the CMS without depending on a developer',
      'agro.res.d2': 'Automated deploy from CMS to production via CI/CD, with no manual steps',
      'agro.res.d3': 'Performance and SEO optimized through static page generation',
      'agro.res.text': 'The Astro + Sanity stack delivered the client a rare combination in the rural real estate market: static-site loading speed with the management flexibility of a modern CMS. Every new farm published is already SEO-optimized, and the CI/CD pipeline eliminates any friction between the decision to publish and the content going live.',

      // HL Wallwonders
      'hl.scope': 'WordPress Development',
      'hl.caption': 'Overview — HL Wallwonders homepage',
      'hl.ch.title': 'Implementing an international project with full fidelity to the design',
      'hl.ch.p1': 'HL Wallwonders is a company specialized in luxury wallpaper installation in the New England region of the United States. The project came through a partnership with Vitrine Digital, the agency responsible for the strategy and the complete layout in Figma.',
      'hl.ch.p2': 'The challenge was to turn that design into a real institutional WordPress site, keeping full fidelity to the delivered layout, with a blog structure and a solid technical foundation to support in-depth SEO work.',
      'hl.sol.title': 'Development faithful to the design, with a technical foundation for SEO',
      'hl.sol.tag4': 'Technical SEO',
      'hl.sol.p1': 'Working as the developer on the project, I fully implemented the layout defined by Vitrine Digital in WordPress, paying attention to every detail of spacing, typography and responsiveness defined in Figma. A complete blog area was structured, allowing the marketing team to publish content independently.',
      'hl.sol.p2': 'Alongside development, a full technical SEO effort was carried out — metadata structuring, heading hierarchy, load performance and on-page optimizations — to give the site a solid indexing foundation from launch.',
      'hl.res.title': 'Institutional site ready to grow organically',
      'hl.res.d1': 'Fidelity to the layout delivered by Vitrine Digital, from Figma to implementation',
      'hl.res.d2': 'In-house content structure for continuous organic acquisition',
      'hl.res.d3': 'Technical foundation optimized for indexing and organic growth',
      'hl.res.text': 'The project reinforced the ability to act as a technical piece within agency-partnership workflows, delivering a site faithful to the strategic design defined by Vitrine Digital, with an SEO foundation built to sustain the business\'s organic growth in the United States.',

      // IHS Advogados
      'ihs.scope': 'Design + Dev',
      'ihs.caption': 'Overview — IHS Advogados homepage',
      'ihs.ch.title': 'Giving a law firm digital credibility without losing agility',
      'ihs.ch.p1': 'IHS Advogados needed an institutional website that communicated legal authority and made the client\'s first contact easier, without depending on a heavy structure to maintain day to day.',
      'ihs.ch.p2': 'The challenge was to deliver a solid digital presence with a faster development process than the traditional model, from briefing to live page.',
      'ihs.sol.title': 'Institutional site built with Claude Code',
      'ihs.sol.tag4': 'Responsive',
      'ihs.sol.p1': 'The information architecture was structured around the firm\'s practice areas, with a clear hierarchy between institutional presentation, specialties and a direct contact channel.',
      'ihs.sol.p2': 'The entire build was done with Claude Code, joining design and implementation into a single flow, without the traditional handoff between design and code tools.',
      'ihs.sol.p3': 'The result is a lightweight, responsive, easy-to-maintain site, now in its final approval stage before transfer to the client\'s definitive domain.',
      'ihs.res.title': 'Institutional site ready for final approval',
      'ihs.res.n1': 'flow',
      'ihs.res.d1': 'Design and development in the same flow, no handoff between tools, using Claude Code',
      'ihs.res.d2': 'Responsive site, optimized for desktop and mobile from the first delivery',
      'ihs.res.n3': 'Final stage',
      'ihs.res.d3': 'Project in approval, ready for transfer to the client\'s definitive domain',
      'ihs.res.text': 'The new IHS Advogados site delivers institutional credibility in an experience that\'s fast to load and simple to navigate, with a development process more agile than the traditional separate design-and-dev model.',

      // Menndel & Melo
      'menndel.scope': 'Dev / Framer',
      'menndel.caption': 'Overview — Menndel & Melo homepage',
      'menndel.ch.title': 'Positioning a law firm as a high-end tax boutique',
      'menndel.ch.p1': 'Menndel & Melo is not an ordinary law firm. With national and international reach in tax law, the firm operates like a specialized boutique — select, technical and highly complex. The problem: the previous site communicated generality when the differentiator is exactly the opposite.',
      'menndel.ch.p2': 'The challenge was to redesign the digital presence to reflect that positioning precisely: a firm that serves large operations, not just any demand. The site needed to convey sophistication and technical authority to a demanding audience of executives and financial managers.',
      'menndel.sol.title': 'Implementation faithful to the boutique identity',
      'menndel.sol.tag4': 'Responsive',
      'menndel.sol.p1': 'The work was developed in collaboration with the firm\'s in-house marketing and design team, who brought the visual and strategic direction. My responsibility was the full implementation in Framer, making sure every design detail was translated precisely into the digital environment.',
      'menndel.sol.p2': 'The visual language adopted — refined typography, generous negative space and clear hierarchy — was implemented with attention to subtle scroll animations and interactions that reinforce the premium feel without visual excess.',
      'menndel.sol.p3': 'The Framer structure was organized with reusable components and an active CMS, letting the firm\'s team update content — cases, publications and team — autonomously, without depending on a developer for every change.',
      'menndel.res.title': 'Digital presence aligned with the boutique standard',
      'menndel.res.n1': 'weeks',
      'menndel.res.d1': 'From team alignment to the site published and running in production',
      'menndel.res.d2': 'Editable via Framer\'s CMS, with full autonomy for the firm\'s in-house team',
      'menndel.res.n3': 'countries',
      'menndel.res.d3': 'National and international reach clearly represented in the new site architecture',
      'menndel.res.text': 'The new Menndel & Melo site communicates precisely what the firm is: a high-level tax boutique, with the technical capacity for complex operations at national and international scale. The Framer implementation guaranteed full fidelity to the design and the flexibility for the team to keep content up to date.',

      // Diálogos Estruturantes
      'dialogos.scope': 'Development / Framer',
      'dialogos.caption': 'Overview — Diálogos Estruturantes landing page',
      'dialogos.ch.title': 'Launching a new identity and positioning in just a few days',
      'dialogos.ch.p1': 'Diálogos Estruturantes started as a magazine about tax policy and is evolving into a platform connecting the agribusiness, infrastructure and ports sectors — bringing together content, a podcast, events and networking in one place. With the new visual identity and positioning already defined, the brand needed a page to communicate that shift while the full platform site was still in progress.',
      'dialogos.ch.p2': 'The challenge was both technical and time-sensitive: deliver an institutional landing page, faithful to the new brand, capable of capturing interest from the right audience — and publish it within a few days, without compromising visual quality or an experience that already reflected the ambition of the new positioning.',
      'dialogos.sol.title': 'From wireframe to published landing page in days',
      'dialogos.sol.tag1': 'AI Wireframe',
      'dialogos.sol.tag4': 'Responsive',
      'dialogos.sol.p1': 'The process started by structuring the wireframe directly in Claude, via an interactive artifact — defining content hierarchy, blocks and reading flow before writing any code, which sped up client validation from the very start.',
      'dialogos.sol.p2': 'From that foundation, full development — visual layout and coding — was done in Framer, applying the new brand identity across every section: from the hero to the presentation of the three sectors (agribusiness, infrastructure and ports) and the platform\'s content formats.',
      'dialogos.sol.p3': 'The capture form was coded to deliver the lead directly into the client\'s RD Station, already building the contact base ahead of the full platform\'s official launch.',
      'dialogos.res.title': 'Landing page published on time, already capturing leads',
      'dialogos.res.n1': 'days',
      'dialogos.res.d1': 'From the wireframe structured in Claude to the landing page published and live',
      'dialogos.res.d2': 'Lead capture coded to deliver straight into the client\'s RD Station',
      'dialogos.res.n3': 'sectors',
      'dialogos.res.d3': 'Content architecture already set up for Agribusiness, Infrastructure and Ports',
      'dialogos.res.text': 'The landing page put Diálogos Estruturantes\' new positioning live within the client\'s tight deadline, validating the lead capture base ahead of the full platform site — without compromising visual identity or implementation quality.',

      // Dr. Rafael Nora Resende
      'dr.scope': 'Design + Dev',
      'dr.caption': 'Overview — Dr. Rafael Nora Resende homepage',
      'dr.ch.title': 'Turning fear of surgery into an informed decision',
      'dr.ch.p1': 'Dr. Rafael is a digestive-system surgeon specialized in laparoscopic surgery, a minimally invasive technique for hernia, gallbladder, reflux and bariatric surgery. The challenge was to build a site that reduced the patient\'s main obstacle before the consultation: fear of surgery, often based on outdated information about surgical techniques.',
      'dr.ch.p2': 'The page needed to work as an education and conversion tool at the same time, guiding the patient from doubt to booking with medical clarity and confidence.',
      'dr.sol.title': 'A structured journey from doubt to booking',
      'dr.sol.tag4': 'Responsive',
      'dr.sol.p1': 'The site structure follows the logic of a real consultation: it first identifies the symptoms the patient already lives with, then explains how laparoscopic surgery changes the picture (less pain, fast recovery, discreet scars), details the step-by-step of care, and reinforces it with testimonials and a technical FAQ before the booking CTA.',
      'dr.sol.p2': 'The entire build was done with Claude Code, allowing fast iteration on the medical copy and visual hierarchy without depending on a handoff between design and implementation.',
      'dr.sol.p3': 'Booking happens via WhatsApp, the channel this audience already uses daily, removing friction from the traditional contact form.',
      'dr.res.title': 'Site live, reducing the patient\'s decision barrier',
      'dr.res.n1': 'sections',
      'dr.res.d1': 'From identifying symptoms to booking, covering the patient\'s full decision journey',
      'dr.res.d2': 'Built with Claude Code, joining design and implementation into a single flow',
      'dr.res.n3': 'Live',
      'dr.res.d3': 'Site published, 92 performance and 100 SEO on PageSpeed',
      'dr.res.text': 'Dr. Rafael\'s site is live and communicates the laparoscopic surgery proposal with technical clarity and humanity, reducing the main emotional obstacle before the consultation and directing the patient to book through the channel they already use.',

      // Alligators
      'allig.caption': 'Overview — Alligators store',
      'allig.ch.title': 'Turning a sports identity into a fashion brand',
      'allig.ch.p1': 'Brasília Alligators is an American football team with a strong visual identity and an established fan base. Its founders decided to create a clothing line that translated that world into everyday life — but the need went beyond a merch store: building a fashion brand with its own personality.',
      'allig.ch.p2': 'The challenge was to create an ecommerce that carried the team\'s energy without being limited by it — a store anyone could shop at without necessarily being an American football fan, while still communicating attitude, identity and belonging.',
      'allig.sol.title': 'Ecommerce with a brand identity, not a club identity',
      'allig.sol.tag3': 'Shopping UX',
      'allig.sol.p1': 'The store was built on the Tray platform with a focus on a smooth shopping journey: clear category navigation, product pages with well-defined visual hierarchy, and frictionless checkout. Every layout decision prioritized conversion without sacrificing visual identity.',
      'allig.sol.p2': 'The store\'s visual language was calibrated to communicate attitude and streetwear — bold typography, a palette that references the team\'s colors but works independently, and product photography as the central element of the experience.',
      'allig.sol.p3': 'The Tray setup was customized to let the team manage inventory, product variations and campaigns autonomously, without depending on technical support for day-to-day operations.',
      'allig.res.title': 'Store live with an independent brand identity',
      'allig.res.n1': 'weeks',
      'allig.res.d1': 'From briefing to the store published and running in production on Tray',
      'allig.res.d2': 'Autonomous management of inventory, products and campaigns by the brand\'s team',
      'allig.res.n3': 'brand',
      'allig.res.d3': 'Visual identity that works beyond the world of American football',
      'allig.res.text': 'Alligators moved off the field and into the fashion market with a store that communicates far beyond the sport. The Tray platform delivered the operational structure the team needed to sell, manage and grow independently from day one.',

      // JHS Studio
      'jhs.scope': 'Development',
      'jhs.caption': 'Overview — JHS Studio homepage',
      'jhs.ch.title': 'Going beyond social media to build its own digital presence',
      'jhs.ch.p1': 'JHS Studio is an audiovisual studio with a solid portfolio and a reputation built mainly through word of mouth and social media presence. Despite the quality of the work, the company had no digital space of its own to centralize that production and present the brand professionally to new clients.',
      'jhs.ch.p2': 'The challenge was to create a site that worked as an authority showcase — a place where a potential client would arrive, quickly understand what the studio does, see the quality of the work, and decide to get in touch. Without depending on any platform\'s algorithm.',
      'jhs.sol.title': 'Institutional site with the portfolio front and center',
      'jhs.sol.p1': 'The design was built to put the studio\'s work front and center. The visual structure uses strong contrast and breathing room, creating an environment that doesn\'t compete with the videos and photos on display — it frames them.',
      'jhs.sol.p2': 'The information architecture was designed for a scanned reading pattern: first-time visitors understand within seconds what the studio does, what the services are, and how to get in touch. The portfolio is the heart of the site, with a project gallery organized by category.',
      'jhs.sol.p3': 'The WordPress + Elementor build delivered a simple management panel for the studio\'s team to add new projects, update services and keep content current without needing technical support.',
      'jhs.res.title': 'Own digital presence, independent of any algorithm',
      'jhs.res.n1': 'weeks',
      'jhs.res.d1': 'From briefing to the site published, with design and development integrated',
      'jhs.res.d2': 'Editable by the studio\'s team via the WordPress panel, without depending on a developer',
      'jhs.res.d3': 'Own channel that centralizes portfolio, services and contact in one place',
      'jhs.res.text': 'JHS Studio now has a digital address that represents the level of work it produces. The site works as a landing point for referrals and as a credibility argument in proposals — an asset that grows along with the studio.',

      // Instituto Oka
      'oka.scope': 'Design + Dev',
      'oka.caption': 'Overview — Instituto Oka homepage',
      'oka.ch.title': 'Organizing 15 years of environmental work into a clear interface',
      'oka.ch.p1': 'Instituto Oka needed a digital presence that reflected its 15+ years of experience and the seriousness of its environmental work, focused on the Serra da Mantiqueira and the Paraíba Valley.',
      'oka.ch.p2': 'The challenge was to organize a wide range of activities — from scientific research to ecotourism — into an interface that was institutional, educational and inviting to donors and volunteers, balancing technical content with emotional appeal, and ensuring intuitive navigation for distinct audiences: scientists, schools, tourists and donors.',
      'oka.sol.title': 'A clear architecture for 5 areas of activity',
      'oka.sol.tag4': 'Responsive',
      'oka.sol.p1': 'In partnership with designer Amanda, we developed an interface with a nature-inspired palette and a full focus on legibility. Navigation guides the user through the institute\'s 5 areas of activity — Education, Citizen Science, Research, Management and Ecotourism — with a clear split between "What We Do" and "Where We Work".',
      'oka.sol.p2': 'We created engagement sections with distinct CTAs for donors and volunteers, and prioritized the mobile experience to enable access in the field and during visits to protected areas.',
      'oka.res.title': 'A digital presence that reflects the institute\'s credibility',
      'oka.res.n1': 'areas',
      'oka.res.d1': 'Areas of activity clearly organized: Education, Citizen Science, Research, Management and Ecotourism',
      'oka.res.d2': 'Mobile-first, enabling access in the field and during visits to protected areas',
      'oka.res.n3': 'audiences',
      'oka.res.d3': 'Target audiences served with distinct journeys and CTAs — donors and volunteers',
      'oka.res.text': 'The new design brought greater institutional credibility and made it easier to access conservation information. Organizing projects by region and activity let potential partners quickly grasp the Institute\'s scope.',

      // Essent.IA
      'ess.scope': 'Design + Dev',
      'ess.caption': 'Overview — Essent.IA homepage',
      'ess.ch.title': 'Translating complex AI into immediate trust',
      'ess.ch.p1': 'Essent.IA delivers intelligent automation solutions for companies that want to scale through data. The problem: the more sophisticated the technology, the harder it is to communicate to decision-makers who need to trust before they buy.',
      'ess.ch.p2': 'The core challenge was to build an institutional site that conveyed technical authority without alienating a business audience, balancing information density with a clear value proposition.',
      'ess.sol.title': 'Architecture focused on conversion',
      'ess.sol.p1': 'The navigation structure was designed to guide two distinct profiles: the manager who wants to understand the service quickly, and the technical person who needs depth. Every section has a deliberate information hierarchy.',
      'ess.sol.p2': 'The dark palette with color accents was chosen to signal cutting-edge technology without falling into startup clichés. The typography pairs a geometric display face for headings with a highly legible sans-serif for body text, creating contrast without noise.',
      'ess.sol.p3': 'Development was done entirely in Framer, leveraging scroll animations and native interactions to create a premium product feel without compromising performance.',
      'ess.res.title': 'Site live in 3 weeks, ready to scale',
      'ess.res.n1': 'weeks',
      'ess.res.d1': 'From briefing to the site published, with design and development integrated',
      'ess.res.d2': 'Built in Framer with an active CMS, allowing updates without depending on a developer',
      'ess.res.n3': 'profiles',
      'ess.res.d3': 'Architecture that simultaneously serves the business decision-maker and the technical profile',
      'ess.res.text': 'The site delivered a digital presence that reflects Essent.IA\'s sophistication without sacrificing clarity. The information flow reduces friction to conversion, and the Framer structure lets the team update content autonomously.',

      // Identity case pages — shared
      'case.label.identity': 'Case Study — Brand Identity',
      's02id': '02 — The concept',
      's03id': '03 — The brand',
      's04pal': '04 — Color palette',
      's05typ': '05 — Typography',
      's06app': '06 — Applications',
      's07res': '07 — The result',
      'id.logo.title': 'Logo and variations',
      'id.apps.title': 'The brand in real context',
      'id.tag.identity': 'Visual Identity',

      // Blended
      'blended.ch.title': 'A marketing agency needs to look like what it sells',
      'blended.ch.p1': 'Blended delivers strategy, brand and results for its clients — but before selling that to the market, it needed an identity that proved, in practice, what it promises to deliver.',
      'blended.ch.p2': 'The challenge was to create a brand that felt warm yet premium, conveying trust without falling into a cold corporate tone — aligned with the four pillars defined for the brand: warm, trustworthy, premium and human.',
      'blended.co.title': 'Blended becomes shape',
      'blended.co.p1': 'The serif lettering is born where the letters meet: they touch, merge and form a proprietary signature. A symbol that translates, in the typographic construction itself, the essence of Blended\'s work — uniting strategy, brand and result in a single direction.',
      'blended.co.p2': 'The terracotta palette and earthy tones reinforce the brand\'s warm, human side, while the editorial typography (Bevenida) balances weight and sophistication in the headings.',
      'blended.pal.title': 'Terracotta, earth tones and supporting shades',
      'blended.typ.title': 'Editorial weight and geometric clarity',
      'blended.res.title': 'A brand that already looks like what it promises',
      'blended.res.d1': 'Logo versions covering light, dark and monochrome applications',
      'blended.res.d2': 'Complete color system, from primaries to punctual support colors',
      'blended.res.d3': 'Stationery, social media and printed materials with consistent identity',
      'blended.res.text': 'Blended gained an identity that translates in practice what it sells to its clients: strategy, brand and result in a single direction, applied consistently from the business card to Instagram.',
      'blended.logo.1': 'Primary — color',
      'blended.logo.2': 'On dark background',
      'blended.logo.3': 'Reduced — color',
      'blended.logo.4': 'Reduced — on dark',

      // Alpha Valle
      'alpha.ch.title': 'Being born as a reference in a traditional market',
      'alpha.ch.p1': 'Founded in 2025, Alpha Valle entered the real estate market of Vale do Paraíba and Mantiqueira to break patterns and redefine the experience of buying and investing in property in the region.',
      'alpha.ch.p2': 'The challenge was to build, from day one, an identity that already conveyed solidity and innovation — without the market track record older competitors have in their favor.',
      'alpha.co.title': 'Building, shadow and the brand\'s initials in a single symbol',
      'alpha.co.p1': 'The central symbol is a geometric composition that simultaneously represents a building and its shadow — evoking civil construction and the verticalization of modern developments — and the letters "A" and "V", initials of Alpha and Valle.',
      'alpha.co.p2': 'The overlap and intersection of the shapes convey the integration of different areas of activity, while also suggesting movement, innovation and continuous growth — reflecting the company\'s vision for the future.',
      'alpha.pal.title': 'Green, blue and neutrals — nature and urbanism',
      'alpha.typ.title': 'Three typefaces for every level of hierarchy',
      'alpha.res.title': 'A brand ready to lead from launch',
      'alpha.res.d1': 'Brand versions covering light, dark and standalone applications',
      'alpha.res.d2': 'Hierarchical typographic system for headings, body and digital materials',
      'alpha.res.d3': 'Identity built to lead the real estate market of Vale do Paraíba and Mantiqueira',
      'alpha.res.text': 'Alpha Valle entered the market with an identity that already conveys solidity, modernity and connection to the region — ready for ads, stationery and sales materials since the first development announced.',
      'alpha.logo.1': 'Horizontal — color',
      'alpha.logo.2': 'On dark background',
      'alpha.logo.3': 'Vertical',

      // Amanda Mársico
      'amanda.ch.title': 'Translating sophistication and care into a healthcare brand',
      'amanda.ch.p1': 'Amanda Mársico is a dental surgeon in Cruzeiro-SP, with a sophisticated, minimalist style, working in general dentistry, orthodontics, cosmetic dentistry and facial harmonization — plus volunteer work in the Amazon.',
      'amanda.ch.p2': 'The challenge was to create an identity that balanced the professional\'s delicacy and gentleness with the technical trust the healthcare field demands, without falling into dental industry clichés.',
      'amanda.co.title': 'A diamond, a tooth and the initials of her name',
      'amanda.co.p1': 'The brand\'s symbol is based on four overlapping elements: a diamond, representing the preciousness of Amanda\'s care for her patients; the letter "A", for Amanda; the letter "M", for Mársico; and a 3D mesh that draws the silhouette of a tooth and evokes the technology used in her procedures.',
      'amanda.co.p2': 'The blue tones convey care, hygiene and modernity, while the pink acts as a counterpoint, bringing the brand\'s gentleness and delicacy.',
      'amanda.pal.title': 'Blue and pink — care with a touch of delicacy',
      'amanda.typ.title': 'Gentleness, elegance and modernity',
      'amanda.res.title': 'A healthcare brand with its own personality',
      'amanda.res.d1': 'Logo versions for horizontal, vertical, seal and negative use',
      'amanda.res.d2': 'A lean, memorable palette that\'s easy to apply to any material',
      'amanda.res.d3': 'A proprietary graphic pattern for use in spaces and supporting materials',
      'amanda.res.text': 'Drª Amanda Mársico\'s identity unites delicacy and technical trust — from the sign at the practice\'s reception to the appointment booking app, consistently communicating the care that is her trademark.',
      'amanda.logo.1': 'Primary — color',
      'amanda.logo.2': 'Negative — on dark',
      'amanda.logo.3': 'Vertical version',
      'amanda.logo.4': 'Seal',

      // Rio Advocacia
      'rio.ch.title': 'Translating 13 years of experience into visual prestige',
      'rio.ch.p1': 'With over 13 years in Civil Law, attorney Raphael Rio built a solid track record in complex cases, graduating from UNISAL with a postgraduate degree in Tax Law.',
      'rio.ch.p2': 'The challenge was to create a brand of his own — Rio Advocacia — that conveyed sophistication and trust befitting that experience, with a modern identity versatile enough for different communication materials.',
      'rio.co.title': '"R" and "O" join to form "RIO"',
      'rio.co.p1': 'The union of the letters "R" and "O" forms the word "RIO", symbolizing fluidity and stability. The minimalist geometry of the "R" reflects a modern approach, while the circular "O" suggests integrity and completeness.',
      'rio.co.p2': 'The choice of gold over a dark background adds sophistication and prestige, evoking trust and professionalism — qualities central to legal practice.',
      'rio.pal.title': 'Gold, dark blue and beige',
      'rio.typ.title': 'Modernity with the formality of the legal sector',
      'rio.res.title': 'A brand of his own, befitting the experience',
      'rio.res.d1': 'Years of experience in Civil Law now represented by a brand of his own',
      'rio.res.d2': 'Logo versions for light, beige and dark applications',
      'rio.res.d3': 'Complete visual system, from stationery to storefront signage',
      'rio.res.text': 'Rio Advocacia gained an identity that conveys sophistication and trust at first sight — present on the office façade, in the stationery and in every piece of client communication.',
      'rio.logo.1': 'On light',
      'rio.logo.2': 'On beige',
      'rio.logo.3': 'On dark',

      // Barbosa Advogados
      'barbosa.ch.title': 'Modernizing nearly twenty years of tradition without losing identity',
      'barbosa.ch.p1': 'Founded almost twenty years ago by Dr. Júnior Barbosa, the Barbosa Advogados firm works in Civil, Social Security, Real Estate Regularization, Debt Recovery, Labor and Holding law, with individualized service for business owners and workers.',
      'barbosa.ch.p2': 'The challenge was to update the brand for a more competitive environment, making it more sophisticated and flexible without breaking from the tradition the firm built over nearly two decades.',
      'barbosa.co.title': 'Tradition paired with modernity',
      'barbosa.co.tag1': 'Rebranding',
      'barbosa.co.p1': 'The new design is cleaner and more modern, with geometric shapes that convey clarity and organization. The orange brings vivacity and dynamism, while the dark blue reflects the trust and seriousness clients expect from the firm.',
      'barbosa.co.p2': 'This renewal reinforces Barbosa Advogados\' commitment to evolving and adapting to contemporary needs, staying ahead in the legal market.',
      'barbosa.pal.title': 'Blue, orange and beige',
      'barbosa.typ.title': 'Technical clarity with an editorial touch',
      'barbosa.res.title': 'Renewed tradition for a competitive market',
      'barbosa.res.d1': 'Years of the firm\'s tradition now represented by an updated brand',
      'barbosa.res.d2': 'Areas of legal practice unified under a consistent visual identity',
      'barbosa.res.d3': 'Logo versions for light, dark and monochrome applications',
      'barbosa.res.text': 'Barbosa Advogados renewed its image without losing the tradition built over nearly twenty years — a cleaner, more modern brand, ready for stationery, giveaways and the firm\'s day-to-day communication materials.',
      'barbosa.logo.1': 'On light',
      'barbosa.logo.2': 'On dark',
      'barbosa.logo.3': 'Monochrome',

      // Fire Art
      'fireart.ch.title': 'Giving a face to a gallery that only exists online',
      'fireart.ch.p1': 'Fire Art is an online art gallery that works as a platform, connecting art buyers with independent artists. With no physical space, the brand needed to communicate content exclusivity, quality of service and appreciation for the artist purely through the digital experience.',
      'fireart.ch.p2': 'The challenge was to create an identity minimalist and versatile enough to adapt to a fully digital environment without losing personality.',
      'fireart.co.title': 'A flame hidden inside the "a"',
      'fireart.co.p1': 'The visual concept is based on the brand name\'s own typography: ligatures in some letters bring the idea of fluidity, since the brand is grounded in the digital environment and needs to adapt easily to change.',
      'fireart.co.p2': 'Inside the letter "a" in "art" lives a flame, representing the brand\'s first name — "Fire" — and doubling as a standalone symbol for reduced applications, like favicons and social media.',
      'fireart.pal.title': 'Vivid orange, charcoal and white',
      'fireart.typ.title': 'Minimalism with exclusivity',
      'fireart.res.title': 'A 100% digital brand with its own personality',
      'fireart.res.d1': 'Logo versions for light, dark and reduced applications',
      'fireart.res.d2': 'A lean palette that reinforces the brand\'s minimalism and exclusivity',
      'fireart.res.d3': 'A proprietary graphic pattern built from repeating the flame symbol',
      'fireart.res.text': 'Fire Art gained a fluid, minimalist identity that works entirely in the digital environment — from the reduced icon in the navigation bar to the packaging for sold artworks, communicating exclusivity at every touchpoint with the collector.',
      'fireart.logo.1': 'Primary',
      'fireart.logo.2': 'Negative — on dark',
      'fireart.logo.3': 'Reduced — color',
      'fireart.logo.4': 'Reduced — on dark',

      // Agro Ribeiro — Brand Identity
      'agro2.caption': 'Entrance sign — metal and wood application',
      'agro2.ch.title': 'Selling land means looking like an expert, not a broker',
      'agro2.ch.p1': 'Agro Ribeiro negotiates high-end farm properties — a market where the purchase decision runs through track record, documentation and technical appraisal before any visit to the land.',
      'agro2.ch.p2': 'The challenge was to build an identity that conveyed the brand\'s four pillars — trust, sophistication, precision and heritage — without relying on agribusiness visual clichés.',
      'agro2.co.title': 'A seal, not a logo',
      'agro2.co.p1': 'The symbol is an oval frame that works as a mark of authenticity and precision — the same logic as a stamp or coat of arms. Inside it, a stylized wheat spike grows from a single point, its golden leaves opening; at the base, a cream line represents the terrain\'s relief.',
      'agro2.co.p2': 'The result is recognizable even in isolation — as an app icon, a leather stamp or embroidery — anchoring the brand in the land itself instead of relying on a generic agribusiness icon.',
      'agro2.pal.title': 'Forest green, gold, off-white and graphite',
      'agro2.typ.title': 'Editorial serif with a contemporary grotesque support face',
      'agro2.res.title': 'A seal of authenticity at every touchpoint',
      'agro2.res.d1': 'Logo versions covering light, dark, green and standalone seal',
      'agro2.res.d2': 'Fixed brand colors defined, with a support palette for graphics and materials',
      'agro2.res.d3': 'From stationery to embroidery, leather and signage — the same seal on every surface',
      'agro2.res.text': 'Agro Ribeiro gained a brand manual that works as the single reference for any supplier — print shop, embroiderer or visual communication — ensuring the brand\'s seal of authenticity arrives identical at every client touchpoint.',
      'agro2.logo.1': 'Primary — on light',
      'agro2.logo.2': 'Off-white — on dark',
      'agro2.logo.3': 'Gold — on green',
      'agro2.logo.4': 'Standalone seal',
    }
  };

  function applyCaseLang(lang) {
    window.__currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (CASE_I18N[lang] && CASE_I18N[lang][key]) {
        el.innerHTML = CASE_I18N[lang][key];
      }
    });
    document.querySelectorAll('.lang button').forEach(b => {
      b.classList.toggle('on', b.dataset.lang === lang);
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  function initLang() {
    const saved = localStorage.getItem('lang') || 'pt';
    applyCaseLang(saved);
    document.querySelectorAll('.lang button').forEach(b => {
      b.addEventListener('click', () => applyCaseLang(b.dataset.lang));
    });
  }


})();
