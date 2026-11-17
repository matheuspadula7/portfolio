---
status: aprovado
titulo: "Site feito em código ou WordPress: qual escolher para o seu negócio?"
slug: site-em-codigo-ou-wordpress
meta_description: "Site feito em código ou WordPress? Veja o que muda em edição, segurança, velocidade e manutenção, e as perguntas para decidir sem se arrepender."
resposta_curta: "O WordPress é uma plataforma pronta, com painel, temas e plugins no mesmo sistema. O site feito em código é construído sob medida e, quando precisa de edição, ganha um painel de conteúdo separado. A escolha depende de quem edita, do que o site precisa fazer e de quem cuida da manutenção."
palavra_chave: "site em código ou wordpress"
tipo: guia
pilar: web-design-que-converte
publico: b2b-dono
funil: atracao
case_relacionado: agroribeiro
posts_relacionados:
  - quem-tem-acesso-ao-seu-site
  - como-saber-se-o-seu-site-gera-contato
data_publicacao: 2026-11-17
data_atualizacao: 2026-11-17
capa: /assets/blog/site-em-codigo-ou-wordpress.jpg
capa_alt: "Notebook mostrando código HTML e CSS em uma mesa de trabalho, com um monitor ao fundo"
capa_credito: "Foto: Christopher Gower / Unsplash"
fontes:
  - titulo: "W3Techs, Usage statistics of WordPress as content management system"
    url: "https://w3techs.com/technologies/details/cm-wordpress"
    data: "17/11/2026"
  - titulo: "Patchstack, State of WordPress Security in 2026 (dados de 2025)"
    url: "https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/"
    data: "2026"
faq:
  - p: "O que é um site feito em código?"
    r: "É um site construído sob medida, com HTML, CSS e JavaScript, em vez de montado sobre uma plataforma pronta como o WordPress. Você define só o que o site precisa ter, sem tema nem plugins que não usa. A edição de conteúdo, quando necessária, é feita por um painel ligado ao site."
  - p: "O que é um CMS headless?"
    r: "É um painel de conteúdo separado do site que o visitante vê. A pessoa escreve e publica no painel, e o site mostra esse conteúdo. O Sanity é um exemplo. Isso permite editar sem tocar em código, sem que o painel e o site sejam o mesmo sistema."
  - p: "Site em código é mais seguro que WordPress?"
    r: "Em geral tem menos pontos de entrada, porque não há uma plataforma pública com login, plugins e banco de dados expostos. Mas também usa bibliotecas de terceiros e tem acessos a proteger. Um WordPress bem mantido pode ser seguro, e um site em código sem cuidado também pode ter problema."
  - p: "Posso trocar de WordPress para um site em código depois?"
    r: "Pode, mas dá trabalho: é preciso levar o conteúdo, as URLs e o que dependia de plugins. Vale mais a pena decidir bem no começo do que migrar por impulso."
revisao:
  fatos_conferidos: true
  numeros_com_fonte: true
  cliente_autorizou: n/a
  sem_travessao_e_sem_cidade: true
  sem_valores_de_preco: true
revisar: "Aprovado pelo Matheus em 17/11/2026. Fontes: W3Techs (38,5% de todos os sites e 57,5% dos com CMS conhecido, em 17/11/2026) e Patchstack (dados de 2025). Casos: Agro Ribeiro e IHS, conforme as páginas dos cases; no IHS o conteúdo do Sanity entra na hora do build, confirmado por ele. Medidas do site do estúdio feitas em 17/11/2026, uma vez e de uma conexão. Capa: Christopher Gower, Unsplash. Rever os números do W3Techs e da Patchstack em alguns meses."
---

## Qual é a diferença, em uma frase?

O WordPress é uma plataforma pronta: painel, temas, plugins e banco de dados vivem no mesmo sistema. Um site feito em código é construído sob medida, com só o que o negócio precisa. Quando esse site precisa de edição, ganha um painel de conteúdo separado, ligado a ele.

A pergunta mais útil, portanto, não é "estático ou dinâmico". É "plataforma pronta ou construído sob medida".

Já aviso: eu desenvolvo sites em código, então tenho um viés. Vou apontar onde o WordPress é a melhor escolha, porque em alguns casos ele é.

## Por que essa escolha importa tanto?

Porque ela define quem consegue mexer no site no dia a dia e quanto trabalho de manutenção o negócio assume. Segundo o W3Techs, em 17 de novembro de 2026, o WordPress era usado por 38,5% de todos os sites e por 57,5% dos que têm um sistema de conteúdo identificado. Isso significa muitos profissionais, muitos plugins e muita informação disponível. Também significa que ele é um alvo comum.

## Quando o site feito em código é a melhor escolha?

Quando o site tem um objetivo claro e o negócio quer controle sobre ele: apresentar o escritório, mostrar serviços e cases e levar a pessoa ao contato. É o caso de advocacia, contabilidade, clínica, imobiliária e profissionais autônomos, na maior parte das vezes. Nesse tipo de site:

- você só tem o que precisa, sem tema nem plugins que pesam e nunca são usados;
- velocidade e segurança pesam mais que recursos;
- o design não fica preso aos limites de um tema;
- a estrutura é feita para o que o negócio faz, e não adaptada de um modelo genérico.

## Quando o WordPress é a melhor escolha?

Quando o site precisa mudar com frequência e por várias mãos, e a equipe quer um painel pronto, com usuários, permissões e histórico. Um portal de notícias, uma equipe de conteúdo ou um negócio que cadastra produtos o tempo todo se beneficiam disso. O mesmo vale para uma loja virtual ou uma área de membros, em que o WordPress, com os plugins certos, resolve muita coisa sem desenvolvimento do zero.

Há outro ponto a favor: é fácil encontrar quem saiba mexer nele. Se você quer poder trocar de profissional sem dificuldade, isso conta.

## E se eu quiser editar o site sem depender de ninguém?

Aqui está a dúvida que faz muita gente escolher WordPress por reflexo. Um site feito em código não obriga o cliente a mexer em código. Ele pode ter um painel de conteúdo próprio, um CMS headless, em que a pessoa escreve e publica sem tocar em nada técnico.

Foi assim nos dois casos mais recentes que fiz:

- No [Agro Ribeiro](/agroribeiro), o cliente cadastra e publica novas fazendas em um painel do Sanity. Ao publicar, o site é reconstruído e colocado no ar automaticamente, sem intervenção manual.
- No [IHS Advogados](/ihs), o site foi feito em código, com React e Vite, e usa o Sanity como painel, inclusive para os artigos do escritório. O desenvolvimento foi feito com Claude Code, o que chamo de desenvolvimento com IA, com design e código no mesmo fluxo.

O ponto para o dono do negócio é o mesmo nos dois: o painel onde se escreve fica separado do site que o visitante vê. Você edita com a facilidade de um painel moderno e mantém o site leve, sem a estrutura de uma plataforma pesada. Nos dois casos, o conteúdo do painel entra no site na hora da construção (o build): as páginas saem prontas, e o visitante recebe arquivos já montados, sem consulta a um banco de dados a cada acesso. É por isso que esse tipo de site costuma ser rápido e ter menos pontos de entrada, mesmo com um painel de edição por trás.

## E a segurança pesa na decisão?

Pesa, mas não do jeito que se costuma dizer. O WordPress em si não é o vilão. Segundo a Patchstack, em 2025 foram divulgadas 11.334 novas vulnerabilidades no ecossistema, 42% a mais que no ano anterior. Desse total, 91% estavam em plugins e 9% em temas. No núcleo do WordPress foram só 6, todas de baixa prioridade.

A leitura que eu faço: o risco está no que se instala e na falta de atualização. Um WordPress com poucos plugins, mantido em dia, é bem diferente de um com vinte plugins esquecidos.

Um site em código tem, em regra, menos portas de entrada, porque não há uma plataforma pública com login, plugins e banco de dados expostos. Mas não é imune: ele também usa bibliotecas de terceiros, e o painel de conteúdo tem acessos que precisam ser protegidos. Em qualquer dos dois, o ponto mais importante continua sendo quem tem acesso à hospedagem, ao domínio e ao painel, como conto em [Quem tem acesso ao seu site?](/blog/quem-tem-acesso-ao-seu-site/).

## E a velocidade?

O site feito em código costuma largar na frente, porque entrega só o que a página usa. No meu próprio site, medi em 17 de novembro de 2026 que a página inicial tem 78,7 KB sem compressão e 17,1 KB depois de comprimida, e que o servidor começou a responder em cerca de 61 milissegundos. É uma única medição, de uma só conexão, e serve como exemplo, e não como benchmark.

O WordPress também pode ser rápido, com boa hospedagem, cache e poucos plugins. A diferença é que, nele, a velocidade depende de manter essa configuração em ordem. No site feito em código, ela nasce do projeto.

## O que pesa mais: a manutenção

No WordPress, o trabalho recorrente é atualizar o núcleo, os temas e os plugins, manter backup e conferir se nada quebrou depois de cada atualização. Alguém precisa ser responsável por isso, e é comum que ninguém seja.

No site em código, a rotina é outra: manter as dependências em dia e cuidar da publicação. A edição de conteúdo, com um painel, fica com o cliente. Em compensação, mudanças de estrutura passam por quem mantém o código, e por isso vale pedir, desde o início, acesso ao repositório e documentação do projeto.

## Quais erros mais aparecem?

- **Escolher WordPress "porque todo mundo usa" e não ter quem mantenha.** O site funciona no primeiro ano e, no segundo, acumula atualizações pendentes. É aí que o risco cresce.
- **Instalar um plugin para cada necessidade.** Cada plugin é código de outra pessoa dentro do seu site. Quanto mais, maior a chance de conflito, lentidão e vulnerabilidade.
- **Escolher site em código sem pensar em quem edita.** Se o dono do negócio quer trocar um texto sozinho e o projeto não prevê um painel, o site vira motivo de atrito.
- **Decidir só pelo custo inicial.** O que pesa mais no longo prazo é quem cuida do site depois que ele vai ao ar e quanto tempo isso consome.
- **Deixar domínio, hospedagem e repositório em nome do fornecedor.** Independentemente da escolha, tudo precisa ficar no nome da sua empresa, para você não depender de ninguém para mudar de caminho.

## Quais perguntas fazer antes de decidir?

1. **Quem vai editar o conteúdo, e com que frequência?** Se for você, de vez em quando, um site em código com painel serve. Se forem várias pessoas todo dia, o WordPress pode ser mais prático.
2. **O site precisa de loja, área de membros ou outro recurso com banco de dados?** Se sim, o WordPress tende a ser o caminho mais curto.
3. **Quem cuida da manutenção?** Se ninguém, um site em código, com poucas peças, é mais seguro como padrão.
4. **Quanto pesam velocidade e design próprio para o seu negócio?** Para um site que gera contato, pesam muito.
5. **Você quer poder trocar de profissional com facilidade?** O WordPress leva vantagem; no site em código, peça documentação e acesso ao repositório.

## O que eu faria

1. Escreveria o que o site precisa fazer, em uma página, antes de falar de tecnologia.
2. Responderia as cinco perguntas acima com quem vai usar o site.
3. Para um site de apresentação e contato, escolheria um site em código, com um painel de conteúdo se houver edição frequente.
4. Para uma loja ou um site com muitos editores, escolheria WordPress, com poucos plugins, backup e uma pessoa responsável pela manutenção.
5. Depois de publicar, mediria se o site gera contato, como descrevo em [Como saber se o seu site gera contato](/blog/como-saber-se-o-seu-site-gera-contato/).

## Quando isso não se aplica

Se o seu WordPress já funciona bem, está atualizado e tem quem cuide dele, não há motivo para migrar. Trocar de plataforma só vale a pena quando há um problema concreto: lentidão que não se resolve, invasões repetidas ou uma manutenção que ninguém assume.
