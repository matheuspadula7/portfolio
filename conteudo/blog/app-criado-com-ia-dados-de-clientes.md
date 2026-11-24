---
status: aprovado
titulo: "App criado com IA funciona no teste. Mas está pronto para dados de clientes?"
slug: app-criado-com-ia-dados-de-clientes
meta_description: "Um app criado com IA pode funcionar e ainda expor dados de clientes. Veja o que checar sobre chaves, acessos e responsável antes de compartilhar."
resposta_curta: "Um app criado com IA que funciona no teste não está, por isso, pronto para usar dados de clientes. Antes de compartilhar, vale saber onde estão as chaves de acesso, o que cada pessoa consegue ver e quem responde se ele parar. A IA escreve o código, mas quem responde pelos dados é uma pessoa."
palavra_chave: "app criado com IA segurança dados de clientes"
tipo: tese
pilar: seguranca-web
publico: b2b-dono
funil: atracao
case_relacionado: ""
posts_relacionados:
  - quem-tem-acesso-ao-seu-site
  - documentacao-de-projeto-de-site
data_publicacao: 2026-11-24
data_atualizacao: 2026-11-24
capa: /assets/blog/app-criado-com-ia-dados-de-clientes-senha.jpg
capa_alt: "Dedo tocando o teclado numérico de uma tela de bloqueio com senha em um tablet"
fontes:
  - titulo: "GitGuardian, The State of Secrets Sprawl 2026 (página do relatório)"
    url: "https://www.gitguardian.com/state-of-secrets-sprawl-report-2026"
    data: "2026"
  - titulo: "OWASP Cheat Sheet Series, Secrets Management Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html"
    data: "acessado em 24/11/2026"
  - titulo: "Presidência da República, Lei nº 13.709/2018 (LGPD), art. 6º"
    url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm"
    data: "14/08/2018"
faq:
  - p: "O que é uma chave de API?"
    r: "É a senha que um programa usa para acessar outro sistema, como uma planilha, um e-mail ou um serviço de IA. Quem tem a chave acessa o sistema como se fosse o app. Por isso ela precisa ficar guardada fora do código."
  - p: "O que fazer se a chave ficou no código do app?"
    r: "Revogar a chave e criar uma nova. Apagar do código não basta, porque quem copiou a chave enquanto ela estava exposta continua com ela. A recomendação da OWASP é revogar e depois trocar."
  - p: "Um app interno também precisa seguir a LGPD?"
    r: "Se ele trata dados pessoais, como nome e contato de clientes, o princípio da segurança da lei se aplica, seja o app interno ou público. Para o seu caso, vale consultar um profissional de direito digital."
  - p: "Devo proibir a equipe de criar apps com IA?"
    r: "Não é o que eu faria. A ideia é criar o hábito de perguntar antes de compartilhar: onde estão as chaves, quem vê o quê e quem responde pelo app."
revisao:
  fatos_conferidos: true
  numeros_com_fonte: true
  cliente_autorizou: n/a
  sem_travessao_e_sem_cidade: true
  sem_valores_de_preco: true
revisar: 'Aprovado pelo Matheus em 24/11/2026, com publicação no mesmo dia (24/11/2026). Pontos que ele conferiu: (1) Os números da GitGuardian (taxa duas vezes maior em commits com IA, 64 por cento dos segredos de 2022 ainda ativos, 32,2 por cento de repositórios internos com segredos contra 5,6 por cento de públicos) vêm da página de apresentação do relatório de 2026, e não do PDF completo. Os dados são de commits no GitHub público e repositórios analisados pela empresa. Vale abrir o PDF e conferir a definição de commit assistido por IA. (2) A OWASP foi lida só até cerca de 47 por cento; as regras sobre revogar e trocar segredos expostos e centralizar em cofre vêm de uma parte lida por resumo. (3) Da LGPD, só o art. 6º, VII foi lido literalmente; não citei o art. 46 nem o 42. A frase de que nome e contato de clientes são em regra dados pessoais é conhecimento geral, sem citação de artigo; o texto diz para consultar profissional de direito digital. (4) A frase sobre proibir levar ao uso escondido é opinião minha, sem fonte. (5) Sem exemplo de caso seu, conforme combinado. O texto não afirma que você entregou apps a clientes. (6) Capa: foto enviada pelo Matheus (tela de bloqueio com senha em um tablet), recortada em 21:9; fotógrafo e licença ainda NÃO confirmados, preencher capa_credito. A tela mostra texto da interface do sistema do aparelho, que o recorte remove em parte. Inspirado no formato do post de Demian dos Santos no LinkedIn, mas com tema, dados e estrutura próprios; não reproduz o texto dele. Data de publicação antecipada de 30/11 para 24/11/2026 a pedido dele.'
---

## O app funcionar no teste significa que ele está pronto?

Não. Ferramentas de IA permitem que alguém sem formação técnica descreva uma ideia e tenha um app rodando no mesmo dia. Isso é bom. O problema vem depois: o app é ligado à planilha de clientes, ao e-mail ou ao sistema de vendas, e alguém compartilha o link com a equipe.

Funcionar é uma pergunta. Estar seguro com dados de clientes é outra, e o teste só responde à primeira.

Eu desenvolvo com IA e uso essas ferramentas todo dia. Por isso digo: ela entrega código que roda, mas quem responde pelo que esse código faz com os dados é uma pessoa.

## O que os dados mostram?

O relatório The State of Secrets Sprawl 2026, da GitGuardian, analisou commits (registros de alteração de código) no GitHub público. Segundo a página do relatório, os commits feitos com ajuda de IA vazaram credenciais, como chaves e senhas, em uma taxa duas vezes maior.

Outro número do mesmo relatório mostra que descobrir o vazamento não resolve: dos segredos detectados em 2022, 64% ainda estavam ativos e podiam ser usados quatro anos depois. O que falta, na maioria dos casos, é revogar a chave.

Esses dados vêm de repositórios públicos. Em um app interno, o risco é outro, mas o hábito que causa o problema é o mesmo: deixar a chave dentro do código.

## O que é uma chave de API e onde ela deve ficar?

Uma chave de API é a senha que um programa usa para acessar outro sistema. Se ela está escrita no código do app, qualquer pessoa que veja o código passa a acessar a planilha, o e-mail ou o serviço de IA como se fosse o app.

A OWASP, organização de referência em segurança de aplicações, recomenda manter os segredos centralizados em um cofre de segredos, em vez de espalhados pelo código. Também recomenda dar a cada pessoa e a cada sistema só o acesso de que precisa e, quando um segredo é exposto, revogá-lo e trocá-lo. Apagar do código não basta.

## E a lei?

A LGPD define, no art. 6º, inciso VII, o princípio da segurança: o uso de medidas técnicas e administrativas capazes de proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão.

Nome e contato de clientes são, em regra, dados pessoais. O princípio vale para quem trata esses dados, e não distingue se o app levou quatro minutos ou quatro meses para ser feito. Isso não substitui orientação jurídica: para o seu caso, converse com um profissional de direito digital.

## "Mas é só uma ferramenta interna"

É um argumento comum, e não se sustenta bem por dois motivos.

O primeiro: interno não significa sem dados. Se o app lê a lista de clientes, ele trata dados pessoais, mesmo que só a equipe o acesse.

O segundo: interno não significa mais seguro. Segundo o mesmo relatório da GitGuardian, os repositórios internos tinham seis vezes mais chance de conter segredos fixados no código do que os públicos: 32,2% contra 5,6%. A minha leitura é que a sensação de estar entre colegas faz relaxar o cuidado, mas isso é interpretação minha, e não parte do relatório.

## O que eu faria

1. Antes de compartilhar o app, testaria com a conta de alguém que tem permissão limitada e veria o que essa pessoa enxerga. Se ela vê a planilha inteira, o app não está pronto.
2. Procuraria as chaves no código. Se estiverem lá, as moveria para um cofre de segredos e trocaria as chaves antigas, porque elas já foram expostas.
3. Definiria quem responde se o app parar e quem decide se ele continua quando passar a usar dados reais.
4. Registraria o app em um inventário simples: quem criou, que sistemas acessa, quem tem acesso e onde as credenciais estão guardadas. É o mesmo modelo do texto sobre [documentação de projeto de site](/blog/documentacao-de-projeto-de-site/).
5. Chamaria alguém técnico para revisar antes de o app tocar dados de clientes. É o mesmo cuidado que descrevo em [quem tem acesso ao seu site](/blog/quem-tem-acesso-ao-seu-site/).

Proibir a equipe de criar apps com IA não é o caminho. Na minha opinião, isso empurra o uso para fora da vista, e aí ninguém pergunta nada.

## Quando isso não se aplica

Se o app é um teste pessoal, com dados fictícios e sem acesso a nenhum sistema da empresa, o risco é baixo. Mesmo assim, qualquer chave de acesso deve ficar fora do código desde o início, porque é nesse hábito que o app de teste vira app de verdade.
