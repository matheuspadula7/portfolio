---
status: aprovado
titulo: "Documentação de projeto de site: o que registrar sobre decisões e acessos"
slug: documentacao-de-projeto-de-site
meta_description: "Documentar um site é registrar as decisões e quem tem acesso a quê. Veja o que anotar, um modelo simples e por que senha não entra no documento."
resposta_curta: "Documentar um projeto de site é, principalmente, registrar duas coisas: as decisões tomadas, com o motivo de cada uma, e os acessos, com quem tem o quê. Um registro curto por decisão e um inventário de acessos já evitam retrabalho quando alguém novo assume. Senhas não entram no documento: ficam em um gerenciador de senhas."
palavra_chave: "documentação de projeto de site"
tipo: guia
pilar: qualidade-e-responsabilidade
publico: b2b-dono
funil: confianca
case_relacionado: agroribeiro
posts_relacionados:
  - quem-tem-acesso-ao-seu-site
  - site-em-codigo-ou-wordpress
data_publicacao: 2026-11-18
data_atualizacao: 2026-11-17
capa: /assets/blog/documentacao-de-projeto-de-site.jpg
capa_alt: "Mão com caneta marcando itens de uma lista de verificação de projeto em um caderno"
capa_credito: "Foto: Jakub Żerdzicki / Unsplash"
fontes:
  - titulo: "Michael Nygard (Cognitect), Documenting Architecture Decisions"
    url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html"
    data: "15/11/2011"
  - titulo: "ADR GitHub organization, Architectural Decision Records"
    url: "https://adr.github.io/"
    data: "2026"
  - titulo: "CISA, Secure Our World: Use Strong Passwords"
    url: "https://www.cisa.gov/secure-our-world/use-strong-passwords"
    data: "2026"
faq:
  - p: "O que precisa estar na documentação de um site?"
    r: "No mínimo, duas coisas: as decisões do projeto, com o motivo e as alternativas descartadas, e o inventário de acessos, com quem tem acesso a hospedagem, domínio, painel, repositório e ferramentas. O resto, como manual de uso, vem depois."
  - p: "Posso guardar as senhas do site no documento do projeto?"
    r: "Não. O documento deve dizer quem tem acesso e onde a credencial está guardada, mas não conter a senha. Ela deve ficar em um gerenciador de senhas, com uma conta para cada pessoa."
  - p: "De quem é a documentação do projeto: do cliente ou do fornecedor?"
    r: "Do cliente. O fornecedor pode escrevê-la e mantê-la, mas ela descreve o negócio do cliente e precisa continuar acessível se o fornecedor sair. Peça uma cópia desde o começo."
  - p: "Com que frequência atualizar a documentação?"
    r: "Sempre que algo importante mudar: uma decisão nova, uma pessoa que entra ou sai, uma ferramenta trocada. Como segurança extra, vale revisar o inventário de acessos pelo menos uma vez por ano."
revisao:
  fatos_conferidos: true
  numeros_com_fonte: true
  cliente_autorizou: n/a
  sem_travessao_e_sem_cidade: true
  sem_valores_de_preco: true
revisar: "Aprovado pelo Matheus em 17/11/2026, com publicação agendada para 18/11/2026. Fontes: Nygard (2011), página do ADR e CISA. O modelo de registro (com alternativas) é adaptação do formato do Nygard, o exemplo é ilustrativo e a revisão anual dos acessos é sugestão do autor, sem fonte. Capa: Jakub Żerdzicki, Unsplash."
---

## Por que documentar um projeto de site?

Porque a memória de um projeto some mais rápido do que se imagina. Um ano depois de o site ir ao ar, ninguém lembra por que escolheram aquela hospedagem, por que o endereço das páginas é assim ou quem criou aquele acesso. Quando um profissional novo assume, restam duas saídas ruins: aceitar tudo sem entender ou desfazer algo sem saber as consequências. É o problema que Michael Nygard descreveu em 2011, ao defender o registro das decisões de projetos de software: o que se perde com o tempo é o motivo por trás de cada escolha.

Para um site de negócio, o risco é concreto. Um acesso esquecido, um domínio no nome de quem já saiu ou uma decisão que ninguém sabe explicar podem custar dias de trabalho, ou deixar o site fora do ar.

## O que é documentar, na prática?

Não é escrever um manual de cinquenta páginas. Nygard argumenta que a documentação útil é pequena e modular: curta o bastante para a equipe ler e manter atualizada. Para um projeto de site, eu resumo em duas coisas:

1. **Decisões:** o que foi escolhido, por quê, e o que foi descartado.
2. **Acessos:** quem tem acesso a quê, e onde cada credencial é guardada.

Todo o resto, como guia de uso do painel ou lista de contatos, é complemento.

## Como registrar uma decisão?

Um registro por decisão, curto, com a mesma estrutura sempre. O formato mais conhecido vem do trabalho de Nygard, chamado ADR (registro de decisão de arquitetura). Eu uso uma versão adaptada, com estes campos:

- **Título:** um nome curto para a decisão.
- **Data e status:** quando foi tomada e se está em vigor ou foi substituída por outra.
- **Contexto:** a situação e as restrições que levaram à decisão, só com fatos.
- **Decisão:** o que foi escolhido, em uma ou duas frases.
- **Alternativas descartadas:** o que mais foi considerado e por que ficou de fora.
- **Consequências:** o que passa a valer por causa da decisão, positivo e negativo.

Um exemplo ilustrativo, inventado só para mostrar o formato:

> **Título:** Painel de conteúdo separado do site.
> **Data e status:** 12/03/2026, em vigor.
> **Contexto:** o cliente publica conteúdo toda semana e não quer depender de quem programa.
> **Decisão:** o site é feito em código, com um painel de conteúdo próprio para o cliente editar.
> **Alternativas descartadas:** WordPress, porque o site não precisa de loja nem de vários editores e o cliente prefere menos manutenção.
> **Consequências:** o cliente edita sem tocar em código; mudanças de estrutura passam por quem mantém o site; o painel tem acessos próprios, que entram no inventário.

Quando uma decisão muda, o registro antigo não é apagado: ele passa a "substituído", com uma referência à nova. Assim o histórico continua legível.

## Quais decisões valem um registro?

As que seriam difíceis de reconstituir depois:

- a plataforma escolhida, como site em código ou WordPress;
- a hospedagem e o domínio, e em nome de quem estão;
- a estrutura dos endereços das páginas, que afeta a busca;
- o que conta como contato e como ele é medido;
- as ferramentas conectadas ao site, como e-mail marketing e análise de visitas;
- o que foi proposto e descartado, e por quê.

## Como registrar os acessos?

Com um inventário, em uma tabela simples. Para cada acesso, anote:

1. **O sistema:** hospedagem, domínio, painel do site, repositório, analytics, e-mail.
2. **Quem tem acesso:** o nome de cada pessoa ou empresa.
3. **O que pode fazer:** só ver, editar ou administrar.
4. **Desde quando e para quê.**
5. **Se há verificação em duas etapas** ligada.
6. **Onde a credencial está guardada:** o nome do gerenciador de senhas, não a senha.

É a mesma lista do texto sobre [quem tem acesso ao seu site](/blog/quem-tem-acesso-ao-seu-site/), agora como documento que se mantém. Num projeto com painel de conteúdo separado do site, como o da [Agro Ribeiro](/agroribeiro), o painel e o que sustenta o site têm acessos distintos, e cada um ganha sua linha no inventário.

## Senha não entra no documento

Este é o ponto que mais exige cuidado. O documento diz **quem** tem acesso e **onde** a credencial está guardada, e nunca contém a senha. Planilha, e-mail ou arquivo de texto com senhas são um risco por si só: quem abrir o arquivo leva tudo.

A CISA, agência de segurança cibernética dos Estados Unidos, orienta a usar um gerenciador de senhas em vez de anotá-las. Na prática, isso significa:

- cada pessoa com a sua própria conta, e não uma senha compartilhada;
- o gerenciador protegido por uma senha forte e, de preferência, por verificação em duas etapas;
- acesso removido na hora em que alguém sai do projeto.

## Onde guardar e como manter vivo?

Guarde em um lugar que o cliente controla e que o fornecedor também consegue atualizar. Pode ser uma pasta compartilhada, um documento online ou, em projetos com código, o próprio repositório, junto do site. O essencial é que tenha uma data de atualização e um responsável.

Uma regra simples para mantê-la viva: atualize sempre que algo importante mudar, como uma decisão nova ou uma pessoa que entra ou sai. E, como segurança extra, revise o inventário de acessos pelo menos uma vez por ano. Essa frequência é uma sugestão minha, e não uma norma.

## De quem é a documentação?

Do cliente. O fornecedor pode escrever e manter, mas o documento descreve o negócio do cliente e precisa continuar acessível se a parceria acabar. Peça uma cópia desde o começo do projeto, e confirme na entrega que domínio, hospedagem e repositório estão em nome da sua empresa.

## Quais erros mais aparecem?

- **Deixar a documentação para o fim do projeto.** Nessa hora o motivo das decisões já foi esquecido. Registrar na hora da decisão leva dois minutos.
- **Escrever demais.** Um documento longo ninguém lê nem atualiza, e vira mais um arquivo desatualizado.
- **Registrar só o que foi escolhido, e não o que foi descartado.** É a lista de alternativas que evita que alguém proponha, daqui a um ano, a mesma coisa que já foi rejeitada.
- **Guardar a documentação só com o fornecedor.** Se ele sair, o histórico sai junto.
- **Misturar acesso com senha.** O inventário diz quem tem acesso, e a credencial fica no gerenciador.
- **Nunca revisar.** Um inventário de acessos desatualizado dá falsa segurança: parece que está tudo sob controle, e já não está.

## O que eu faria

1. Criaria um documento de projeto com duas partes: decisões e acessos.
2. Registraria cada decisão importante em um modelo curto, com contexto, alternativas e consequências.
3. Montaria o inventário de acessos, com a credencial apontada para um gerenciador de senhas e nunca escrita no documento.
4. Guardaria tudo em um lugar controlado pelo cliente, com data e responsável.
5. Revisaria o documento a cada mudança importante e o inventário pelo menos uma vez por ano.

## Quando isso não se aplica

Se o site é uma página de apresentação, feita e mantida só por você, sem fornecedor e sem login para mais ninguém, o documento cabe em uma página. Mas ainda vale fazê-lo: ele mostra onde você é o único ponto de falha e ajuda quem vier depois.
