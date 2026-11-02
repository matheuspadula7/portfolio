(function () {
  "use strict";

  var MODULO = window.MODULOS[0];
  var EXS = MODULO.exercicios;
  var CHAVE = "lab-python:" + MODULO.id;

  var $ = function (id) { return document.getElementById(id); };

  /* ---------- armazenamento (localStorage pode falhar) ---------- */
  var estado = { atual: 0, feitos: {}, codigos: {} };
  try {
    var salvo = JSON.parse(localStorage.getItem(CHAVE) || "null");
    if (salvo && typeof salvo === "object") {
      estado.atual = Math.min(Math.max(+salvo.atual || 0, 0), EXS.length - 1);
      estado.feitos = salvo.feitos || {};
      estado.codigos = salvo.codigos || {};
    }
  } catch (e) {}
  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) {}
  }

  /* ---------- Pyodide ---------- */
  var pyodide = null;
  var pronto = false;

  var PY_RUNNER = [
    "import sys, io, builtins, traceback",
    "def _rodar(codigo, entradas, pedir):",
    "    saida = io.StringIO()",
    "    fila = list(entradas) if entradas is not None else None",
    "    def _input(prompt=''):",
    "        saida.write(str(prompt))",
    "        if fila is not None:",
    "            if not fila:",
    "                raise EOFError('O programa pediu mais entradas do que o teste fornece.')",
    "            v = str(fila.pop(0))",
    "        else:",
    "            v = pedir(str(prompt))",
    "            if v is None:",
    "                raise EOFError('Entrada cancelada.')",
    "            v = str(v)",
    "        saida.write(v + '\\n')",
    "        return v",
    "    ant_out, ant_in = sys.stdout, builtins.input",
    "    sys.stdout, builtins.input = saida, _input",
    "    erro = None",
    "    try:",
    "        exec(compile(codigo, '<seu codigo>', 'exec'), {'__name__': '__main__'})",
    "    except BaseException:",
    "        et, ev, tb = sys.exc_info()",
    "        quadros = [f for f in traceback.extract_tb(tb) if f.filename == '<seu codigo>']",
    "        erro = ''.join(traceback.format_list(quadros) + traceback.format_exception_only(et, ev))",
    "    finally:",
    "        sys.stdout, builtins.input = ant_out, ant_in",
    "    return [saida.getvalue(), erro]"
  ].join("\n");

  function definirStatus(tipo, texto) {
    $("dot").className = "dot " + tipo;
    $("status-txt").textContent = texto;
  }

  function iniciarPython() {
    if (typeof loadPyodide !== "function") {
      definirStatus("off", "Não consegui carregar o Python (sem internet?)");
      return;
    }
    loadPyodide().then(function (py) {
      pyodide = py;
      py.globals.set("pedir_js", function (prompt) { return window.prompt(prompt || "input()"); });
      py.runPython(PY_RUNNER);
      pronto = true;
      definirStatus("on", "Python pronto");
      atualizarBotoes();
    }).catch(function (e) {
      definirStatus("off", "Erro ao iniciar o Python");
      console.error(e);
    });
  }

  function executar(codigo, entradas) {
    var rodar = pyodide.globals.get("_rodar");
    var pedir = pyodide.globals.get("pedir_js");
    var res = rodar(codigo, entradas || null, pedir);
    var arr = res.toJs();
    res.destroy();
    rodar.destroy();
    pedir.destroy();
    return { saida: arr[0], erro: arr[1] };
  }

  /* ---------- correção ---------- */
  function numerosDe(texto) {
    var m = texto.match(/-?\d+(?:[.,]\d+)?/g) || [];
    return m.map(function (s) { return parseFloat(s.replace(",", ".")); });
  }
  function norm(s) { return s.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n").trim(); }
  function fmtNum(n) { return String(+n.toFixed(4)).replace(".", ","); }

  function conferir(caso, saida) {
    var falhas = [];
    if (caso.numeros) {
      var achados = numerosDe(saida);
      caso.numeros.forEach(function (esp) {
        var ok = achados.some(function (a) { return Math.abs(a - esp) < 0.01; });
        if (!ok) falhas.push("Esperava ver o número " + fmtNum(esp) + " na saída.");
      });
    }
    if (caso.contem) {
      caso.contem.forEach(function (t) {
        if (saida.toLowerCase().indexOf(t.toLowerCase()) < 0) falhas.push("Esperava ver o texto “" + t + "” na saída.");
      });
    }
    if (caso.linhas) {
      var esperado = caso.linhas.join("\n");
      if (norm(saida) !== norm(esperado)) falhas.push("Saída diferente da esperada. Esperado:\n" + esperado);
    }
    if (caso.booleano && !/^\s*(True|False)\s*$/.test(saida)) {
      falhas.push("Esperava imprimir apenas True ou False.");
    }
    if (caso.saidaNaoVazia && !saida.trim()) falhas.push("Seu programa não imprimiu nada.");
    return falhas;
  }

  /* ---------- interface ---------- */
  var ex = null;
  var elCodigo, elSaida, elCasos, elResumo, btnRodar, btnTestar;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function desenharLista() {
    var html = "";
    var temaAtual = "";
    EXS.forEach(function (e, i) {
      if (e.tema !== temaAtual) {
        temaAtual = e.tema;
        html += '<div class="grupo">' + esc(temaAtual) + "</div>";
      }
      html += '<button type="button" class="item' + (estado.feitos[e.id] ? " feito" : "") + '" data-i="' + i + '"' +
        (i === estado.atual ? ' aria-current="true"' : "") + '><span class="chk"></span><span>' + esc(e.titulo) +
        '</span><span class="tag">' + (e.tipo === "teste" ? "teste" : "explorar") + "</span></button>";
    });
    $("lista").innerHTML = html;
    var feitos = EXS.filter(function (e) { return estado.feitos[e.id]; }).length;
    $("bar").style.width = Math.round(feitos / EXS.length * 100) + "%";
    $("bar-txt").textContent = feitos + " de " + EXS.length + " concluídos";
  }

  function desenharExercicio() {
    ex = EXS[estado.atual];
    var codigo = estado.codigos[ex.id];
    if (typeof codigo !== "string") codigo = ex.starter;
    var teste = ex.tipo === "teste";

    $("main").innerHTML =
      '<div class="eyebrow">' + esc(ex.tema) + "</div>" +
      "<h1>" + esc(ex.titulo) + "</h1>" +
      '<div class="enun">' + ex.enunciado + "</div>" +
      '<div class="painel"><div class="rotulo"><label for="codigo">Seu código</label><span>Tab insere espaços · Ctrl+Enter roda</span></div>' +
      '<textarea id="codigo" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off"></textarea>' +
      '<div class="acoes">' +
      '<button class="btn pri" type="button" id="rodar" disabled>Rodar</button>' +
      (teste ? '<button class="btn" type="button" id="testar" disabled>Testar</button>' : "") +
      (ex.dica ? '<button class="btn sutil" type="button" id="dica">Dica</button>' : "") +
      '<button class="btn sutil" type="button" id="gabarito">' + (teste ? "Ver gabarito" : "Ver explicação") + "</button>" +
      (teste ? "" : '<button class="btn sutil" type="button" id="marcar">' + (estado.feitos[ex.id] ? "Desmarcar como feito" : "Marcar como feito") + "</button>") +
      '<button class="btn sutil" type="button" id="resetar">Restaurar código inicial</button>' +
      "</div></div>" +
      '<div class="painel"><div class="rotulo"><span>Saída</span></div><div class="saida vazia" id="saida" aria-live="polite">A saída do programa aparece aqui.</div></div>' +
      (teste ? '<div class="painel" id="area-testes" hidden><div class="rotulo"><span>Testes</span></div><ul class="casos" id="casos"></ul><div class="resumo" id="resumo"></div></div>' : "") +
      '<div class="box" id="box-dica" hidden><h3>Dica</h3><div>' + (ex.dica || "") + "</div></div>" +
      '<div class="box" id="box-gab" hidden></div>' +
      '<div class="nav"><button class="btn" type="button" id="ant"' + (estado.atual === 0 ? " disabled" : "") + '>← Anterior</button>' +
      '<button class="btn" type="button" id="prox"' + (estado.atual === EXS.length - 1 ? " disabled" : "") + ">Próximo →</button></div>";

    elCodigo = $("codigo");
    elCodigo.value = codigo;
    elSaida = $("saida");
    elCasos = $("casos");
    elResumo = $("resumo");
    btnRodar = $("rodar");
    btnTestar = $("testar");

    elCodigo.addEventListener("input", function () {
      estado.codigos[ex.id] = elCodigo.value;
      salvar();
    });
    elCodigo.addEventListener("keydown", function (ev) {
      if (ev.key === "Tab" && !ev.shiftKey) {
        ev.preventDefault();
        var s = elCodigo.selectionStart, f = elCodigo.selectionEnd;
        elCodigo.setRangeText("    ", s, f, "end");
        elCodigo.dispatchEvent(new Event("input"));
      } else if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        if (pronto) rodarManual();
      }
    });
    btnRodar.addEventListener("click", rodarManual);
    if (btnTestar) btnTestar.addEventListener("click", testar);
    if ($("dica")) $("dica").addEventListener("click", function () { $("box-dica").hidden = !$("box-dica").hidden; });
    $("gabarito").addEventListener("click", mostrarGabarito);
    if ($("marcar")) $("marcar").addEventListener("click", function () {
      if (estado.feitos[ex.id]) delete estado.feitos[ex.id]; else estado.feitos[ex.id] = true;
      salvar(); desenharLista(); desenharExercicio();
    });
    $("resetar").addEventListener("click", function () {
      elCodigo.value = ex.starter;
      elCodigo.dispatchEvent(new Event("input"));
    });
    $("ant").addEventListener("click", function () { ir(estado.atual - 1); });
    $("prox").addEventListener("click", function () { ir(estado.atual + 1); });
    atualizarBotoes();
  }

  function atualizarBotoes() {
    if (btnRodar) btnRodar.disabled = !pronto;
    if (btnTestar) btnTestar.disabled = !pronto;
  }

  function ir(i) {
    if (i < 0 || i >= EXS.length) return;
    estado.atual = i;
    salvar();
    desenharLista();
    desenharExercicio();
    window.scrollTo({ top: 0 });
  }

  function mostrarSaida(res) {
    var html = "";
    if (res.saida) html += esc(res.saida);
    if (res.erro) html += (html && !/\n$/.test(res.saida) ? "\n" : "") + '<span class="erro">' + esc(res.erro) + "</span>";
    if (!html) {
      elSaida.className = "saida vazia";
      elSaida.textContent = "(o programa não imprimiu nada)";
    } else {
      elSaida.className = "saida";
      elSaida.innerHTML = html;
    }
  }

  function rodarManual() {
    if (!pronto) return;
    var res = executar(elCodigo.value, null);
    mostrarSaida(res);
  }

  function testar() {
    if (!pronto) return;
    var codigo = elCodigo.value;
    $("area-testes").hidden = false;
    elCasos.innerHTML = "";
    var total = 0, passou = 0;

    var regras = (ex.codigoDeve || []).map(function (r) {
      return { ok: new RegExp(r.re, r.flags || "").test(codigo), msg: r.msg };
    });
    var regrasFalhas = regras.filter(function (r) { return !r.ok; });

    var ultimo = null;
    ex.casos.forEach(function (caso, idx) {
      total++;
      var res = executar(codigo, caso.entradas || null);
      ultimo = res;
      var falhas = [];
      if (res.erro) falhas.push("Erro ao executar:\n" + res.erro.trim());
      else falhas = conferir(caso, res.saida);
      var ok = falhas.length === 0;
      if (ok) passou++;
      var titulo = caso.entradas ? "Entradas: " + caso.entradas.map(function (e) { return "<code>" + esc(e) + "</code>"; }).join(" ") : "Execução";
      var li = document.createElement("li");
      li.className = "caso " + (ok ? "ok" : "falha");
      li.innerHTML = "<b>" + (ok ? "✓" : "✗") + " Caso " + (idx + 1) + "</b> · " + titulo +
        (ok ? "" : '<span class="det" style="white-space:pre-wrap">' + esc(falhas.join("\n")) + "</span>");
      elCasos.appendChild(li);
    });
    if (ultimo) mostrarSaida(ultimo);

    regrasFalhas.forEach(function (r) {
      var li = document.createElement("li");
      li.className = "caso falha";
      li.innerHTML = "<b>✗ Estrutura do código</b><span class=\"det\">" + esc(r.msg) + "</span>";
      elCasos.appendChild(li);
    });

    var tudo = passou === total && regrasFalhas.length === 0;
    elResumo.className = "resumo " + (tudo ? "ok" : "falha");
    elResumo.textContent = tudo ? "Tudo certo! Exercício concluído." : passou + " de " + total + " casos passaram" + (regrasFalhas.length ? " · faltam ajustes no código" : "") + ".";
    if (tudo && !estado.feitos[ex.id]) {
      estado.feitos[ex.id] = true;
      salvar();
      desenharLista();
    }
  }

  function mostrarGabarito() {
    var box = $("box-gab");
    if (!box.hidden) { box.hidden = true; return; }
    if (ex.tipo === "teste") {
      if (!window.confirm("Ver o gabarito agora? Vale tentar mais um pouco antes.")) return;
      box.innerHTML = "<h3>Gabarito</h3><pre>" + esc(ex.gabarito) + "</pre>";
    } else {
      box.innerHTML = "<h3>Explicação</h3><div>" + ex.explicacao + "</div>" +
        (ex.gabarito ? "<h3 style=\"margin-top:14px\">Exemplo</h3><pre>" + esc(ex.gabarito) + "</pre>" : "");
    }
    box.hidden = false;
  }

  /* ---------- início ---------- */
  $("mod-titulo").textContent = MODULO.titulo + " · " + MODULO.disciplina;
  $("mod-sub").textContent = MODULO.resumo;
  $("menu-btn").addEventListener("click", function () {
    var fechada = $("side").classList.toggle("fechada");
    this.setAttribute("aria-expanded", String(!fechada));
  });
  $("lista").addEventListener("click", function (ev) {
    var b = ev.target.closest(".item");
    if (b) ir(+b.dataset.i);
  });
  if (window.matchMedia("(max-width:820px)").matches) {
    $("side").classList.add("fechada");
    $("menu-btn").setAttribute("aria-expanded", "false");
  }

  desenharLista();
  desenharExercicio();
  iniciarPython();
})();
