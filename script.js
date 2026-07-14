// URL DO PROXY NO CLOUDFLARE
const proxyURL = "https://ls-mapas-proxy.lspatosdeminas.workers.dev/";

// Variável global para o nome do responsável
let responsavelAtual = localStorage.getItem("responsavelLS") || "";

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ==========================
// GERA OS ENDEREÇOS DINAMICAMENTE VIA PLANILHA + TEMPO DE VISITA
// ==========================
async function gerarEnderecos(nomeMapa) {
  const container = document.getElementById("enderecos");
  container.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <div class="spinner" style="margin:auto;"></div>
      <p style="color:#5c3d89; margin-top:15px;">Carregando endereços...</p>
    </div>
  `;

  let dadosMapas, dadosHistorico;

  try {
    const [resMapas, resHistorico] = await Promise.all([
      fetch(`${proxyURL}?acao=read&aba=mapas`),
      fetch(`${proxyURL}?acao=read&aba=Respostas`)
    ]);

    if (!resMapas.ok || !resHistorico.ok) {
      throw new Error(`SERVIDOR:${resMapas.status || resHistorico.status}`);
    }

    [dadosMapas, dadosHistorico] = await Promise.all([
      resMapas.json(),
      resHistorico.json()
    ]);
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    let mensagem = "❌ Erro ao carregar endereços.";
    if (err instanceof TypeError) {
      // fetch lança TypeError quando não há conexão / servidor inacessível
      mensagem = "📡 Sem conexão com o servidor. Verifique sua internet e tente novamente.";
    } else if (String(err.message).startsWith("SERVIDOR:")) {
      mensagem = "⚠ O servidor não respondeu corretamente. Tente novamente em instantes.";
    }
    container.innerHTML = `<p style='text-align:center;'>${mensagem}</p>`;
    return;
  }

  if (!dadosMapas?.registros) {
    container.innerHTML = "<p style='text-align:center;'>⚠ Os dados recebidos estão em formato inesperado. Avise o administrador.</p>";
    return;
  }

  const enderecosDoMapa = dadosMapas.registros.filter(
    r => (r.Mapa || "").trim() === nomeMapa
  );

  if (enderecosDoMapa.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Nenhum endereço cadastrado para este mapa.</p>";
    return;
  }

  const respostas = dadosHistorico.registros || [];
  container.innerHTML = "";

  enderecosDoMapa.forEach((r, i) => {
    const enderecoOriginal = r.Endereco || "";
    const restricao = (r.Restricao || "").trim();
    const temRestricao = restricao.length > 0;
    const emAnalise = removerAcentos(restricao).toUpperCase().includes("EM ANALISE");

    // 🔹 Busca última visita (filtragem local)
    // Nota: a aba "mapas" usa a coluna "Endereco" (sem cedilha),
    // mas a aba "Respostas" usa "Endereço" (com cedilha) - são cabeçalhos diferentes entre as abas.
    const historicoEndereco = respostas
      .filter(v =>
        (v.Endereço || v.Endereco || "") === enderecoOriginal &&
        (v.Setor || "") === nomeMapa
      )
      .sort((a, b) => new Date(b["Data e Hora"]) - new Date(a["Data e Hora"]));

    let diasDesde = null;
    if (historicoEndereco.length > 0) {
      const ultimaData = new Date(historicoEndereco[0]["Data e Hora"]);
      const diffMs = Date.now() - ultimaData.getTime();
      diasDesde = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    // 🔹 Define cor conforme tempo (independe de ter restrição ou não)
    let corTexto = "#697080";
    if (diasDesde !== null) {
      if (diasDesde > 30) corTexto = "#D64550";
      else if (diasDesde >= 15) corTexto = "#DB9526";
      else corTexto = "#2F9E58";
    }

    // 🔹 Monta o card via DOM (sem onclick com strings interpoladas),
    // assim endereços com aspas, apóstrofos ou acentos nunca quebram o botão
    const div = document.createElement("div");
    div.className = "container_end" + (emAnalise ? " em-analise" : (temRestricao ? " restrito" : ""));

    const cabeca = document.createElement("div");
    cabeca.className = "cabeca-endereco";

    const selo = document.createElement("span");
    selo.className = "selo-territorio";
    selo.textContent = i + 1;

    const titulo = document.createElement("h4");
    titulo.textContent = enderecoOriginal;

    cabeca.append(selo, titulo);

    const ultimaVisita = document.createElement("p");
    ultimaVisita.className = "ultima-visita";
    ultimaVisita.style.color = corTexto;
    ultimaVisita.textContent = `⏱ Última visita: ${diasDesde === null ? "Sem registro" : `${diasDesde} dia${diasDesde !== 1 ? "s" : ""} atrás`}`;

    // Botão discreto de alerta de mudança/falecimento (em qualquer endereço, mesmo já em análise)
    const btnAlerta = document.createElement("button");
    btnAlerta.className = "btn-alerta-mudanca";
    btnAlerta.title = "Avisar mudança ou falecimento";
    btnAlerta.innerHTML = "⚠";
    btnAlerta.addEventListener("click", () => abrirPopoverAlerta(nomeMapa, enderecoOriginal));
    div.appendChild(btnAlerta);

    if (emAnalise) {
      const badge = document.createElement("div");
      badge.className = "badge-analise";
      badge.innerHTML = "⚠ Endereço em análise — Provável mudança";
      div.append(cabeca, badge);
      container.appendChild(div);
      return; // não mostra botões de Encontrado/Não encontrado nem restrição extra
    }

    let selRestricao = null;
    if (temRestricao) {
      selRestricao = document.createElement("p");
      selRestricao.className = "selo-restricao";
      selRestricao.textContent = `⚠ ${restricao}`;
    }

    const entradas = document.createElement("div");
    entradas.className = "entradas";

    const btnEncontrado = document.createElement("button");
    btnEncontrado.className = "btn-verde";
    btnEncontrado.innerHTML = "✔ Encontrado";
    btnEncontrado.addEventListener("click", () => handleSubmit("Encontrado", nomeMapa, enderecoOriginal, [btnEncontrado, btnNaoEncontrado]));

    const btnNaoEncontrado = document.createElement("button");
    btnNaoEncontrado.className = "btn-vermelho";
    btnNaoEncontrado.innerHTML = "✖ Não encontrado";
    btnNaoEncontrado.addEventListener("click", () => handleSubmit("Não encontrado", nomeMapa, enderecoOriginal, [btnEncontrado, btnNaoEncontrado]));

    const linkMaps = document.createElement("a");
    linkMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoOriginal)}`;
    linkMaps.target = "_blank";
    const btnMaps = document.createElement("button");
    btnMaps.className = "btn-endereco";
    btnMaps.innerHTML = "🗺 Maps";
    linkMaps.appendChild(btnMaps);

    entradas.append(btnEncontrado, btnNaoEncontrado, linkMaps);
    div.append(cabeca, ultimaVisita);
    if (selRestricao) div.append(selRestricao);
    div.append(entradas);
    container.appendChild(div);
  });
}

// ==========================
// ENVIO PARA GOOGLE SHEETS (com fila offline)
// ==========================
const CHAVE_FILA = "filaEnviosLS";

function lerFila() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_FILA) || "[]");
  } catch {
    return [];
  }
}

function salvarFila(fila) {
  localStorage.setItem(CHAVE_FILA, JSON.stringify(fila));
  atualizarBadgeFila();
}

function atualizarBadgeFila() {
  const fila = lerFila();
  let badge = document.getElementById("badgeFilaPendente");

  if (fila.length === 0) {
    if (badge) badge.remove();
    return;
  }

  if (!badge) {
    badge = document.createElement("div");
    badge.id = "badgeFilaPendente";
    badge.style.position = "fixed";
    badge.style.top = "10px";
    badge.style.right = "10px";
    badge.style.background = "#ff9100";
    badge.style.color = "#fff";
    badge.style.padding = "6px 12px";
    badge.style.borderRadius = "20px";
    badge.style.fontSize = "12px";
    badge.style.fontWeight = "600";
    badge.style.zIndex = "1001";
    badge.style.boxShadow = "0 2px 6px rgba(0,0,0,.2)";
    badge.style.cursor = "pointer";
    badge.title = "Clique pra tentar enviar agora";
    badge.addEventListener("click", tentarReenviarFila);
    document.body.appendChild(badge);
  }
  badge.textContent = `📤 ${fila.length} pendente${fila.length !== 1 ? "s" : ""}`;
}

// Tenta enviar de fato um payload pro Worker. Retorna true se confirmado com sucesso.
async function enviarPayload(payload) {
  const response = await fetch(proxyURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const resultText = await response.text();
  try {
    const parsed = JSON.parse(resultText);
    return ["ok", "success", "registrado"].includes(parsed.status?.toLowerCase())
      || parsed.result?.toLowerCase() === "success";
  } catch {
    return /ok|success|registrado/i.test(resultText);
  }
}

// Percorre a fila salva e tenta reenviar cada item pendente
async function tentarReenviarFila() {
  const fila = lerFila();
  if (fila.length === 0) return;

  const restantes = [];
  for (const payload of fila) {
    try {
      const ok = await enviarPayload(payload);
      if (!ok) restantes.push(payload);
    } catch {
      restantes.push(payload); // ainda sem sinal, mantém na fila
    }
  }

  salvarFila(restantes);
  if (restantes.length < fila.length) {
    showToast(`✅ ${fila.length - restantes.length} envio(s) pendente(s) confirmado(s)!`);
  }
}

async function handleSubmit(status, setor, endereco, botoes = []) {
  const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const payload = {
    acao: "submit",
    dataHora,
    status,
    setor,
    endereco,
    responsavel: responsavelAtual || "Não identificado"
  };

  showToast("⏳ Enviando...");
  botoes.forEach(b => b.disabled = true);

  try {
    const ok = await enviarPayload(payload);
    if (ok) showToast("✅ Resposta registrada com sucesso!");
    else showToast("⚠ O servidor recebeu, mas retornou um erro. Tente novamente.");
  } catch (error) {
    console.error("Erro ao enviar:", error);
    if (error instanceof TypeError) {
      // Sem sinal: guarda no aparelho e envia depois automaticamente
      const fila = lerFila();
      fila.push(payload);
      salvarFila(fila);
      showToast("💾 Sem sinal agora — salvo no aparelho, será enviado sozinho quando voltar.");
    } else {
      showToast("❌ Falha ao enviar. Tente novamente.");
    }
  } finally {
    botoes.forEach(b => b.disabled = false);
  }
}

// ==========================
// ALERTA DE MUDANÇA / FALECIMENTO
// ==========================
function abrirPopoverAlerta(mapa, endereco) {
  const overlay = document.createElement("div");
  overlay.className = "popover-alerta";

  const opcoes = [
    { texto: "🏙️ Mudou-se dentro de Patos", valor: "Mudou-se dentro de Patos" },
    { texto: "🚚 Mudou-se para outra cidade", valor: "Mudou-se para outra cidade" },
    { texto: "🕊️ Faleceu", valor: "Faleceu" }
  ];

  overlay.innerHTML = `
    <div class="conteudo">
      <h3>Avisar sobre este endereço</h3>
      <p>Isso ajuda a manter os mapas atualizados. Selecione o motivo:</p>
      ${opcoes.map((o, i) => `<button class="opcao" data-i="${i}">${o.texto}</button>`).join("")}
      <button class="cancelar">Cancelar</button>
    </div>`;

  overlay.querySelectorAll(".opcao").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      overlay.remove();
      enviarAlerta(mapa, endereco, opcoes[i].valor);
    });
  });
  overlay.querySelector(".cancelar").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });

  document.body.appendChild(overlay);
}

async function enviarAlerta(mapa, endereco, motivo) {
  showToast("⏳ Enviando aviso...");
  try {
    const response = await fetch(proxyURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        acao: "alerta",
        mapa,
        endereco,
        motivo,
        responsavel: responsavelAtual || "Não identificado"
      })
    });
    const data = await response.json();

    if (data.status === "ja_registrado") {
      showToast("ℹ Você já avisou sobre esse endereço antes.");
    } else if (data.marcado) {
      showToast("⚠ Endereço atingiu 3 avisos e foi marcado para análise.");
      gerarEnderecos(nomeMapa); // recarrega a lista pra já mostrar o novo estado
    } else {
      showToast("✅ Aviso registrado. Obrigado por ajudar a manter os mapas atualizados!");
    }
  } catch (err) {
    console.error("Erro ao enviar alerta:", err);
    showToast("📡 Sem conexão agora. Tente avisar de novo daqui a pouco.");
  }
}

// ==========================
// TOAST DE FEEDBACK
// ==========================
let globalToast;
function showToast(msg) {
  if (!globalToast) {
    globalToast = document.createElement("div");
    globalToast.style.position = "fixed";
    globalToast.style.bottom = "20px";
    globalToast.style.left = "50%";
    globalToast.style.transform = "translateX(-50%)";
    globalToast.style.background = "#333";
    globalToast.style.color = "#fff";
    globalToast.style.padding = "10px 20px";
    globalToast.style.borderRadius = "8px";
    globalToast.style.zIndex = "1000";
    document.body.appendChild(globalToast);
  }
  globalToast.textContent = msg;
  globalToast.style.display = "block";

  clearTimeout(globalToast.timeout);
  globalToast.timeout = setTimeout(() => {
    globalToast.style.display = "none";
  }, 3000);
}

// ==========================
// MODAL DE IDENTIFICAÇÃO (expira a cada 4h)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("identificacaoModal");
  const btnConfirmar = document.getElementById("confirmarResponsavel");
  const select = document.getElementById("responsavelSelect");

  const agora = Date.now();
  const ultimaHora = parseInt(localStorage.getItem("responsavelHora") || "0");
  const responsavelSalvo = localStorage.getItem("responsavelLS") || "";
  const quatroHoras = 4 * 60 * 60 * 1000;

  if (!responsavelSalvo || agora - ultimaHora > quatroHoras) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
    responsavelAtual = responsavelSalvo;
  }

  btnConfirmar.addEventListener("click", () => {
    const nome = select.value.trim();
    if (!nome) {
      alert("Selecione seu nome antes de continuar!");
      return;
    }
    localStorage.setItem("responsavelLS", nome);
    localStorage.setItem("responsavelHora", Date.now());
    responsavelAtual = nome;
    modal.style.display = "none";
  });
});

// ==========================
// PWA: registra o service worker e cuida da fila offline
// ==========================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .catch(err => console.warn("Falha ao registrar service worker:", err));
  });
}

// Assim que a conexão voltar, tenta enviar o que ficou pendente
window.addEventListener("online", tentarReenviarFila);

// Ao abrir a página, mostra o badge se já houver pendências e tenta reenviar
document.addEventListener("DOMContentLoaded", () => {
  atualizarBadgeFila();
  tentarReenviarFila();
});
