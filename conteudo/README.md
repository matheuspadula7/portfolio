# Conteúdo do blog

Cada artigo é um arquivo Markdown em `blog/`. Copie `blog/_MODELO.md` para começar.

## Fluxo semanal

1. Eu proponho a pauta e escrevo o rascunho (`rascunho: true`, com a data prevista).
2. Você revisa o texto e confere o que estiver em `revisar:` (fatos, números, tom).
3. Quando estiver aprovado, troque `rascunho: true` por `rascunho: false` e faça o merge na `main`.
4. O deploy gera o HTML e publica. Se a `data` for futura, o post entra sozinho no dia (o deploy roda todo dia às 08:00, horário de Brasília).

## Idiomas

- Português: `meu-post.md` → `/blog/meu-post/`
- Inglês: `my-post.en.md` com `idioma: en` → `/en/blog/my-post/`
- Para ligar as duas versões, preencha `par:` nos dois arquivos com o slug do outro.

## Capas

- Fotos de banco (Unsplash/Pexels) ficam em `assets/blog/`, 1600×900, até ~200 KB, e entram com `capa:`, `capa_alt:` e `capa_credito:`.
- Toda capa recebe automaticamente o tratamento da marca (escuro, dessaturado, toque amarelo). Só use `capa_original: true` quando a imagem não puder ser alterada (por exemplo, print de projeto de cliente).
- Sem `capa:`, o site gera uma capa tipográfica.

## Ver no computador

```bash
npm install
npm run blog:preview   # inclui rascunhos e posts agendados
```

Depois sirva a pasta do site (por exemplo, `python -m http.server 8080`) e abra `http://localhost:8080/blog/`.
Sem `--rascunhos` (`npm run blog`), você vê exatamente o que iria para produção.

As pastas `blog/` e `en/` na raiz são geradas e ficam fora do git.
