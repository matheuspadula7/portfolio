---
status: rascunho
titulo: "Vender confiança antes de vender terra: marca e site da Agro Ribeiro"
slug: agro-ribeiro-marca-e-site
meta_description: "Como a identidade visual e o site da Agro Ribeiro foram pensados para vender confiança antes de vender terra, com CMS próprio e deploy automático."
resposta_curta: "A Agro Ribeiro vende fazendas de alto padrão, um mercado em que a confiança vem antes da visita. A solução foi uma marca com cara de selo de autenticidade e um site estático com CMS próprio, que deixa o cliente publicar novas fazendas sozinho e atualiza o site automaticamente."
palavra_chave: "site e identidade visual para corretora de fazendas"
tipo: bastidor
pilar: qualidade-e-responsabilidade
publico: b2b-dono
funil: evidencia
case_relacionado: agroribeiro
posts_relacionados:
  - site-de-advocacia-que-gera-contato
  - feed-e-aluguel-site-e-imovel
data_publicacao: 2026-11-02
data_atualizacao: 2026-11-02
capa: /assets/images/agroribeiro2-cover2.jpg
capa_alt: "Placa de entrada da Agro Ribeiro, em verde e off-white, ao pôr do sol"
capa_original: true
fontes: []
faq: []
revisao:
  fatos_conferidos: false
  numeros_com_fonte: false
  cliente_autorizou: n/a
  sem_travessao_e_sem_cidade: false
  sem_valores_de_preco: false
revisar: "1) Os fatos vêm das duas páginas do case (identidade e site): quatro pilares, selo oval, espiga, paleta, tipografia, manual de marca, Astro, Sanity, GitHub Actions, Hostinger, seção 'O que verificamos'. 2) As imagens do post são as simulações do portfólio (placa, site e veículo); conferi o texto delas como 'simulação'. 3) Citei a frase da primeira tela do site (Terra avaliada antes de ser oferecida) a partir da imagem; confirme que é o texto real do site. 4) Não usei os números que aparecem na simulação do site (anos, hectares, fazendas), porque o case não os confirma. 5) A explicação de por que um CMS tradicional ou um site estático sozinhos não bastariam é geral, não é o histórico das opções que você avaliou. Se houve alternativa real (ou algo que você mudaria hoje), me conte e eu acrescento a seção 'o que mudaria'. 6) Tratei como texto B2B: não linkei a página só da identidade, para não cruzar as categorias."
---

## Qual era a situação da Agro Ribeiro?

A Agro Ribeiro intermedeia fazendas de alto padrão. É um mercado em que a decisão de compra envolve valores altos e passa por histórico, documentação e avaliação técnica antes de qualquer visita ao terreno. O comprador não escolhe por impulso: ele precisa confiar antes de se mover.

Isso muda a pergunta do projeto. Não era "como parecer bonito", e sim "como parecer perito, e não corretor".

## O que o cliente precisava resolver?

Eram dois problemas, e o desafio foi resolver os dois juntos:

1. **Comunicar seriedade documental e rigor técnico**, na marca e no site, sem recorrer aos clichês visuais do agronegócio.
2. **Dar autonomia total ao cliente** para publicar novas fazendas no catálogo sem depender de um desenvolvedor a cada atualização.

Um site bonito que o cliente não consegue atualizar vira vitrine parada. Um site fácil de atualizar, mas com cara genérica, não passa confiança. A solução precisava das duas coisas.

## Que decisões guiaram a identidade visual?

A marca partiu de quatro pilares: **confiança, sofisticação, precisão e herança**. Cada escolha visual precisava responder a pelo menos um deles.

- **Um selo, e não um logotipo.** O símbolo é uma moldura oval que funciona como marca de autenticidade, a mesma lógica de um carimbo ou brasão. Dentro dela, uma espiga estilizada nasce de um único ponto, com folhas douradas se abrindo, e uma linha em creme na base representa o relevo do terreno.
- **Reconhecimento mesmo isolado.** O selo funciona como ícone de aplicativo, carimbo em couro ou bordado, e ancora a marca no território, em vez de usar um ícone genérico.
- **Paleta de verde-floresta, dourado, off-white e grafite**, para transmitir tradição sem pesar.
- **Tipografia com serifa editorial e apoio grotesco contemporâneo**, que une herança e precisão.
- **Um manual de marca**, que serve de referência única para qualquer fornecedor, seja a gráfica, a bordadeira ou a comunicação visual, para que o selo chegue idêntico a cada ponto de contato.

![Placa e veículo com a marca](/assets/images/agroribeiro2-app4.jpg "Simulação de aplicação da marca em veículo.")

## Que decisões guiaram o site?

A pergunta técnica era: como dar ao cliente a autonomia de um CMS sem perder a velocidade de um site estático? Em geral, um CMS tradicional dá autonomia, mas pode ficar mais lento. Um site estático é rápido, mas muda pouco sem ajuda de quem programa. A combinação que atendeu aos dois pontos foi uma stack **headless**:

- **Astro**, que gera o site em páginas estáticas já prontas, o que favorece a velocidade e o SEO de cada página.
- **Sanity**, um CMS headless que dá ao cliente um painel dedicado para cadastrar, editar e publicar novas propriedades, sem tocar em código.
- **GitHub Actions**, que automatiza o caminho entre o painel e o ar: quando uma nova fazenda é publicada no Sanity, o site é reconstruído e publicado na Hostinger sem intervenção manual.

Em palavras simples: o painel onde o cliente escreve (Sanity) fica separado do site que o visitante vê (Astro). Cada parte faz o que faz melhor, e o automático liga as duas.

O conteúdo institucional, como a seção "O que verificamos", foi desenvolvido direto no código, para que as páginas fixas tenham o máximo de desempenho.

![Simulação do site da Agro Ribeiro](/assets/images/ribeiro-desktop.jpg "Simulação da página inicial do site, em que a primeira frase é \"Terra avaliada antes de ser oferecida\".")

Repare que a promessa da primeira tela vem do mesmo raciocínio da marca: mostrar a checagem antes de mostrar o produto.

## O que mudou para o cliente?

- O cliente **publica novas fazendas direto no CMS**, sem depender de um desenvolvedor.
- Do clique em "publicar" até o site atualizado em produção, **o processo é automático**, sem etapas manuais.
- Cada página é gerada de forma estática, então **cada nova fazenda já nasce otimizada para velocidade e SEO**.

Para o cliente, a diferença aparece na rotina: cadastrar uma fazenda deixa de ser um pedido a um desenvolvedor e passa a ser uma tarefa interna, feita no próprio ritmo. Para o visitante, aparece na primeira impressão: páginas que abrem rápido e informação organizada.

Você pode ver o projeto completo no [case da Agro Ribeiro](/agroribeiro).

## O que eu levo para outros projetos?

1. **Comece pelas dúvidas que o cliente tem antes de comprar.** Se a decisão envolve valor alto, a primeira entrega do site e da marca é confiança, e não beleza.
2. **Decida a marca e o site juntos.** A promessa da identidade e a promessa do site precisam ser a mesma, ou o visitante percebe a quebra.
3. **Pense em quem vai atualizar o site depois.** Se cada mudança depende de um programador, o site tende a envelhecer. O mesmo vale para um escritório de advocacia, como explico em [O que um site de escritório de advocacia precisa ter para gerar contato](/blog/site-de-advocacia-que-gera-contato/).

Se o seu negócio vende algo em que a confiança vem antes do preço, é esse caminho que eu seguiria.
