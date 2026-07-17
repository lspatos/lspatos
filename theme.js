/**
 * LS Mapas — Alternância de modo escuro
 * Inclua com <script src="theme.js"></script> no <head>, antes do </head>,
 * em qualquer página do site. Aplica o tema salvo (ou o preferido pelo
 * sistema operacional, na primeira visita) imediatamente — antes do corpo
 * da página ser desenhado — para não "piscar" claro e depois escurecer.
 * Também cria sozinho o botão flutuante 🌙/☀️ no canto da tela.
 */
(function () {
  const CHAVE_TEMA = "temaLS";

  function temaPreferido() {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    if (salvo === "escuro" || salvo === "claro") return salvo;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "escuro"
      : "claro";
  }

  document.documentElement.setAttribute("data-tema", temaPreferido());

  function criarBotao() {
    if (document.getElementById("botaoTema")) return;

    const btn = document.createElement("button");
    btn.id = "botaoTema";
    btn.type = "button";
    btn.setAttribute("aria-label", "Alternar modo escuro");
    btn.setAttribute("data-novo", "modo-escuro");
    btn.textContent = document.documentElement.getAttribute("data-tema") === "escuro" ? "☀️" : "🌙";

    btn.addEventListener("click", () => {
      const novo = document.documentElement.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
      document.documentElement.setAttribute("data-tema", novo);
      localStorage.setItem(CHAVE_TEMA, novo);
      btn.textContent = novo === "escuro" ? "☀️" : "🌙";
    });

    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", criarBotao);
  } else {
    criarBotao();
  }
})();
