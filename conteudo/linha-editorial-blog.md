# Linha editorial do blog, Padula Design Studio

Versão 1.1, 02/11/2026, com as cinco decisões do Matheus incorporadas. Este arquivo serve para dois leitores: o Matheus (decisões editoriais) e o Claude Code (regras que o script de publicação valida). Copie para o repositório do site em `docs/linha-editorial-blog.md`.

## 1. Papel do blog

O blog é a fonte de conteúdo. As redes sociais são derivadas dele.

- **Blog:** busca (Google e assistentes de IA), profundidade e prova. Abre com a resposta.
- **Redes sociais:** atenção e confiança. Abrem com a cena.
- **Site (cases e serviços):** conversão. O blog empurra leitor para eles.

Cada texto precisa servir a pelo menos uma destas três funções: responder uma pergunta que um comprador digita no Google, mostrar como o estúdio pensa e decide num projeto real, ou traduzir um assunto técnico ou criativo para quem decide e não é da área.

## 2. Públicos e categorias

O blog tem duas categorias. Elas não se misturam no mesmo texto, no mesmo link interno nem no mesmo carrossel.

**Categoria 1: Web e desenvolvimento (B2B).** Dois leitores:

- **Dono de empresa que terceiriza web** (advocacia, contabilidade, imobiliária, clínica). Chega por busca. Quer saber o que precisa ter, do que depende o preço, como evitar problema. Valor de `publico`: `b2b-dono`.
- **Agência ou designer que precisa de implementação.** Chega por LinkedIn e indicação. Quer saber como terceirizar sem retrabalho. Valor de `publico`: `b2b-agencia`.

**Categoria 2: Identidade visual.** Leitor: empresa refazendo ou atualizando a marca, ou empresário individual começando agora. Chega por busca e por Instagram. Valor de `publico`: `identidade`. Padrão visual nos derivados: Claro Alternativo.

Para o script: `b2b-dono` e `b2b-agencia` formam o grupo B2B. Link interno e `posts_relacionados` só podem ligar textos do mesmo grupo. A listagem do blog filtra por categoria.

### Região

Fica decidido citar o **Vale do Paraíba**. Cidades continuam proibidas em qualquer texto.

Onde a região pode aparecer:

1. Página de atendimento regional (seção 12).
2. Dados estruturados (`areaServed`).
3. Área de atendimento do Perfil da Empresa no Google.
4. Bloco "sobre o autor" no fim de cada artigo, em uma frase como "atende empresas em todo o Brasil, com foco no Vale do Paraíba".

Nos artigos em si, a região não entra no título, no H1 nem nos H2. Isso evita páginas que só trocam o nome do lugar (doorway pages) e mantém o posicionamento nacional.

## 3. Pilares

Os mesmos pilares das redes, sem recategorizar.

| Pilar | Categoria | O que o blog responde | Intenção de busca |
|---|---|---|---|
| Web Design que Converte | B2B | O que o site precisa ter, do que depende o preço, qual formato escolher | Decisão de compra |
| Qualidade e Responsabilidade | B2B | Por que decidimos X neste projeto, como revisamos, o que dá errado | Bastidor de decisão |
| Automação e IA | B2B | O que a IA faz sozinha e o que precisa de revisão humana | Explicador |
| Segurança Web | B2B | Sintomas de site invadido, o que fazer, quando migrar de hospedagem | Sintoma e solução |
| Identidade Visual | Identidade | O que é e o que inclui uma identidade, quando refazer, como funciona o processo | Decisão, sintoma e bastidor |

Vocabulário fixo: "Desenvolvimento com IA", nunca "vibecoding".

## 4. Tipos de artigo

Cada artigo cai em um tipo. Isso define estrutura e tamanho.

| Tipo | Função no funil | Tamanho | Estrutura |
|---|---|---|---|
| Guia de decisão | Atração | 1.200 a 1.800 palavras | Resposta curta, critérios, erros comuns, o que eu faria, FAQ |
| Sintoma e solução | Atração | 900 a 1.400 | O que você vê, causa provável, como confirmar, como resolver, quando chamar alguém |
| Explicador | Tradução | 900 a 1.400 | Contraste, antes e depois, ou causa e efeito |
| Bastidor de decisão | Confiança e Evidência | 800 a 1.200 | Situação real, opções, decisão, resultado, o que mudaria |
| Tese | Atração | 600 a 1.000 | Afirmação, dado com fonte, contra-argumento, conclusão |

## 5. Voz

- Primeira pessoa, direta, opinativa, mas sempre com evidência. É o tom das redes, com a ordem invertida: aqui a resposta vem primeiro e a cena entra como exemplo.
- Categoria Identidade: o mesmo formato, com mais atenção ao processo criativo e menos a termos técnicos.
- Proibido: "neste artigo vamos ver", introdução genérica, "no mundo digital de hoje", lista de dicas sem decisão por trás.
- Sem travessão. Sem nome de cidade. Parágrafos curtos.
- Preço: **nunca publicar valores** (nada de R$ nem faixas). Os artigos de preço falam só dos fatores que o formam.
- Posicionamento: solução completa em projetos simples, complemento ao desenvolvedor nos complexos. Nunca "substituto de desenvolvedor".
- Todo artigo tem pelo menos um exemplo real do estúdio (case liberado, ou situação anonimizada) ou um dado com fonte e data.
- Número sem fonte não entra. Dado de pesquisa leva nome da fonte, data e link.

## 6. Estrutura obrigatória de um artigo

1. **H1** com a pergunta ou o termo de busca, em português natural.
2. **Resposta curta** logo abaixo do H1: 2 a 3 frases que respondem sem exigir leitura do resto. Esse bloco é o que o Google e os assistentes de IA tendem a citar.
3. **H2 em formato de pergunta**, cada um com resposta direta no primeiro parágrafo.
4. **Exemplo real** (case relacionado, com link para a página do case).
5. **O que eu faria**: recomendação objetiva, com a ressalva de quando não se aplica.
6. **FAQ** com 3 a 4 perguntas (alimenta dados estruturados FAQPage).
7. **Fontes** no final.
8. **Chamada final discreta**, sem "contrate agora": convite para falar sobre o caso do leitor, apontando para a página de WhatsApp com UTM e `link_location` do artigo, para o generate_lead registrar de qual texto veio o contato.
9. **Links internos**: 1 case, 1 página de serviço (quando existir), 1 artigo relacionado, todos do mesmo grupo (B2B ou identidade).
10. Data de publicação e de atualização visíveis, assinatura "Matheus Padula" e o bloco "sobre o autor".

## 7. Frontmatter (contrato com o script do Claude Code)

```yaml
---
status: rascunho                 # rascunho | aprovado | publicado. O script só publica "aprovado".
titulo: ""
slug: ""
meta_description: ""             # 140 a 160 caracteres, sem travessão
palavra_chave: ""
tipo: guia | sintoma | explicador | bastidor | tese
pilar: web-design-que-converte | qualidade-e-responsabilidade | automacao-e-ia | seguranca-web | identidade-visual
publico: b2b-dono | b2b-agencia | identidade
funil: atracao | confianca | traducao | evidencia | bastidores
case_relacionado: ""             # slug de uma página de case liberada (seção 11)
posts_relacionados: []           # só do mesmo grupo
data_publicacao: YYYY-MM-DD
data_atualizacao: YYYY-MM-DD
fontes:
  - titulo: ""
    url: ""
    data: ""
faq:
  - p: ""
    r: ""
revisao:
  fatos_conferidos: false
  numeros_com_fonte: false
  cliente_autorizou: n/a         # true | false | n/a
  sem_travessao_e_sem_cidade: false
  sem_valores_de_preco: false
---
```

O script deve recusar a publicação se:

- `status` for diferente de "aprovado", ou qualquer item de `revisao` for false;
- o `case_relacionado` não existir, for `essentia` ou for de outro grupo (seção 11);
- um link interno ou post relacionado cruzar B2B com identidade;
- a meta description fugir de 140 a 160 caracteres;
- o texto tiver travessão, nome de cidade, "R$" ou "vibecoding";
- "Vale do Paraíba" aparecer fora do bloco "sobre o autor" e fora do frontmatter de dados estruturados;
- houver número percentual sem fonte no frontmatter.

## 8. Derivados para redes sociais

Cada artigo aprovado gera um kit de **três ângulos de carrossel**. Os derivados nunca são o artigo resumido: cada peça funciona sozinha e leva o leitor ao texto completo.

| Peça | Origem no artigo | Padrão visual |
|---|---|---|
| Carrossel A (gancho) | Resposta curta e a tese. Tipo Atração. | Dark Premium (B2B) ou Claro Alternativo (identidade), 7 slides |
| Carrossel B (aplicação) | O passo a passo ou o exemplo real. Confiança ou Tradução. | Mesmo padrão da categoria |
| Carrossel C (dado ou bastidor) | Um dado com fonte, ou o bastidor da decisão. | Mesmo padrão da categoria |
| Texto do LinkedIn (um por carrossel) | Tese nas primeiras linhas, mesmo PDF do carrossel | Texto adaptado, nunca a legenda do Instagram. Em identidade, só quando a pauta também servir ao público de lá |
| Stories (3 quadros) | Pergunta, resposta curta, link do artigo | Padrão da categoria |
| Reels (1 por mês) | O artigo de melhor desempenho | Pipeline de motion graphic existente |

Regras:

- CTA dos carrosséis: "comenta [PALAVRA] que te mando o guia completo no direct". O link do artigo vai por mensagem, no primeiro comentário ou no sticker de link dos stories. Não depende do link da bio.
- Cada derivado leva UTM: `utm_source=instagram|linkedin`, `utm_medium=social`, `utm_campaign=blog_<slug>`, `utm_content=carrossel_a|carrossel_b|carrossel_c|story|reel`.
- No LinkedIn, o link vai no primeiro comentário, não no corpo do post.
- Cada artigo guarda, no próprio arquivo, o roteiro dos derivados (um bloco `derivados:` ou um arquivo `slug.derivados.md`), para o calendário social sair do blog.

## 9. Cadência

**1 artigo por semana, publicado na segunda-feira**, em ciclo de 3 semanas: dois artigos B2B e um de identidade. Isso mantém a proporção que as redes já têm (dois posts B2B para um de identidade por semana).

Os derivados formam uma fila que alimenta os três slots semanais (segunda e quarta para B2B, sexta para identidade):

| Semana | Segunda | Quarta | Sexta |
|---|---|---|---|
| 1 | Artigo B2B-1 no ar + Carrossel A (B2B-1) | Carrossel B (B2B-1) | Carrossel B (artigo de identidade anterior) |
| 2 | Artigo B2B-2 no ar + Carrossel A (B2B-2) | Carrossel B (B2B-2) | Carrossel C (artigo de identidade anterior) |
| 3 | Artigo de identidade no ar + Carrossel C (B2B-1) | Carrossel C (B2B-2) | Carrossel A (identidade) |

Stories de 3 quadros no dia em que cada artigo vai ao ar, e um Reels por mês com o artigo de melhor desempenho (Search Console, GA4, engajamento).

No primeiro ciclo, as sextas das semanas 1 e 2 seguem com a série de identidade atual, porque ainda não existe artigo anterior de identidade. Se a revisão atrasar, vale mais pular uma semana do que publicar texto genérico.

## 10. Pautas

Os volumes de busca ainda não foram validados. Antes de escrever cada uma, conferir no Search Console e no Planejador de Palavras-chave do Google.

### Categoria B2B (10 pautas)

| # | Título de trabalho | Tipo | Pilar | Apoio |
|---|---|---|---|---|
| B1 | Feed é aluguel, site é imóvel | Tese | Web Design que Converte | Dado Sensor Tower (eMarketer, 1º tri 2026) e o vídeo já produzido |
| B2 | Como saber se o seu site gera contato: o mínimo de medição | Bastidor | Qualidade e Responsabilidade | O caso real do próprio site |
| B3 | Meu site WordPress está mostrando anúncio de aposta: o que fazer | Sintoma | Segurança Web | Caso real anonimizado |
| B4 | O que um site de escritório de advocacia precisa ter para gerar contato | Guia | Web Design que Converte | IHS Advogados |
| B5 | Do que depende o preço de um site profissional | Guia | Web Design que Converte | Só fatores, sem valores. Fatores como número de páginas, integrações, textos, imagens, manutenção |
| B6 | 7 sinais de que o seu site foi invadido | Sintoma | Segurança Web | Caso real anonimizado |
| B7 | Site lento: quando trocar de hospedagem e quando o problema é outro | Sintoma | Segurança Web | Caso de migração por servidor lento |
| B8 | Desenvolvimento com IA: o que precisa de revisão humana | Explicador | Automação e IA | Tema "IA sem validação é só um chute bem escrito", com dados EBU/BBC e Reuters Institute |
| B9 | Landing page ou site institucional: qual escolher | Guia | Web Design que Converte | Clínicas e contabilidade |
| B10 | Como terceirizar a implementação do design sem retrabalho | Bastidor | Qualidade e Responsabilidade | Para agências, com Menndel & Melo ou Agro Ribeiro (lado técnico) |

### Categoria Identidade visual (8 pautas)

| # | Título de trabalho | Tipo | Apoio |
|---|---|---|---|
| I1 | Logo não é marca: o que é, de fato, uma identidade visual | Guia | Blended |
| I2 | 6 sinais de que está na hora de refazer a marca | Sintoma | Alpha Valle |
| I3 | Do que depende o preço de uma identidade visual | Guia | Só fatores, sem valores |
| I4 | O que vem em um projeto de identidade visual (entregáveis) | Guia | Página do briefing de identidade visual do site |
| I5 | Como funciona o briefing de uma identidade visual | Bastidor | Página do briefing |
| I6 | Por que sua marca não pode ter medo de soar artificial | Tese | Roteiro já pronto nas redes. Conferir a fonte da pesquisa (LinkedIn/Gen Z) antes de citar |
| I7 | Atualizar a marca sem refazer tudo | Bastidor | Barbosa Advogados (o projeto foi só atualização de marca) |
| I8 | Marca de escritório de advocacia: sobriedade sem ficar sem personalidade | Guia | Rio Advocacia |

**Ordem de publicação sugerida:** B1, B3, I6 (fecha o primeiro ciclo de 3 semanas), depois B4, B2, I1.

## 11. Cases liberados

Todos os cases do portfólio estão liberados para aparecer em texto indexado, **exceto `essentia`**, que fica de fora (também fora do sitemap).

| Grupo | Slugs |
|---|---|
| B2B | `menndel`, `agroribeiro`, `hlwallwonders` |
| Identidade | `agroribeiro-marca`, `blended`, `alphavalle`, `amandamarsico`, `raphaelrio`, `fireart`, `barbosa` |
| Livres (servem às duas categorias) | `ihs`, `drrafael`, `dialogos`, `alligators`, `jhs`, `oka` |
| Bloqueado | `essentia` |

Regras de copy por case:

- Barbosa foi apenas identidade visual (atualização de marca). Nunca tratá-lo como projeto de site.
- Instituto Oka nunca é chamado de "ONG".
- Resultado de cliente só entra com número que o próprio cliente ou o projeto sustentem. Sem estimativa inventada.
- Cases de segurança (site infectado, migração) saem anonimizados, a menos que o cliente esteja no portfólio.
- Mesmo com o case liberado, dados internos do cliente (faturamento, base de contatos, acessos) não entram.

## 12. Página de atendimento regional

Uma página única (não um artigo, não uma por cidade), por exemplo `/atendimento-vale-do-paraiba`, no sitemap e linkada no rodapé. Conteúdo próprio e útil, para não parecer página de modelo:

- Quem o estúdio atende na região e que tipos de empresa (advocacia, contabilidade, imobiliária, clínicas).
- Como funciona o atendimento (remoto, reuniões, prazos de projeto, o que o cliente precisa enviar).
- Cases relacionados, **somente os que forem de empresas da região**. Não afirmar cliente local se não for verdade.
- Dados estruturados `ProfessionalService` com `areaServed` apontando para a região, sem endereço.
- Mesmo texto-base usado na área de atendimento do Perfil da Empresa no Google, para consistência.

## 13. Fluxo de produção e aprovação

**Aqui (Cowork), onde está o contexto de social e do projeto:** pauta, pesquisa com fontes, rascunho em markdown com frontmatter completo e o kit de derivados (roteiros, legendas, textos de LinkedIn).

**Claude Code, onde está o repositório:** validar o frontmatter e a checklist, conferir que os links internos existem, gerar a página, atualizar sitemap e listagem, produzir os visuais dos carrosséis. Só roda com `status: aprovado`.

**Matheus:** a aprovação é o gate. Checklist de revisão:

1. Cada afirmação factual está certa e tem fonte quando necessário.
2. Todo número tem fonte e data. Nenhum valor em reais.
3. O exemplo do cliente está correto e anonimizado quando precisa.
4. O texto soa como você falaria, e não como texto de blog genérico.
5. Sem travessão, sem cidade, vocabulário e posicionamento corretos.
6. O link interno certo, do grupo certo, o CTA certo e o `link_location` do generate_lead.

Depois de aprovar, trocar `status` para `aprovado` e pedir ao Claude Code para publicar. Commit, push e Reimplantar manual na Hostinger enquanto o auto-deploy não estiver funcionando.

## 14. Honestidade sobre resultado

- Site novo, autoridade baixa: espere meses e uns 10 artigos antes de ver padrão em busca. Os derivados sociais dão retorno mais rápido que o SEO.
- O risco não é usar IA no processo, é publicar texto genérico em escala. O que protege é o que a IA sozinha não tem: casos reais, decisões suas, dados com fonte e a sua revisão.
- Sem o generate_lead no ar, o blog não tem como provar retorno. Colocar a medição antes do primeiro artigo.
- Um erro publicado num texto indexado não some em 24 horas como no feed.
- Com dois públicos e um artigo por semana, a categoria de identidade terá um artigo a cada 3 semanas. É pouco para ranquear sozinha no começo; o ganho inicial dela vem mais das redes do que da busca.

## 15. Decisões tomadas (02/11/2026)

1. Região: citar o Vale do Paraíba, nos locais da seção 2 e na página regional da seção 12. Cidades continuam proibidas.
2. Preço: apenas os fatores que formam o preço, sem valores.
3. Cadência: semanal.
4. Cases: todos liberados, menos `essentia`.
5. Categoria Identidade visual: aberta desde já.

## 16. Pendências

1. Confirmar o slug da página regional e se há cases de empresas da região para citar nela.
2. Validar volume de busca das 18 pautas.
3. Colocar o generate_lead no ar antes do primeiro artigo (pacote do Claude Code já enviado).
4. Conferir a fonte da pesquisa de LinkedIn/Gen Z usada na pauta I6.
