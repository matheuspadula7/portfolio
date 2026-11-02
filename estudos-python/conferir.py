"""Confere os exercícios do Lab de Python direto do terminal.

Uso (dentro da pasta estudos-python):
    py conferir.py ex_2_1.py        confere um exercício
    py conferir.py                  confere todos os ex_*.py da pasta

Ele roda o seu arquivo como um programa de verdade, entrega as respostas
do input() sozinho e compara a saída com o esperado. Os casos são os mesmos
do botão "Testar" do Lab (lab/exercicios.js).
"""
import os
import re
import subprocess
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

PASTA = os.path.dirname(os.path.abspath(__file__))

# codigo: verificações no texto do arquivo (regex, mensagem)
# casos:  entradas (respostas do input), numeros, contem, linhas, booleano, saida_nao_vazia
EXERCICIOS = {
    "ex_fixacao.py": {
        "codigo": [(r"\*\*", "Use ** para a potência (4² e 9²).")],
        "casos": [{"numeros": [11, 5.3333, 497]}],
    },
    "ex_sentido_da_vida.py": {
        "codigo": [(r"^\s*\w+\s*=\s*42\b", "Guarde o 42 em uma variável (ex.: sentido = 42).")],
        "casos": [{"numeros": [42], "contem": ["vida"]}],
    },
    "ex_nota_media.py": {
        "codigo": [(r">=", "Use o operador >= na comparação.")],
        "casos": [{"booleano": True}],
    },
    "ex_linguagens.py": {
        "codigo": [
            (r"\\n", "Use \\n para a quebra de linha."),
            (r"""['"]\s*-\s*['"]\s*\*\s*\d|\d\s*\*\s*['"]\s*-""",
             "Use o multiplicador de strings para os traços (ex.: '-' * 5)."),
        ],
        "casos": [{"linhas": ["Linguagens de programação:", "Python ----- C ----- Java ----- PHP"]}],
    },
    "ex_fstring.py": {
        "codigo": [(r"""\bf['"]""", "Monte a mensagem com uma f-string (f'...{variavel}...').")],
        "casos": [{"saida_nao_vazia": True}],
    },
    "ex_tamanho_nome.py": {
        "codigo": [(r"len\s*\(", "Use a função len() para medir o nome.")],
        "casos": [{"booleano": True}],
    },
    "ex_2_1.py": {
        "casos": [
            {"entradas": ["3", "4"], "numeros": [7]},
            {"entradas": ["10", "-2"], "numeros": [8]},
        ],
    },
    "ex_2_2.py": {
        "casos": [
            {"entradas": ["1", "2", "3", "4"], "numeros": [93784]},
            {"entradas": ["0", "0", "1", "30"], "numeros": [90]},
        ],
    },
    "ex_2_3.py": {
        "casos": [
            {"entradas": ["100", "10"], "numeros": [10, 90]},
            {"entradas": ["250", "20"], "numeros": [50, 200]},
        ],
    },
    "ex_2_4.py": {
        "casos": [
            {"entradas": ["0"], "numeros": [32]},
            {"entradas": ["100"], "numeros": [212]},
            {"entradas": ["37"], "numeros": [98.6]},
        ],
    },
}


def numeros_de(texto):
    achados = re.findall(r"-?\d+(?:[.,]\d+)?", texto)
    return [float(a.replace(",", ".")) for a in achados]


def normalizar(texto):
    texto = re.sub(r"[ \t]+", " ", texto)
    texto = re.sub(r" ?\n ?", "\n", texto)
    return texto.strip()


def formatar(n):
    return str(round(n, 4)).replace(".", ",")


def rodar(arquivo, entradas):
    """Roda o arquivo como programa; devolve (saida, erro)."""
    env = dict(os.environ, PYTHONIOENCODING="utf-8", PYTHONUTF8="1")
    stdin = "".join(e + "\n" for e in (entradas or []))
    try:
        r = subprocess.run(
            [sys.executable, arquivo],
            input=stdin, capture_output=True, text=True,
            encoding="utf-8", timeout=5, env=env,
        )
    except subprocess.TimeoutExpired:
        return "", "Demorou mais de 5 segundos (laço infinito, ou input() esperando uma resposta que não veio?)."
    erro = r.stderr.strip() if r.returncode != 0 else None
    return r.stdout, erro


def conferir_saida(caso, saida):
    falhas = []
    achados = numeros_de(saida)
    for esperado in caso.get("numeros", []):
        if not any(abs(a - esperado) < 0.01 for a in achados):
            falhas.append(f"Esperava ver o número {formatar(esperado)} na saída.")
    for trecho in caso.get("contem", []):
        if trecho.lower() not in saida.lower():
            falhas.append(f"Esperava ver o texto “{trecho}” na saída.")
    if "linhas" in caso:
        esperado = "\n".join(caso["linhas"])
        if normalizar(saida) != normalizar(esperado):
            falhas.append("Saída diferente da esperada. Esperado:\n" + esperado)
    if caso.get("booleano") and not re.fullmatch(r"\s*(True|False)\s*", saida):
        falhas.append("Esperava imprimir apenas True ou False.")
    if caso.get("saida_nao_vazia") and not saida.strip():
        falhas.append("Seu programa não imprimiu nada.")
    return falhas


def conferir(nome):
    """Confere um arquivo. Devolve True se passou em tudo."""
    config = EXERCICIOS[nome]
    caminho = os.path.join(PASTA, nome)
    if not os.path.isfile(caminho):
        print(f"- {nome}: arquivo não encontrado.")
        return False

    with open(caminho, encoding="utf-8") as f:
        codigo = f.read()

    print(f"\n{nome}")
    tudo_certo = True

    for padrao, mensagem in config.get("codigo", []):
        if not re.search(padrao, codigo, re.M):
            print(f"  ✗ Estrutura do código: {mensagem}")
            tudo_certo = False

    for i, caso in enumerate(config["casos"], start=1):
        entradas = caso.get("entradas")
        saida, erro = rodar(caminho, entradas)
        falhas = [f"Erro ao executar:\n{erro}"] if erro else conferir_saida(caso, saida)
        titulo = f"Caso {i}" + (f" · entradas: {' '.join(entradas)}" if entradas else "")
        if falhas:
            tudo_certo = False
            print(f"  ✗ {titulo}")
            for falha in falhas:
                for linha in falha.splitlines():
                    print(f"      {linha}")
        else:
            print(f"  ✓ {titulo}")

    print("  Tudo certo! Marque como feito no Lab." if tudo_certo else "  Ainda não passou. Leia as mensagens acima e tente de novo.")
    return tudo_certo


def main():
    alvos = [os.path.basename(a) for a in sys.argv[1:]]
    if not alvos:
        alvos = [n for n in sorted(EXERCICIOS) if os.path.isfile(os.path.join(PASTA, n))]
    experimentos = [a for a in alvos if a.startswith("exp_")]
    if experimentos:
        print("Experimento não tem conferência automática: " + ", ".join(experimentos))
        print("Rode o arquivo, observe o resultado e leia a explicação no Lab.")
        alvos = [a for a in alvos if a not in experimentos]
        if not alvos:
            return 0
    desconhecidos = [a for a in alvos if a not in EXERCICIOS]
    if desconhecidos:
        print("Não conheço este(s) arquivo(s): " + ", ".join(desconhecidos))
        print("Os que eu confiro: " + ", ".join(sorted(EXERCICIOS)))
        return 2
    resultados = [conferir(a) for a in alvos]
    if len(resultados) > 1:
        print(f"\n{sum(resultados)} de {len(resultados)} exercícios passaram.")
    return 0 if all(resultados) else 1


if __name__ == "__main__":
    sys.exit(main())
