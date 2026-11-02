# Conteúdo do blog

A linha editorial (regras, pilares, pautas, cadência) está em `linha-editorial-blog.md`. Cada artigo é um arquivo Markdown em `blog/`; copie `blog/_MODELO.md` para começar. As regras que o gerador valida ficam em `../scripts/blog-regras.json` (cases liberados, cidades e termos proibidos, tamanhos).

## Fluxo semanal

1. Eu escrevo o rascunho com `status: rascunho`. O campo `revisar:` lista o que você precisa conferir (não é publicado).
2. Você revisa o texto e marca a checklist em `revisao:` (tudo `true`).
3. Aprovando, troque `status: rascunho` por `status: aprovado` e faça o merge na `main`.
4. O deploy valida e gera o HTML. Se algum post aprovado tiver erro, o build **falha com a lista de erros** e nada é publicado. Se a `data_publicacao` for futura, o post entra sozinho no dia (o deploy roda todo dia às 08:00, horário de Brasília).

Posts com `status: publicado` continuam no ar. O status só diferencia o que já foi ao ar do que está agendado.

## Idiomas

- Português: `meu-post.md` → `/blog/meu-post/`
- Inglês: `my-post.en.md` com `idioma: en` → `/en/blog/my-post/`
- Para ligar as duas versões, preencha `par:` nos dois arquivos com o slug do outro. O inglês é um extra e não entra na cadência semanal.

## Derivados para redes sociais

Roteiros de carrossel, legendas e textos de LinkedIn ficam em `blog/slug.derivados.md`. O gerador ignora esses arquivos e eles não vão para o servidor.

## Capas

- Fotos de banco (Unsplash/Pexels) ficam em `assets/blog/`, 1600×900, até ~200 KB, e entram com `capa:`, `capa_alt:` e `capa_credito:`.
- Toda capa recebe automaticamente o tratamento da marca (escuro, dessaturado, toque amarelo). Só use `capa_original: true` quando a imagem não puder ser alterada (por exemplo, print de projeto de cliente).
- Sem `capa:`, o site gera uma capa tipográfica.

## Comandos

```bash
npm install
npm run blog:validar   # relatório de erros e avisos de todos os posts, inclusive rascunhos
npm run blog:preview   # gera o blog com rascunhos e agendados, para ver no navegador
npm run blog           # exatamente o que vai para produção
```

Para ver no navegador, sirva a pasta do site (por exemplo, `python -m http.server 8080`) e abra `http://localhost:8080/blog/`.

As pastas `blog/` e `en/` e o `sitemap-blog.xml` na raiz são **gerados, mas ficam versionados no git**, para o blog aparecer em qualquer forma de deploy (inclusive o "Reimplantar" do painel da Hostinger, que não roda o gerador). Por isso, antes de cada commit de artigo, rode `npm run blog` (nunca `blog:preview`, que inclui rascunhos). O deploy do GitHub Actions também regenera tudo e é quem publica posts agendados pela data.
