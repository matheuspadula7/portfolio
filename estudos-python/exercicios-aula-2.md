# Exercícios · Lógica de Programação e Algoritmos · Aula 2

Base: texto da Aula 2 (Prof. Vinicius Pozzobon Borin). Todos os exercícios usam só o que a aula ensinou:
`print`, operadores, variáveis, strings, f-strings, `len` e `input`.

## Como usar esta lista

1. Faça os exercícios **na ordem**. Cada um usa o que o anterior ensinou.
2. Para cada um: leia **O que você vai praticar**, tente sozinho, rode, e só então olhe os **Erros comuns**.
3. Crie um arquivo por exercício no VS Code (por exemplo `ex_01.py`) e rode no terminal com `py ex_01.py`.
4. **Para eu corrigir**, me mande: o número do exercício, o seu código e o que apareceu na tela (ou o erro inteiro, copiado). Eu digo se está certo, explico o porquê e, se não estiver, mostro onde a conta ou a lógica se desviou.
5. Travou? Peça uma dica antes de pedir a resposta. Você aprende mais descobrindo o último passo sozinho.

Dois hábitos que valem ouro desde o começo:

- **Antes de rodar, escreva em um comentário o que você espera que apareça.** Depois compare. Se der diferente, é aí que você aprende.
- **Erros não são falhas.** A última linha da mensagem de erro diz o que aconteceu (`NameError`, `SyntaxError`, `TypeError`...). Leia ela primeiro.

---

## Parte 1 · Saída e operadores (Tema 2)

### Exercício 1 · print sem aspas

**O que você vai praticar:** a diferença entre texto literal e código.

**Conceito.** A função `print` mostra algo na tela. O que fica **entre aspas** é tratado como texto e aparece exatamente como foi escrito. O que fica **sem aspas** o Python tenta interpretar como código: um número, uma conta ou o nome de uma variável.

```python
print('Olá, Mundo!')   # texto: aparece Olá, Mundo!
print(2 + 3)           # conta: aparece 5
print('2 + 3')         # texto: aparece 2 + 3
```

**Enunciado.** Execute o `print` com uma mensagem qualquer, mas **sem nenhum tipo de aspas**. Por exemplo `print(Olá, Mundo!)`. Depois responda por escrito: **o que aconteceu? Por quê?**

**Roteiro.**
1. Rode o código sem aspas e leia a mensagem de erro.
2. Tente de novo com uma palavra só: `print(Olá)`. O erro muda? Por quê?
3. Coloque as aspas e confirme que funciona.

**Como saber que acertou:** você consegue explicar, com as suas palavras, o que o Python tentou fazer com o que estava sem aspas.

**Desafio extra:** o que acontece com `print("Olá, 'Mundo'!")`? E com `print('Olá, "Mundo"!')`? Qual é a regra?

---

### Exercício 2 · `/` ou `//`?

**O que você vai praticar:** os operadores aritméticos e a diferença entre divisão normal e divisão inteira.

**Conceito.** Os operadores do Python:

| Operador | Operação | Exemplo | Resultado |
|---|---|---|---|
| `+` | adição | `7 + 2` | `9` |
| `-` | subtração | `7 - 2` | `5` |
| `*` | multiplicação | `7 * 2` | `14` |
| `/` | divisão (com casas decimais) | `7 / 2` | `3.5` |
| `//` | divisão (só a parte inteira) | `7 // 2` | `3` |
| `%` | resto da divisão | `7 % 2` | `1` |
| `**` | potência | `7 ** 2` | `49` |

A ordem das contas é a da matemática: potência, depois multiplicação e divisão, depois soma e subtração. **Parênteses mandam em tudo.**

**Enunciado.** A expressão abaixo calcula 10 × (5 + 7) ÷ 4:

```python
print(10 * (5 + 7) / 4)
```

1. Rode e anote o resultado.
2. Troque o `/` por `//` e rode de novo. O que mudou?
3. Agora troque o `4` por `7` **nas duas versões** (`/` e `//`) e compare.
4. Responda: por que, com o 4, o valor parece igual, e com o 7 fica claramente diferente?

**Como saber que acertou:** você explica que `/` sempre devolve um número com casas decimais, que `//` descarta a parte decimal, e porque com o 4 a conta é exata.

**Desafio extra:** use `%` para descobrir o resto de `17 // 5`. Qual é a relação entre `//`, `%` e a divisão original?

---

### Exercício 3 · Expressões matemáticas

**O que você vai praticar:** traduzir matemática para Python respeitando a precedência.

**Conceito.** No papel escrevemos `×`, `÷` e expoentes pequenos. No Python, você troca por `*`, `/` e `**`. Quando a conta tem agrupamentos, os **parênteses** do Python fazem o mesmo papel dos parênteses do papel.

**Enunciado.** Escreva e imprima cada expressão, **cada uma em um `print`**:

- a) 2 + 3 × 3
- b) 4² ÷ 3
- c) (9² + 2) × 6 − 1

**Roteiro.**
1. Resolva cada uma **no papel primeiro**, passo a passo, e anote o resultado esperado.
2. Escreva em Python e compare com o seu resultado do papel.
3. Se não bateu, descubra o passo em que a conta do Python e a do papel se separaram.

**Erros comuns.**
- Usar `^` para potência. No Python é `**`.
- Esquecer um parêntese ou fechar o do `print` no lugar errado. Conte: cada `(` precisa de um `)`.
- Escrever `9**2+2*6-1`, que não é a mesma coisa que `(9**2+2)*6-1`.

**Desafio extra:** quebre a letra c) em variáveis (`base`, `soma`, `total`) e imprima cada passo. Isso é a base do "teste de mesa".

---

## Parte 2 · Variáveis e tipos (Tema 3)

### Exercício 4 · O sentido da vida

**O que você vai praticar:** criar uma variável e usá-la dentro de um `print`.

**Conceito.** Uma **variável** é um nome que guarda um valor na memória. Você cria com `=` (atribuição) e usa pelo nome:

```python
idade = 30
print(idade)            # 30
print('Tenho', idade)   # Tenho 30
```

Regras para o nome: só letras, números e `_`; não pode começar com número; maiúsculas e minúsculas são diferentes (`idade` ≠ `Idade`); e evite nomes que o Python já usa, como `print`.

Quando você mistura **texto e variável** no mesmo `print`, separe com **vírgula**. O Python coloca um espaço entre as partes.

**Enunciado.** Douglas Adams escreveu que a resposta para o sentido da vida, do Universo e de tudo mais é **42**. Guarde esse valor em uma variável e imprima uma frase que mostre a variável e diga que ela é o sentido da vida.

**Como saber que acertou:** a tela mostra uma frase completa com o 42 dentro dela, e o `42` vem **da variável**, não digitado dentro da frase.

**Desafio extra:** mude o valor da variável para 43 e rode de novo. Quantas linhas do seu código você precisou alterar? Isso é a vantagem de usar variáveis.

---

### Exercício 5 · Aprovado ou não?

**O que você vai praticar:** variáveis lógicas (booleanas) e operadores de comparação.

**Conceito.** Uma variável **booleana** guarda só dois valores: `True` ou `False` (com a primeira letra maiúscula). Ela nasce de uma **comparação**:

| Operador | Pergunta | Exemplo (`a = 1`, `b = 5`) |
|---|---|---|
| `==` | é igual? | `a == b` → `False` |
| `!=` | é diferente? | `a != b` → `True` |
| `>` | é maior? | `a > b` → `False` |
| `<` | é menor? | `a < b` → `True` |
| `>=` | é maior ou igual? | `a >= b` → `False` |
| `<=` | é menor ou igual? | `a <= b` → `True` |

Atenção: `=` **guarda** um valor; `==` **compara**. São coisas diferentes.

**Enunciado.** Crie uma variável com a nota de um aluno. Crie outra variável que receba o resultado da comparação entre a nota e **7** (a média): deve ser `True` se a nota for **maior ou igual** a 7. Imprima esse resultado.

**Roteiro.**
1. Rode com a nota 8 (esperado: `True`).
2. Rode com a nota 7 (esperado: `True`). Por que a igualdade conta?
3. Rode com a nota 6.9 (esperado: `False`).

**Desafio extra:** o que muda se você usar `>` em vez de `>=`? Com qual nota a diferença aparece?

---

## Parte 3 · Strings (Tema 4)

### Exercício 6 · Linguagens de programação

**O que você vai praticar:** concatenação, quebra de linha, tabulação e multiplicação de strings.

**Conceito.**
- **Concatenar** é juntar textos com `+`: `'Ola' + ' ' + 'Mundo'` vira `Ola Mundo`. Só funciona entre **textos**. Texto + número dá erro.
- `\n` dentro do texto faz uma **quebra de linha** (enter).
- `\t` faz uma **tabulação** (tab).
- Multiplicar um texto repete ele: `'-' * 5` vira `-----`.

```python
print('A' + 'B')        # AB
print('A\nB')           # A  (linha de baixo)  B
print('=' * 10)         # ==========
```

**Enunciado.** Guarde em uma variável string e imprima exatamente isto, em duas linhas:

```
Linguagens de programação:
Python ----- C ----- Java ----- PHP
```

Use `\n` para quebrar a linha e o **multiplicador de strings** para os traços.

**Dica de raciocínio.** Os traços têm espaço antes e depois (` ----- `). Pense em montar um separador e reusá-lo entre as linguagens.

**Erros comuns.**
- Esquecer os espaços ao redor dos traços.
- Colocar `\n` fora das aspas.
- Usar `/n` (barra errada). O certo é a barra invertida `\`.

**Desafio extra:** refaça usando `\t` entre as linguagens em vez dos traços.

---

### Exercício 7 · Comida, nascimento e divisão

**O que você vai praticar:** composição de strings (clássica e f-string) e o cuidado com tipos.

**Conceito.** Para montar uma frase com variáveis dentro dela, há duas formas:

```python
comida = 'pizza'
ano = 1995

# Clássica: marcadores {} e .format()
msg1 = 'Gosto de {} e nasci em {}'.format(comida, ano)

# Moderna: f-string (o f antes das aspas, variáveis entre chaves)
msg2 = f'Gosto de {comida} e nasci em {ano}'
```

Com `+` você precisaria converter o número em texto (`str(ano)`). A composição evita esse trabalho.

**Enunciado.**
1. Crie três variáveis: o nome da sua **comida favorita**; o seu **ano de nascimento**; e o **resultado da divisão** do ano de nascimento pela sua idade.
2. Guarde, em uma quarta variável (string), uma mensagem com todas essas informações.
3. Faça a mensagem **das duas maneiras**: pela clássica (`.format`) e pela f-string. Imprima as duas e compare.

**Atenção:** para dividir pelo valor da idade, você precisa de uma variável `idade` também. Você pode digitar o valor ou calculá-lo (ano atual − ano de nascimento).

**Como saber que acertou:** as duas mensagens saem idênticas e mostram todas as informações.

**Desafio extra:** o resultado da divisão sai com muitas casas decimais. Pesquise como limitar a duas casas dentro da f-string (dica: `{resultado:.2f}`) e explique o que o `:.2f` significa.

---

### Exercício 8 · Nome curto?

**O que você vai praticar:** tamanho de string com `len` e comparação com resultado booleano.

**Conceito.** A função `len(texto)` devolve quantos **caracteres** o texto tem. Espaços e pontuação também contam.

```python
print(len('Lógica de Programação'))   # 21
```

Você pode guardar o resultado de uma comparação direto numa variável: `curto = len(nome) <= 15`.

**Enunciado.** Crie uma variável string com o seu **nome completo**. Crie uma segunda variável, booleana, com o resultado da comparação que verifica se o **tamanho do nome é menor ou igual a 15**. Imprima a variável booleana.

**Roteiro.**
1. Antes de rodar, conte à mão quantos caracteres o seu nome tem, **incluindo os espaços**.
2. Rode e confira se o `len` bate com a sua contagem.
3. Troque o nome por um bem longo e veja a variável virar `False`.

**Desafio extra:** imprima o próprio `len(nome)` também. Seu nome tem quantos caracteres exatamente?

---

## Parte 4 · Entrada de dados (Tema 5)

### Conceito comum aos quatro exercícios

A função `input()` **pergunta** algo ao usuário e devolve o que ele digitou. Detalhe fundamental: **o resultado é sempre texto**, mesmo que a pessoa digite um número.

```python
x = input('Digite um número: ')   # digitou 5
print(x + x)                      # 55  (junta os textos!)
```

Para fazer conta, é preciso **converter** (casting):

- `int(...)` para números inteiros: `int(input('Idade: '))`
- `float(...)` para números com casas decimais: `float(input('Preço: '))`

Um exercício com `input` tem sempre três blocos: **entrada** (pergunta), **processamento** (a conta) e **saída** (`print`).

---

### Exercício 9 · Soma de dois inteiros (2.1)

**Enunciado.** Peça ao usuário **dois números inteiros** e imprima a **soma** deles.

**Roteiro.**
1. Peça o primeiro número com `input` e converta com `int`.
2. Peça o segundo da mesma forma.
3. Calcule e imprima uma frase com o resultado.

**Teste de mesa.** Se o usuário digitar 3 e 4, a tela deve mostrar uma soma de **7**. Se aparecer `34`, o que você esqueceu?

**Desafio extra:** faça a mesma conta com `float` e digite `2.5` e `1.5`. O que muda na saída?

---

### Exercício 10 · Total de segundos (2.2)

**Enunciado.** Peça ao usuário uma quantidade de **dias, horas, minutos e segundos** (nessa ordem). Calcule o **total de segundos** e imprima.

**Conceito de apoio.** 1 minuto = 60 s; 1 hora = 60 × 60 = 3600 s; 1 dia = 24 × 3600 = 86 400 s.

**Teste de mesa.**
- Entradas 1, 2, 3, 4 (1 dia, 2 h, 3 min, 4 s) → **93 784** segundos.
- Entradas 0, 0, 1, 30 → **90** segundos.

Faça essas contas **no papel antes** de programar. Se o programa der outro resultado, a falha está na sua fórmula.

**Desafio extra:** faça o caminho inverso: peça segundos e mostre quantos dias, horas, minutos e segundos são. (Dica: `//` e `%`.)

---

### Exercício 11 · Desconto no produto (2.3)

**Enunciado.** Peça o **preço** de um produto e o **percentual de desconto** (nessa ordem). Calcule e mostre o **valor do desconto** e o **preço final**.

**Conceito de apoio.**
- valor do desconto = preço × percentual ÷ 100
- preço final = preço − valor do desconto

Use `float`, porque preço tem centavos.

**Teste de mesa.**
- Preço 100, desconto 10% → desconto **10**, final **90**.
- Preço 250, desconto 20% → desconto **50**, final **200**.

**Desafio extra:** mostre os valores sempre com duas casas decimais (`:.2f`) e com o símbolo `R$`.

---

### Exercício 12 · Celsius para Fahrenheit (2.4)

**Enunciado.** Converta uma temperatura de Celsius (C) para Fahrenheit (F), com a equação:

```
F = 9 × C / 5 + 32
```

Peça C ao usuário e imprima F.

**Roteiro.**
1. Leia C com `float` (temperatura pode ter casas decimais).
2. Transcreva a equação para Python **sem inventar**: troque `×` por `*` e mantenha a ordem.
3. Imprima as duas temperaturas, com texto dizendo qual é qual.

**Teste de mesa.**
- 0 °C → **32** °F
- 100 °C → **212** °F
- 37 °C → **98,6** °F

**Desafio extra:** faça o contrário (Fahrenheit para Celsius), isolando C na equação: `C = (F − 32) × 5 / 9`.

---

## Para fechar a aula

Quando terminar, tente responder **sem consultar**:

1. Qual a diferença entre `'2' + '3'` e `2 + 3`?
2. Por que `input()` precisa de `int()` ou `float()` para fazer contas?
3. Qual a diferença entre `=` e `==`?
4. O que `/`, `//` e `%` fazem com o número 17 e o 5?
5. Quando usar f-string em vez de `+`?

Se alguma resposta não vier, me diga qual e a gente reforça com exemplos.
