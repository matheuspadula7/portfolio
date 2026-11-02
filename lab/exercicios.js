/*
  Exercícios do Lab de Python.
  Para adicionar uma aula nova: acrescente um objeto em MODULOS com seus exercícios.

  Tipos de exercício:
    - "teste":   o botão "Testar" roda o código com as entradas de cada caso e confere a saída.
    - "explorar": experimento livre; não tem teste, só explicação para ler depois de tentar.

  Cada caso de teste pode ter:
    entradas  lista de respostas que o input() vai receber
    numeros   números que precisam aparecer na saída (tolerância de 0,01)
    contem    textos que precisam aparecer na saída
    linhas    saída exata, linha a linha (espaços repetidos são ignorados)
    booleano  true se a saída precisa ser True ou False
  codigoDeve: verificações no texto do código (regex), para exigir f-string, len(), etc.
*/
/* Arquivo de cada exercício na pasta estudos-python (usado para mostrar o comando no Lab). */
window.ARQUIVOS = {
    "a2-print-sem-aspas": "exp_print_sem_aspas.py",
    "a2-divisao-inteira": "exp_divisao.py",
    "a2-fixacao-expressoes": "ex_fixacao.py",
    "a3-sentido-da-vida": "ex_sentido_da_vida.py",
    "a3-nota-media": "ex_nota_media.py",
    "a4-linguagens": "ex_linguagens.py",
    "a4-fstring": "ex_fstring.py",
    "a4-tamanho-nome": "ex_tamanho_nome.py",
    "a5-ex-2-1": "ex_2_1.py",
    "a5-ex-2-2": "ex_2_2.py",
    "a5-ex-2-3": "ex_2_3.py",
    "a5-ex-2-4": "ex_2_4.py"
};

window.MODULOS = [
  {
    id: "aula-2",
    disciplina: "Lógica de Programação e Algoritmos",
    titulo: "Aula 2",
    resumo: "Primeiros passos em Python: print, operadores, variáveis, strings e input.",
    exercicios: [
      /* ---------- Tema 2: saída e operadores ---------- */
      {
        id: "a2-print-sem-aspas",
        tema: "Tema 2 · Função de saída",
        titulo: "print sem aspas",
        tipo: "explorar",
        enunciado:
          "Execute a função print para escrever uma mensagem qualquer, mas <b>sem usar nenhum tipo de aspas</b>. O que aconteceu? Por quê?",
        starter: "print(Olá, Mundo!)\n",
        explicacao:
          "Sem aspas, o Python não entende <code>Olá, Mundo!</code> como texto. Ele tenta interpretar cada palavra como um <b>nome</b> (de variável ou função) que ainda não existe, e dá erro (aqui, <code>SyntaxError</code>, porque a vírgula e o ponto de exclamação também não fazem sentido soltos). Com uma palavra só, como <code>print(Olá)</code>, o erro seria <code>NameError: name 'Olá' is not defined</code>.<br><br>Regra: o que está entre aspas é <b>texto literal</b>; o que está fora é <b>código</b> a ser calculado ou um nome a ser procurado.",
        gabarito: "print('Olá, Mundo!')\n"
      },
      {
        id: "a2-divisao-inteira",
        tema: "Tema 2 · Operadores",
        titulo: "/ ou // ?",
        tipo: "explorar",
        enunciado:
          "A expressão <code>10*(5+7)/4</code> dá <code>30.0</code>. Troque o símbolo da divisão por duas barras (<code>//</code>). O que aconteceu com o resultado? Depois troque o 4 por 7 nas duas versões e compare.",
        starter: "print(10*(5+7)/4)\nprint(10*(5+7)//4)\n",
        explicacao:
          "<code>/</code> é a divisão <b>com casas decimais</b> e sempre devolve um número de ponto flutuante (<code>30.0</code>). <code>//</code> é a divisão <b>só da parte inteira</b> e devolve <code>30</code> quando os dois lados são inteiros.<br><br>Com o 4 a conta é exata (120 ÷ 4), então só muda o tipo: <code>30.0</code> contra <code>30</code>. Com o 7, aparece a diferença de verdade: <code>/</code> dá <code>17.142857…</code> e <code>//</code> dá <code>17</code>, descartando o resto.",
        gabarito: "print(10*(5+7)/7)\nprint(10*(5+7)//7)\n"
      },
      {
        id: "a2-fixacao-expressoes",
        tema: "Tema 2 · Exercícios de fixação",
        titulo: "Expressões matemáticas",
        tipo: "teste",
        enunciado:
          "Escreva em Python e imprima o resultado de cada expressão, <b>cada uma em um print</b>:<br>a) 2 + 3 × 3<br>b) 4² ÷ 3<br>c) (9² + 2) × 6 − 1",
        starter: "# a)\nprint()\n# b)\nprint()\n# c)\nprint()\n",
        dica: "Multiplicação é <code>*</code>, potência é <code>**</code> e divisão é <code>/</code>. Use parênteses onde a expressão pedir.",
        codigoDeve: [{ re: "\\*\\*", msg: "Use ** para a potência (4² e 9²)." }],
        casos: [{ numeros: [11, 5.3333, 497] }],
        gabarito: "print(2 + 3 * 3)\nprint(4 ** 2 / 3)\nprint((9 ** 2 + 2) * 6 - 1)\n"
      },
      /* ---------- Tema 3: variáveis ---------- */
      {
        id: "a3-sentido-da-vida",
        tema: "Tema 3 · Variáveis numéricas",
        titulo: "O sentido da vida",
        tipo: "teste",
        enunciado:
          "Armazene em uma variável o sentido da vida, do Universo e tudo mais (<b>42</b>, segundo Douglas Adams). Imprima uma mensagem que mostre essa variável junto de uma frase dizendo que ela é o sentido da vida.",
        starter: "# crie a variável e imprima a frase\n",
        dica: "Para juntar texto e número no mesmo print, separe com vírgula: <code>print('texto', variavel)</code>.",
        codigoDeve: [{ re: "^\\s*\\w+\\s*=\\s*42\\b", flags: "m", msg: "Guarde o 42 em uma variável (ex.: sentido = 42)." }],
        casos: [{ numeros: [42], contem: ["vida"] }],
        gabarito: "sentido = 42\nprint('O sentido da vida é', sentido)\n"
      },
      {
        id: "a3-nota-media",
        tema: "Tema 3 · Variáveis lógicas",
        titulo: "Aprovado ou não?",
        tipo: "teste",
        enunciado:
          "Crie uma variável com a nota de um aluno. Crie outra com o resultado da comparação entre a nota e <b>7</b> (a média para aprovação): verdadeiro se a nota for <b>maior ou igual</b> a 7. Imprima o resultado.",
        starter: "nota = \n",
        dica: "O operador de &ldquo;maior ou igual&rdquo; é <code>&gt;=</code>.",
        codigoDeve: [{ re: ">=", msg: "Use o operador >= na comparação." }],
        casos: [{ booleano: true }],
        gabarito: "nota = 8.5\naprovado = nota >= 7\nprint(aprovado)\n"
      },
      /* ---------- Tema 4: strings ---------- */
      {
        id: "a4-linguagens",
        tema: "Tema 4 · Concatenação",
        titulo: "Linguagens de programação",
        tipo: "teste",
        enunciado:
          "Imprima, a partir de uma variável string, exatamente isto (duas linhas):<pre>Linguagens de programação:\nPython ----- C ----- Java ----- PHP</pre>Use <code>\\n</code> para a quebra de linha e o multiplicador de strings (<code>'-' * 5</code>) para os traços.",
        starter: "# monte a string e imprima\n",
        dica: "<code>'-' * 5</code> vira <code>-----</code>. Junte tudo com <code>+</code>.",
        codigoDeve: [
          { re: "\\\\n", msg: "Use \\n para a quebra de linha." },
          { re: "['\"]\\s*-\\s*['\"]\\s*\\*\\s*\\d|\\d\\s*\\*\\s*['\"]\\s*-", msg: "Use o multiplicador de strings para os traços (ex.: '-' * 5)." }
        ],
        casos: [{ linhas: ["Linguagens de programação:", "Python ----- C ----- Java ----- PHP"] }],
        gabarito:
          "traco = ' ' + '-' * 5 + ' '\ns = 'Linguagens de programação:\\n' + 'Python' + traco + 'C' + traco + 'Java' + traco + 'PHP'\nprint(s)\n"
      },
      {
        id: "a4-fstring",
        tema: "Tema 4 · Composição",
        titulo: "Comida, nascimento e divisão",
        tipo: "teste",
        enunciado:
          "Crie três variáveis: sua comida favorita, seu ano de nascimento e o resultado da divisão do ano de nascimento pela sua idade. Guarde em uma quarta variável (string) uma mensagem com tudo isso e imprima. Resolva pela <b>f-string</b>.<br><small>Dica extra do curso: resolva também pela maneira clássica (<code>.format</code>) e compare.</small>",
        starter: "comida = \nnascimento = \nresultado = \n",
        dica: "f-string: <code>f'Gosto de {comida}'</code>. Confira que as chaves estão dentro das aspas.",
        codigoDeve: [{ re: "\\bf['\"]", msg: "Monte a mensagem com uma f-string (f'...{variavel}...')." }],
        casos: [{ saidaNaoVazia: true }],
        gabarito:
          "comida = 'lasanha'\nnascimento = 1995\nidade = 31\nresultado = nascimento / idade\nmsg = f'Minha comida favorita é {comida}, nasci em {nascimento} e {nascimento} / {idade} = {resultado:.2f}'\nprint(msg)\n"
      },
      {
        id: "a4-tamanho-nome",
        tema: "Tema 4 · Tamanho (len)",
        titulo: "Nome curto?",
        tipo: "teste",
        enunciado:
          "Crie uma variável string com o seu nome completo. Crie uma variável booleana que receba o resultado de verificar se o tamanho do nome é <b>menor ou igual a 15</b>. Imprima a booleana.",
        starter: "nome = \n",
        dica: "<code>len(nome)</code> devolve o tamanho. Espaços também contam.",
        codigoDeve: [{ re: "len\\s*\\(", msg: "Use a função len() para medir o nome." }],
        casos: [{ booleano: true }],
        gabarito: "nome = 'Matheus Padula'\ncurto = len(nome) <= 15\nprint(curto)\n"
      },
      /* ---------- Tema 5: input e exercícios resolvidos ---------- */
      {
        id: "a5-ex-2-1",
        tema: "Tema 5 · Exercício 2.1",
        titulo: "Soma de dois inteiros",
        tipo: "teste",
        enunciado:
          "Solicite ao usuário <b>dois números inteiros</b> e imprima a soma deles na tela.",
        starter: "x = int(input('Digite um número inteiro: '))\n",
        dica: "<code>input()</code> sempre devolve texto. Converta com <code>int()</code> antes de somar, senão <code>'3' + '4'</code> vira <code>'34'</code>.",
        casos: [
          { entradas: ["3", "4"], numeros: [7] },
          { entradas: ["10", "-2"], numeros: [8] }
        ],
        gabarito:
          "x = int(input('Digite um número inteiro: '))\ny = int(input('Digite outro número inteiro: '))\nprint(f'O resultado da soma de {x} com {y} é {x + y}.')\n"
      },
      {
        id: "a5-ex-2-2",
        tema: "Tema 5 · Exercício 2.2",
        titulo: "Total de segundos",
        tipo: "teste",
        enunciado:
          "Solicite ao usuário uma quantidade de <b>dias, horas, minutos e segundos</b> (nessa ordem). Calcule o total de segundos e imprima.",
        starter: "dias = int(input('Dias: '))\n",
        dica: "1 dia = 24 × 3600 s; 1 hora = 3600 s; 1 minuto = 60 s.",
        casos: [
          { entradas: ["1", "2", "3", "4"], numeros: [93784] },
          { entradas: ["0", "0", "1", "30"], numeros: [90] }
        ],
        gabarito:
          "dias = int(input('Dias: '))\nhoras = int(input('Horas: '))\nminutos = int(input('Minutos: '))\nsegundos = int(input('Segundos: '))\ntotal = dias * 24 * 3600 + horas * 3600 + minutos * 60 + segundos\nprint(f'Total de segundos: {total}')\n"
      },
      {
        id: "a5-ex-2-3",
        tema: "Tema 5 · Exercício 2.3",
        titulo: "Desconto no produto",
        tipo: "teste",
        enunciado:
          "Solicite o <b>preço</b> de um produto e o <b>percentual de desconto</b> (nessa ordem). Calcule e exiba o valor do desconto e o preço final.",
        starter: "preco = float(input('Preço: '))\n",
        dica: "desconto = preço × percentual ÷ 100. Preço final = preço − desconto. Use <code>float()</code>, pois preço tem centavos.",
        casos: [
          { entradas: ["100", "10"], numeros: [10, 90] },
          { entradas: ["250", "20"], numeros: [50, 200] }
        ],
        gabarito:
          "preco = float(input('Preço: '))\npercentual = float(input('Desconto (%): '))\ndesconto = preco * percentual / 100\nfinal = preco - desconto\nprint(f'Desconto: {desconto}')\nprint(f'Preço final: {final}')\n"
      },
      {
        id: "a5-ex-2-4",
        tema: "Tema 5 · Exercício 2.4",
        titulo: "Celsius para Fahrenheit",
        tipo: "teste",
        enunciado:
          "Converta uma temperatura de Celsius (C) para Fahrenheit (F). A equação é <code>F = 9 × C / 5 + 32</code>. Peça C ao usuário e imprima F.",
        starter: "C = float(input('Digite uma temperatura em Celsius: '))\n",
        dica: "Transcreva a equação direto: <code>F = (9 * C / 5) + 32</code>.",
        casos: [
          { entradas: ["0"], numeros: [32] },
          { entradas: ["100"], numeros: [212] },
          { entradas: ["37"], numeros: [98.6] }
        ],
        gabarito:
          "C = float(input('Digite uma temperatura em Celsius: '))\nF = (9 * C / 5) + 32\nprint('Celsius:', C, 'Fahrenheit:', F)\n"
      }
    ]
  }
];
