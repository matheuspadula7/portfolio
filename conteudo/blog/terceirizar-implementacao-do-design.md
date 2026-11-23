---
status: aprovado
titulo: "Como terceirizar a implementação do design sem retrabalho"
slug: terceirizar-implementacao-do-design
meta_description: "Como passar um design para implementação sem retrabalho: o que a agência entrega, o que o desenvolvedor pergunta e um checklist para os dois lados."
resposta_curta: "O retrabalho na implementação quase sempre nasce na passagem do design, e não no código. Para evitá-lo, o desenvolvedor entra cedo, o arquivo traz as telas em todos os tamanhos e os estados de cada elemento, e os dois lados combinam o que é fixo e o que a equipe edita depois. Reduzir o retrabalho é possível, mas não zerá-lo."
palavra_chave: "terceirizar implementação de design"
tipo: bastidor
pilar: qualidade-e-responsabilidade
publico: b2b-agencia
funil: confianca
case_relacionado: menndel
posts_relacionados:
  - documentacao-de-projeto-de-site
  - site-em-codigo-ou-wordpress
data_publicacao: 2026-11-30
data_atualizacao: 2026-11-23
capa: /assets/blog/terceirizar-implementacao-do-design.jpg
capa_alt: "Duas pessoas vistas de cima, sentadas a uma mesa branca, cada uma com um laptop, trabalhando lado a lado"
capa_credito: "Foto: Ben Spray / Unsplash"
fontes:
  - titulo: "Jake Albaugh e Chad Bergman (Figma), The designer's handbook for developer handoff"
    url: "https://www.figma.com/blog/the-designers-handbook-for-developer-handoff/"
    data: "01/04/2025"
  - titulo: "Ben Shih (Smashing Magazine), Designing A Better Design Handoff File In Figma"
    url: "https://www.smashingmagazine.com/2023/05/designing-better-design-handoff-file-figma/"
    data: "26/05/2023"
faq:
  - p: "O que deve ter um arquivo de design para ser implementado?"
    r: "As telas nos tamanhos que o site vai ter (computador, tablet e celular), os estados de cada elemento interativo, conteúdo parecido com o real, estilos e cores nomeados, camadas com nomes claros e a indicação do que é fixo e do que será editado depois. Sem isso, o desenvolvedor decide sozinho, e o risco de refazer cresce."
  - p: "Quando o desenvolvedor deve entrar no projeto?"
    r: "O quanto antes, de preferência ainda nos esboços. A Figma recomenda levar o desenvolvedor para a conversa nessa fase, para checar o que é viável e apontar estados que faltam."
  - p: "Quem decide o comportamento entre um tamanho de tela e outro?"
    r: "Quem desenha define a intenção e quem implementa define como ela funciona no código. O ideal é anotar no arquivo o que é obrigatório e o que é desejável, para que as telas não precisem ser desenhadas em todos os tamanhos possíveis."
  - p: "Como lidar com mudanças depois que o design foi entregue?"
    r: "Mantendo um único arquivo como fonte oficial, com um registro das mudanças. Assim o desenvolvedor sabe o que mudou e a agência sabe o que já foi implementado."
revisao:
  fatos_conferidos: true
  numeros_com_fonte: true
  cliente_autorizou: n/a
  sem_travessao_e_sem_cidade: true
  sem_valores_de_preco: true
revisar: 'Aprovado pelo Matheus em 23/11/2026, com publicação agendada para 30/11/2026. Pontos que ele conferiu: (1) no Menndel, o ponto de partida foi um arquivo do Figma da equipe interna de marketing e design do escritório e o que evitou retrabalho foi alinhar cedo com a equipe (suas respostas no chat); o resto do caso vem da página do case (Framer, componentes reutilizáveis, CMS, 4 semanas do alinhamento ao site publicado). (2) Estados e interações e versões para tablet e celular como o que mais falta são, segundo você, sua experiência geral, e não do Menndel. (3) As recomendações do checklist vêm da Figma (abril de 2025) e da Smashing (maio de 2023). A última parte do artigo da Figma, cerca de 18 por cento do final, foi lida só por resumo. (4) A frase sobre marcar o que a equipe edita antes de implementar é adaptação minha do caso do Menndel (CMS ativo). (5) Capa: foto de Ben Spray no Unsplash (licença gratuita do Unsplash, 11/11/2021). O nome do fotógrafo veio do perfil exibido na página, sem linha explícita de crédito: confirme em unsplash.com/photos/gEvMA8O6Et4 antes de publicar. Datas: publicação sugerida para segunda, 30/11/2026.'
---

## Por que o retrabalho aparece na passagem do design?

Porque o design e o código são feitos por pessoas diferentes, com perguntas diferentes na cabeça. Quem desenha pensa na tela. Quem implementa pensa no que acontece quando a tela muda de tamanho, quando o texto é maior que o previsto ou quando o botão está desativado. Se essas perguntas só surgem depois que o design foi entregue, o jeito de responder é refazer.

A Figma, no guia que escreveu para designers sobre a passagem para desenvolvimento, recomenda o caminho oposto: levar o desenvolvedor para a conversa cedo, até nos esboços, para checar o que é viável e achar estados que faltam. Essa é a regra que mais pesa, e o resto do texto é consequência dela.

## O que a agência precisa entregar?

Uma pessoa que implementa não precisa de um arquivo perfeito. Precisa de um arquivo que responda às perguntas óbvias. Pelo que a Figma e a Smashing Magazine descrevem, e pelo que vejo no meu trabalho, o essencial é:

- **As telas nos tamanhos que o site vai ter.** Computador, tablet e celular. Mas só isso não basta: o design precisa funcionar entre os tamanhos, e é útil anotar o que muda em cada um.
- **Os estados de cada elemento.** Como o botão fica em repouso, ao passar o mouse, em foco e desativado. Como o formulário aparece com erro. Como a lista aparece vazia.
- **Conteúdo parecido com o real.** Textos longos, nomes compridos e imagens de baixa resolução quebram layouts que só foram testados com texto de exemplo.
- **Estilos e cores nomeados.** Quando o arquivo usa os mesmos nomes que o código, ninguém precisa adivinhar um valor.
- **Camadas com nomes claros.** "Frame 3123" não diz o que é aquela área. Um nome como "cabeçalho" ajuda quem implementa a escolher a estrutura certa.
- **O que é obrigatório e o que é desejável.** Sem essa marcação, tudo parece igualmente importante e o implementador pode gastar horas no que era detalhe.

## O que o implementador precisa fazer?

Perguntar antes de construir, e mostrar o que construiu por etapas. A passagem não termina quando o arquivo é enviado. A Figma sugere ficar disponível para dúvidas depois da entrega, e a Smashing lembra que o arquivo precisa ser lido por quem implementa, e não só enviado.

Do meu lado, três hábitos fazem diferença: repassar o arquivo logo no começo e listar o que está faltando; organizar a estrutura em componentes reutilizáveis, para um ajuste não obrigar a refazer páginas; e combinar, antes de implementar, o que a equipe do cliente vai editar sozinha e o que fica fixo.

## Como isso aconteceu no Menndel & Melo?

O [Menndel & Melo](/menndel) é um escritório tributário com atuação nacional e internacional. A equipe interna de marketing e design do escritório trouxe a direção visual e estratégica, em um arquivo do Figma, e eu fiquei com a implementação completa no Framer.

O que mais evitou retrabalho foi alinhar cedo com a equipe, antes de construir. Foi a conversa, e não uma ferramenta, que tornou o resto previsível. Do alinhamento até o site publicado e funcionando passaram quatro semanas, com componentes reutilizáveis e um CMS ativo, que permite à equipe atualizar casos, publicações e time sem depender de desenvolvedor para cada mudança.

Esse é o exemplo de um lado só da passagem: uma equipe de design bem preparada e um implementador que entra cedo. Em projetos de agência, o arranjo se repete com outro nome: quem desenha entrega, quem implementa devolve perguntas, e os dois ajustam.

## E depois da entrega, como tratar mudanças?

A regra mais simples é manter um único arquivo como fonte oficial. A Smashing recomenda duplicar o arquivo antes de editar e guardar um registro das mudanças e das mudanças planejadas, para o desenvolvedor saber o que mudou desde a última leitura.

Isso conversa com o que escrevi em [documentação de projeto de site](/blog/documentacao-de-projeto-de-site/): as decisões e o motivo de cada uma precisam ficar registradas, ou o próximo profissional refaz o que já foi decidido.

## Quais erros mais aparecem?

- **Entregar só a tela do computador.** O celular costuma ser onde o site mais é aberto, e é onde mais se improvisa quando não há design.
- **Mostrar só o estado padrão.** Hover, erro, vazio e carregando raramente estão no arquivo, e o implementador inventa o que não foi desenhado.
- **Usar texto de exemplo curto.** O layout fecha com três palavras e quebra com a frase real do cliente.
- **Chamar o desenvolvedor só no fim.** Aí as dúvidas viram retrabalho.
- **Não combinar quem edita o quê.** O cliente descobre depois da entrega que não consegue trocar um texto.
- **Mudar o arquivo depois de entregue sem avisar.** O implementador trabalha em uma versão que já não é a oficial.

## O que eu faria

1. Chamaria o implementador antes de fechar as telas e pediria que apontasse o que falta.
2. Entregaria as telas em computador, tablet e celular, com os estados dos elementos que mudam.
3. Usaria conteúdo parecido com o real, ao menos nas áreas que mais variam.
4. Nomearia estilos e camadas, e marcaria o que é obrigatório e o que é desejável.
5. Combinaria, antes de implementar, o que a equipe edita sozinha e o que fica fixo.
6. Manteria um arquivo oficial, com registro das mudanças, e revisaria a implementação em etapas.

## Quando isso não se aplica

Para uma página simples, de uma tela, com um único responsável por design e código, esse cuidado todo é exagero. Vale a regra básica de olhar no celular antes de dar por pronto. O checklist faz diferença quando duas pessoas ou duas equipes dividem o trabalho.
