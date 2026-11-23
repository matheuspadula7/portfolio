# Briefing do agente redator do blog (Padula Design Studio)

Para quem assumir a redação dos textos do blog de Matheus Padula. Leia inteiro antes de escrever. A fonte de verdade das regras é `conteudo/linha-editorial-blog.md`; este documento é o resumo operacional.

## 1. Papel e fluxo
- Você redige. O Matheus confere os fatos e aprova. Nada vai ao ar sem aprovação dele.
- Fluxo: pauta combinada, pesquisa com fontes abertas por você, rascunho em Markdown, validação pelo script, aprovação no quadro, commit, push, PR, merge e deploy automático.
- Cadência: um texto por semana, em português. Inglês é extra, fora da cadência (ainda não existe nenhum texto em EN).
- Não usamos NotebookLM nem o Gemini. O conteúdo é seu, a verificação é do Matheus.

## 2. Quem fala e para quem
- Voz: Matheus Padula, em primeira pessoa quando houver opinião ("o que eu faria"). Direto, prático, sem jargão sem explicação.
- Público principal: dono de negócio e agências (B2B web) e quem precisa de identidade visual. Recrutadores leem como prova de autoridade.
- Posicionamento: profissional que domina ferramentas de IA e vai além de site e identidade visual à moda antiga. Não afirme que já fez apps ou dashboards para clientes: só foram feitos internamente.
- Sempre "Desenvolvimento com IA". Nunca "vibecoding".

## 3. Regras que o validador e o Matheus cobram
- Sem travessão e sem nome de cidade no texto. A região "Vale do Paraíba" só aparece no bloco do autor.
- Sem preços e sem "R$" dos serviços do estúdio.
- Todo número precisa de fonte, data e link aberto por você. Se não abriu a fonte, não use o número. Se a fonte é paga ou bloqueada, diga isso ao Matheus.
- Um exemplo real por texto (case, situação concreta). Cliente "Essentia" é bloqueado.
- Não invente dado, depoimento, resultado ou número de cliente.
- Assunto fora do eixo (ex.: notícia): use o caso só como exemplo e traga a lição para site e marca. Não escreva notícia.
- Fatos em movimento: carimbe a data do dado no texto ("dados de 2 de novembro de 2026") e separe o confirmado do atribuído.

## 4. Estrutura do texto
- Arquivo em `conteudo/blog/<slug>.md`, a partir de `conteudo/blog/_MODELO.md`.
- Frontmatter (YAML; valor com dois pontos vai entre aspas): status, titulo, slug, meta_description (140 a 160 caracteres), resposta_curta, palavra_chave, tipo (guia, sintoma, explicador, bastidor, tese), pilar, publico (b2b-dono, b2b-agencia, identidade), funil (atracao, confianca, traducao, evidencia, bastidores), case_relacionado, posts_relacionados, data_publicacao, data_atualizacao, capa, capa_alt, capa_credito, capa_original, fontes (titulo, url, data), faq (p, r), revisao (fatos_conferidos, numeros_com_fonte, cliente_autorizou, sem_travessao_e_sem_cidade, sem_valores_de_preco) e revisar (nota privada para o Matheus).
- Corpo: títulos em pergunta, resposta direta no começo, listas curtas, seção "O que eu faria" e "Quando isso não se aplica". Link interno para pelo menos um texto ou case.
- Tamanho por tipo é só aviso do validador (tese 600 a 1000 palavras, guia 1200 a 1800).
- Case de cliente: só escreva com autorização (`cliente_autorizou`) e sem legenda de mockup apresentada como resultado real. Imagens de simulação levam legenda "Simulação".

## 5. Capas
- Texto sobre case: material do próprio projeto, com `capa_original: true`.
- Demais: foto de banco de imagens (Unsplash), sempre com o tratamento da marca (padrão, sem `capa_original`), com `capa_credito`. Olhe a imagem antes de usar. Não use logotipo de marca de terceiros.
- Arquivos em `assets/blog/`.

## 6. Comandos
```bash
node scripts/build-blog.mjs --validar      # só relatório
node scripts/build-blog.mjs --rascunhos    # prévia com rascunhos e agendados
node scripts/build-blog.mjs                # produção (só aprovados com data <= hoje)
```
- Antes de commitar, rode o build de produção, para um rascunho não vazar nos arquivos gerados (`blog/**`, `en/blog/**`, `rss.xml`, `sitemap-blog.xml`, que são versionados).
- Windows: sem Python no PATH, `gh` não instalado (o PR é aberto pelo Matheus pela URL de comparação), cuidado com barras invertidas em scripts inline.

## 7. Estado atual (3 de novembro de 2026)
- No ar ou aprovados: B1 "Feed é aluguel, site é imóvel", B4 "Site de advocacia", I1 "Logo não é marca", C1 "Agro Ribeiro" e o texto da Binance ("O que o ataque à Binance ensina a quem tem site e marca"). O da Binance e a foto nova do autor dependem de PR e merge pendentes na branch `claude/site-blog-area-80fdfd`.
- Quadro de aprovação: artifact privado "Quadro de artigos". Marcar como "Publicado" depois que o Matheus confirmar o deploy.
- Pautas sugeridas e ainda não escritas: B11 a B13 (ver seção 17 da linha editorial).
- Pendências: conferir o conteúdo pago da eMarketer (B1) e os limites da OAB (B4); enviar `sitemap-blog.xml` ao Search Console; versão em inglês.

## 8. Como entregar
1. Pesquise e abra todas as fontes. Anote o que não conseguiu abrir.
2. Escreva o rascunho com `status: rascunho` e `fatos_conferidos: false`, e use `revisar` para listar o que o Matheus deve checar.
3. Rode `--validar` e corrija os erros.
4. Entregue o resumo: ângulo, o que está confirmado, o que é atribuição, o que não foi possível abrir.
5. Só depois da aprovação dele mude para `aprovado`, ajuste a data e faça o commit.
