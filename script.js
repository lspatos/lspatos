// URL DO PROXY NO CLOUDFLARE
const proxyURL = "https://ls-mapas-proxy.lspatosdeminas.workers.dev/";

// Variável global para o nome do responsável
let responsavelAtual = localStorage.getItem("responsavelLS") || "";

// ==========================
// GERA OS ENDEREÇOS DINAMICAMENTE VIA PLANILHA
// ==========================
async function gerarEnderecos(nomeMapa) {
  const container = document.getElementById("enderecos");
  container.innerHTML = `
    <div style="text-align:center; padding:30px;">
      <div class="spinner" style="margin:auto;"></div>
      <p style="color:#5c3d89; margin-top:15px;">Carregando endereços...</p>
    </div>
  `;

  try {
    const res = await fetch(`${proxyURL}?acao=read&aba=mapas`);
    const dados = await res.json();

    if (!dados || !dados.registros) throw new Error("Dados inválidos");

    const enderecosDoMapa = dados.registros.filter(r => (r.Mapa || "").trim() === nomeMapa);

    if (enderecosDoMapa.length === 0) {
      container.innerHTML = "<p style='text-align:center;'>Nenhum endereço cadastrado para este mapa.</p>";
      return;
    }

    container.innerHTML = "";
    enderecosDoMapa.forEach((r, i) => {
      const enderecoOriginal = r.Endereco || r.Endereço || "";
      const restricao = (r.Restrico || r.Restricao || "").toUpperCase();
      const isAnc = restricao.includes("ANCI") || restricao.includes("IDOSO");

      const textoEndereco = isAnc ? `IR ANCIÃO — ${enderecoOriginal}` : enderecoOriginal;

      const div = document.createElement("div");
      div.className = "container_end" + (isAnc ? " anciao" : "");
      div.innerHTML = `
        <h4>${i + 1}. ${textoEndereco}</h4>
        <div class="entradas">
          <button onclick="handleSubmit('Encontrado', '${nomeMapa}', \`${enderecoOriginal}\`)" class="btn-verde">✔ Encontrado</button>
          <button onclick="handleSubmit('Não encontrado', '${nomeMapa}', \`${enderecoOriginal}\`)" class="btn-vermelho">✖ Não encontrado</button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoOriginal)}" target="_blank">
            <button class="btn-endereco">🗺 Maps</button>
          </a>
        </div>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Erro ao carregar endereços:", err);
    container.innerHTML = "<p style='text-align:center;'>❌ Erro ao carregar endereços.</p>";
  }
}

// ==========================
// ENVIO PARA GOOGLE SHEETS
// ==========================
async function handleSubmit(status, setor, endereco) {
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

  try {
    const response = await fetch(proxyURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const resultText = await response.text();
    console.log("Resposta bruta:", resultText);

    let ok = false;
    try {
      const parsed = JSON.parse(resultText);
      ok = ["ok", "success", "registrado"].includes(parsed.status?.toLowerCase()) 
           || parsed.result?.toLowerCase() === "success";
    } catch {
      ok = /ok|success|registrado/i.test(resultText);
    }

    if (ok) showToast("✅ Resposta registrada com sucesso!");
    else showToast("⚠ Erro no envio.");
  } catch (error) {
    console.error("Erro ao enviar:", error);
    showToast("❌ Falha na conexão.");
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
// CSS DO SPINNER (inline)
// ==========================
const spinnerStyle = document.createElement("style");
spinnerStyle.innerHTML = `
.spinner {
  border: 6px solid #e0dce9;
  border-top: 6px solid #5c3d89;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(spinnerStyle);
