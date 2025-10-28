// URL DO PROXY NO CLOUDFLARE
const proxyURL = "https://ls-mapas-proxy.lspatosdeminas.workers.dev/";

// Variável global para o nome do responsável
let responsavelAtual = localStorage.getItem("responsavelLS") || "";

// ENDEREÇOS DE CADA MAPA
const mapas = { /* ... (mantém o mesmo conteúdo original do backup.txt) ... */ };

// GERA OS ENDEREÇOS DINAMICAMENTE
function gerarEnderecos(nomeMapa) {
  const container = document.getElementById("enderecos");
  container.innerHTML = "";

  if (!mapas[nomeMapa]) {
    container.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
    return;
  }

  mapas[nomeMapa].forEach((endereco, i) => {
    const div = document.createElement("div");
    const isAnc = /ir\s*anci[ãa]o/i.test(endereco);

    div.className = "container_end" + (isAnc ? " anciao" : "");
    div.innerHTML = `
      <h4>${i + 1}. ${endereco}</h4>
      <div class="entradas">
        <button onclick="handleSubmit('Encontrado', '${nomeMapa}', '${endereco}')" class="btn-verde">✔ Encontrado</button>
        <button onclick="handleSubmit('Não encontrado', '${nomeMapa}', '${endereco}')" class="btn-vermelho">✖ Não encontrado</button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}" target="_blank">
          <button class="btn-endereco"> 🗺 Maps </button>
        </a>
      </div>
    `;
    container.appendChild(div);
  });
}

// ENVIO PARA GOOGLE SHEETS (VIA PROXY)
async function handleSubmit(status, setor, endereco) {
  const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const payload = {
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

    let resultText = await response.text();
    console.log("Resposta bruta:", resultText);

    let ok = false;
    try {
      const parsed = JSON.parse(resultText);
      ok = parsed.result?.toLowerCase() === "success";
    } catch {
      ok = /ok|success/i.test(resultText);
    }

    if (ok) {
      showToast("✅ Resposta registrada com sucesso!");
    } else {
      showToast("⚠ Erro no envio.");
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    showToast("❌ Falha na conexão.");
  }
}

// TOAST DE FEEDBACK
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

// MODAL DE IDENTIFICAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("identificacaoModal");
  const btnConfirmar = document.getElementById("confirmarResponsavel");
  const select = document.getElementById("responsavelSelect");

  if (!responsavelAtual) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }

  btnConfirmar.addEventListener("click", () => {
    const nome = select.value.trim();
    if (!nome) {
      alert("Selecione seu nome antes de continuar!");
      return;
    }
    localStorage.setItem("responsavelLS", nome);
    responsavelAtual = nome;
    modal.style.display = "none";
  });
});
