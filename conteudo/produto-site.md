# matheuspadula.com.br como produto

Versão 0.2, 27/11/2026. Base: código na `main` (commit `c947a41`) e respostas do Matheus. Documento interno: não vai para o servidor, mas está no repositório, por isso não leva senha, endereço de servidor, nome de conta nem número de desempenho.

Marcas usadas no texto: **[código]** conferido no repositório, **[Matheus]** resposta dele, **[a confirmar]** ainda sem resposta.

## 1. Resumo

Site próprio da Padula Design Studio: portfólio, páginas de serviço, currículo e blog. HTML, CSS e JavaScript escritos direto, sem framework, com um gerador próprio para o blog. **[código]**

## 2. Objetivo e quem usa

**Objetivo principal:** mostrar o trabalho, para atrair clientes e para apresentar o portfólio a recrutadores. **[Matheus]**

| Quem chega | O que procura | Onde encontra |
|---|---|---|
| Dono de negócio | Ver se o trabalho serve para ele | Home, cases, criação de sites, landing page, identidade visual |
| Agência ou designer | Quem implemente um design | Implementação de design, cases de implementação |
| Recrutador | Experiência e formação | Currículo (página e PDF em PT e EN) |
| Leitor de busca ou de rede social | Resposta para uma dúvida | Blog |

A divisão por público é leitura do código e da linha editorial. **[a confirmar]**

As páginas de serviço que entraram em 26/11/2026 não mudam o objetivo: o centro continua sendo mostrar o trabalho. **[Matheus]**

## 3. Histórico

- Primeiro: site em WordPress. Depois: Framer. Por fim: código. **[Matheus]**
- 18/04/2026: primeiro commit da versão em código. **[código]**
- 05/11/2026: troca da fonte de marca. **[código, DESIGN.md]**
- 26/11/2026: páginas de serviço. **[código]**
- Até 27/11/2026: 192 commits, 133 deles com coautoria do Claude registrada. **[código]**

## 4. Mapa do site

- **Home:** apresentação, sobre, serviços, diferenciais, portfólio, depoimentos e contato.
- **Cases:** uma página por projeto, de site e de identidade visual.
- **Serviços:** `/criacao-de-sites`, `/identidade-visual`, `/landing-page`, `/implementacao-de-design`.
- **Apoio:** currículo, briefing de identidade visual, página de redirecionamento para o WhatsApp.
- **Blog:** índice, artigos, RSS e sitemap próprio.
- **Idiomas:** português como principal e inglês por alternância nas páginas. O blog tem índice em inglês, ainda sem artigos.

## 5. Decisões

### 5.1 Código, sem WordPress nem framework
- **Contexto:** o site passou por WordPress e depois por Framer. No Framer, o plano gratuito não permitia domínio próprio, e um plano pago não compensava. Já havia uma conta de hospedagem ativa, e a escolha foi manter tudo nela. **[Matheus]**
- **Decisão:** HTML, CSS e JavaScript próprios.
- **Motivos:** controle total do design, velocidade e simplicidade, provar capacidade de entregar em código, e o Desenvolvimento com IA tornou isso viável. **[Matheus]**
- **Alternativas descartadas:** pagar um plano do Framer. Voltar ao WordPress ou usar um framework: **[a confirmar]** se chegaram a ser avaliados.
- **Consequências:** liberdade de design e poucas peças. Em troca, componentes, traduções e ajustes são mantidos à mão. **[código]**

### 5.2 Menu, rodapé e estilos compartilhados
- Arquivos em `components/`, carregados pelas páginas, para não repetir menu e rodapé. **[código]**
- As traduções para inglês ficam em um dicionário dentro de `components/layout.js`. **[código]**

### 5.3 Blog em Markdown com gerador próprio
- Cada artigo é um arquivo de texto com metadados. Um script em Node gera páginas, índice, RSS e sitemap. Só duas bibliotecas. **[código]**
- O gerador recusa artigo aprovado com erro: revisão incompleta, termos proibidos, links entre categorias, tamanho de descrição. **[código]**
- As páginas geradas ficam versionadas, para o blog aparecer mesmo em um deploy que não rode o gerador. **[código, conteudo/README.md]**

### 5.4 Nada vai ao ar sem aprovação
- Rascunho, revisão em um quadro próprio, aprovação, commit, PR, merge. **[código e processo]**
- A IA redige e o Matheus confere fatos e aprova.

### 5.5 Publicação automática
- Cada mudança na `main` gera o blog e envia o site por conexão criptografada. Uma rotina diária publica artigos agendados. **[código]**
- Limite conhecido: o horário da rotina diária não é pontual, e já houve artigo agendado que só saiu com disparo manual (18/11/2026).

### 5.6 Cabinet Grotesk no lugar da Bricolage
- **Motivo:** a Bricolage virou fonte comum em material gerado com IA. **[código, DESIGN.md]**
- **Alternativa descartada:** manter a Bricolage.
- **Consequência:** peças antigas de redes sociais ainda usam a fonte anterior.

## 6. Sistema visual

| Item | Valor |
|---|---|
| Fundo | `#0A0A0A`, painéis `#161616` |
| Texto | `#F5F5F0`, secundário `#A8A8A0` |
| Destaque único | dourado `#EBBE38` |
| Títulos | Cabinet Grotesk |
| Corpo | Inter |
| Rótulos e dados | JetBrains Mono |
| Capas de banco de imagens | dessaturadas, escurecidas, com toque dourado, por CSS |

Regras de texto: sem travessão, sem palavra sozinha na última linha. Fontes: `DESIGN.md` e `components/layout.css`.

## 7. Medição

- Google Analytics 4, Microsoft Clarity e um script de estatísticas em subdomínio próprio. **[código]**
- Evento `generate_lead` em cliques de WhatsApp, e-mail, telefone e envio de formulário, com o local do clique. **[código]**
- Marcação do próprio navegador como tráfego interno, para não contar as visitas do dono. **[código]**
- Search Console com linha de base registrada em 26/11/2026 (números fora do repositório).
- Se o objetivo está sendo cumprido: ainda em avaliação, sem devolutiva concreta até 27/11/2026. **[Matheus]** Falta definir que sinal vai responder isso.

## 8. Segurança

- Cabeçalhos: HSTS, proteção contra troca de tipo de arquivo e contra uso em quadro de outro site, política de referência e de permissões. **[código]**
- Arquivos e pastas ocultos bloqueados; conteúdo-fonte e scripts não são enviados ao servidor. **[código]**
- Contato para relato de falhas em `/.well-known/security.txt`. **[código]**
- Credenciais de publicação guardadas como segredos do repositório, fora do código. **[código]**

### Inventário de acessos (sem credenciais)

| Sistema | Quem tem acesso | Verificação em duas etapas | Onde a credencial está |
|---|---|---|---|
| Domínio | a preencher | a preencher | a preencher |
| Hospedagem | a preencher | a preencher | a preencher |
| Repositório | a preencher | a preencher | a preencher |
| Analytics, Clarity, Search Console | a preencher | a preencher | a preencher |
| Estatísticas próprias | a preencher | a preencher | a preencher |
| E-mail e redes | a preencher | a preencher | a preencher |

## 9. O que ainda não está bom

- **Falta de documentação:** decisões só na cabeça ou em conversas. Este documento é o primeiro passo. **[Matheus]**

Observações encontradas no código, para ele avaliar:

- 12 imagens, em 7 páginas, ainda são carregadas dos servidores do Framer. Se saírem do ar, os cases ficam sem imagem. **[código]**
- O inventário de acessos está vazio.
- A rotina diária de publicação não tem horário garantido.
- As traduções concentradas em um arquivo grande dificultam a manutenção.

## 10. O que pode ser contado em público

**Pode:** objetivo, decisões e motivos, sistema visual, fluxo de aprovação, o que é medido, os limites conhecidos.

**Não vai:** detalhes de servidor e de envio de arquivos, nomes de contas e de segredos, inventário de acessos preenchido, números de analytics (a menos que o Matheus decida publicar algum).

## 11. Perguntas em aberto

1. Por que o WordPress foi deixado antes do Framer?
2. Que sinal vai mostrar que o site cumpre o objetivo (contato de cliente, convite de recrutador, retorno direto de quem visitou)?
3. Quem tem acesso a cada sistema, e há verificação em duas etapas em todos?
