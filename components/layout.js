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
