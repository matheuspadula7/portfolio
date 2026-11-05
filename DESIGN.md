# Design system — Padula Design Studio

Atualizado em 05/11/2026. Troca de fonte de marca: **Bricolage Grotesque → Cabinet Grotesk**.

## Por quê

Bricolage Grotesque virou a fonte-clichê de site/conteúdo gerado com IA (variable, grátis no Google Fonts, terminal de bola nas letras lida como "tech-friendly mas genérico"). Cabinet Grotesk (Fontshare, gratuita) tem o mesmo peso visual e a mesma lógica de uso, mas com terminais mais retos e confiantes, e está fora da vitrine do Google Fonts, então muito menos saturada.

Comparativo visual: `CONTEÚDOS - 2026/font-test/cabinet.png`

## Tipografia

| Papel | Fonte | Fonte de carregamento |
|---|---|---|
| Display / títulos | **Cabinet Grotesk** | Fontshare CDN: `https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@300,400,500,700,800&display=swap` |
| Corpo de texto | **Inter** | Google Fonts |
| Labels / mono / dados | **JetBrains Mono** | Google Fonts |

Pesos disponíveis na Cabinet Grotesk: 200, 300, 400, 500, 700, 800, 900 (não existe 600 — qualquer uso antigo em 600 vira 700).

**Fallback:** `'Cabinet Grotesk', sans-serif` (não usar `serif` como fallback — era um resíduo herdado da Bricolage, corrigido na troca).

**Sem eixo `wdth` variável.** Diferente da Bricolage, a Cabinet Grotesk não tem largura variável — qualquer efeito de "encolher"/condensar texto (como o salto de escala 400%→100% nos Reels) precisa ser feito via `transform: scaleX()`, não via `font-stretch`. Qualquer `font-variation-settings` herdado de Bricolage (`"opsz"`, `"wdth"`) fica inofensivo (ignorado pelo navegador) mas pode ser limpo com o tempo.

## Itálico forçado

A Cabinet Grotesk (assim como a Bricolage) não tem itálico de verdade — só pesos retos. O itálico de marca é sempre sintético, forçado via CSS:

```css
font-style: italic;
```

Uso típico: a segunda linha de um título de duas linhas, pra marcar a virada/afirmação (ex.: "Presença digital que faz você ser *levado a sério.*").

## Pesos e hierarquia

Em vez de depender só de cor pra hierarquia, usar contraste de peso:

- **Light (200–300)** para contexto/introdução.
- **Bold/Black (700–900)** + itálico pra afirmação, dado, ou fechamento.

Exemplo: `IA produz.` (200) / `Humano responde.` (900, cor de destaque).

## Cor de marca

Dourado `#EBBE38` continua o acento único da marca — sem mudança.

## Regras de texto que continuam valendo

- Sem travessão (—) em nenhuma peça.
- Nunca deixar palavra sozinha na última linha de um bloco de texto.

## Onde já foi aplicado

- Site (`matheuspadula.com.br`): todas as páginas (`index.html`, `curriculo.html`, `briefing-identidade-visual.html`, blog inteiro em pt-BR e en) e os três componentes compartilhados (`components/layout.css`, `components/blog.css`, `components/showcase.css`).
- Carrossel "Quem Tem Acesso" (`CONTEÚDOS - 2026/Carrossel - Quem Tem Acesso/`): já nasceu com Bricolage, ainda não migrado.

## Pendente

- Peças antigas em `CONTEÚDOS - 2026/` (Reels, Carrosséis anteriores) continuam em Bricolage Grotesque — migrar sob demanda, não em massa, pra não reabrir peças já aprovadas/publicadas sem necessidade.
- Motor de animação dos Reels (`Reels - Feed Aluguel/html/index.html` e similares): trocar o mecanismo de escala de `font-stretch` para `scaleX()` antes de adotar Cabinet Grotesk nesse pipeline.
