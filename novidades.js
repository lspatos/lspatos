/**
 * LS Mapas — Selo "novo" em recursos recém-adicionados
 * Inclua com <script src="novidades.js"></script> no <head>, depois do
 * theme.js, em qualquer página do site.
 *
 * Como funciona: qualquer elemento com atributo data-novo="chave" ganha um
 * selinho "novo" ao lado, enquanto a chave estiver na lista LANCAMENTOS
 * abaixo e ainda dentro do prazo. O selo some sozinho, o que vier primeiro:
 *   - 30 dias corridos desde a data cadastrada em LANCAMENTOS; ou
 *   - depois dos 6 primeiros acessos da pessoa ao site (contados 1x por dia,
 *     não por página vista - abrir 5 páginas no mesmo dia conta como 1).
 *
 * Pra marcar um recurso como novo: adiciona data-novo="alguma-chave" no
 * elemento (ou cria o elemento via JS com esse atributo) e registra
 * "alguma-chave": "AAAA-MM-DD" em LANCAMENTOS. Se o elemento for criado
 * dinamicamente depois do carregamento da página (ex: os cards de endereço
 * em mapa.html), chame window.aplicarSelosNovo() de novo após criá-lo.
 */
(function () {
  const CHAVE_ACESSOS = "acessosLS";
  const CHAVE_ULTIMO_DIA = "ultimoDiaAcessoLS";

  const LIMITE_DIAS = 30;
  const LIMITE_ACESSOS = 6;

  // Data de lançamento de cada recurso (AAAA-MM-DD). Pode remover a linha
  // quando o recurso deixar de ser "novidade" pra você.
  const LANCAMENTOS = {
    "reportar-endereco": "2026-07-17",
    "reportar-mudanca": "2026-07-17",
    "modo-escuro": "2026-07-17"
  };

  function hojeISO() {
    return new Date().toISOString().slice(0, 10);
  }

  // Conta 1 acesso por dia (a primeira vez que a pessoa abre o site naquele
  // dia, não importa em qual página) - evita inflar o contador só por
  // navegar entre páginas na mesma visita.
  function registrarAcessoSeNecessario() {
    const hoje = hojeISO();
    const ultimo = localStorage.getItem(CHAVE_ULTIMO_DIA);
    if (ultimo !== hoje) {
      const atual = parseInt(localStorage.getItem(CHAVE_ACESSOS) || "0", 10);
      localStorage.setItem(CHAVE_ACESSOS, String(atual + 1));
      localStorage.setItem(CHAVE_ULTIMO_DIA, hoje);
    }
  }

  function diasDesde(dataISO) {
    const inicio = new Date(dataISO + "T00:00:00");
    return (Date.now() - inicio.getTime()) / (1000 * 60 * 60 * 24);
  }

  function deveMostrarNovo(chave) {
    const dataLancamento = LANCAMENTOS[chave];
    if (!dataLancamento) return false;

    const acessos = parseInt(localStorage.getItem(CHAVE_ACESSOS) || "0", 10);
    return diasDesde(dataLancamento) < LIMITE_DIAS && acessos <= LIMITE_ACESSOS;
  }

  function aplicarSelosNovo() {
    document.querySelectorAll("[data-novo]").forEach(el => {
      const chave = el.getAttribute("data-novo");
      if (deveMostrarNovo(chave)) {
        if (!el.querySelector(":scope > .selo-novo")) {
          const selo = document.createElement("span");
          selo.className = "selo-novo";
          selo.textContent = "novo";
          el.appendChild(selo);
        }
      } else {
        const existente = el.querySelector(":scope > .selo-novo");
        if (existente) existente.remove();
      }
    });
  }

  registrarAcessoSeNecessario();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", aplicarSelosNovo);
  } else {
    aplicarSelosNovo();
  }

  // Exposto globalmente pra outros scripts poderem reaplicar depois de criar
  // elementos dinamicamente (ex: cards de endereço gerados em mapa.html)
  window.aplicarSelosNovo = aplicarSelosNovo;
})();
