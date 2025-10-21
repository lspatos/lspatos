// ==========================
// CONFIGURAÇÕES INICIAIS
// ==========================

// URL do seu proxy / Apps Script
const proxyURL = "https://ls-mapas-proxy.lspatosdeminas.workers.dev/";
const planilhaAPI = "https://script.google.com/macros/s/AKfycbx6JI_Cimu7-u8QOVquvF86PhlFuTmfJZPiFDbbFfWgPeV6GQf-uT-12xfZ7eSkQaiBjg/exec";

// ==========================
// MAPAS E ENDEREÇOS
// ==========================

const mapas = {
  "Mapa 01": [
    "R. Antônia Carrilho, 115 - Res. Barreiro",
    "Av. Dep. Binga, 56 - Nossa Sra. de Fátima",
    "R. Zina Rocha, 748 - Nossa Sra. das Gracas",
    "R. Corinto, 108 - Padre Eustaquio",
    "R. José Miguel de Sousa, 115 - Padre Eustaquio",
    "R. São Geraldo, 874 - Lagoinha",
    "R. Lázaro Tadeu Pereira, 84 - Alvorada"
  ],
  "Mapa 02": [
    "R. Zeca Filgueira, 509 - Nossa Sra. das Gracas",
    "R. Marta Eulália Ferreira, 230 - Cerrado",
    "R. Muriaé, 290 - Padre Eustaquio",
    "R. Três Pontas, 149 - Padre Eustaquio",
    "R. São Geraldo, 682 - Lagoinha",
    "R. Maria Helena de Jesus, 177 - Cerrado",
    "R. Antônio Severo, 77 - Laranjeiras"
  ],
  "Mapa 03": [
    "R. José Valadares de Oliveira, 41 - Planalto",
    "R. Sebastião Silva, 197 - Cidade Nova",
    "R. Mario Aleixo Caixeta, 20 - Jardim Céu Azul"
  ],
  "Mapa 04": [
    "R. Oristila Abdo, 330 - Alto Limoeiro",
    "R. Angelim, 50 - Alto Maraba",
    "R. Pacajá, 155 - Jardim Esperança",
    "R. Padre Bento Engemann, 315 - Res. Monjolo",
    "R. Laura Fonseca, 575 - Jardim Esperança",
    "R. Tucuruí, 443 - Jardim Esperança",
    "R. José Miguel Barbosa, 60 - Patos de Minas"
  ],
  "Mapa 05": [
    "R. Carinhanha, 142 - Jardim Esperanca",
    "IR ANCIÃO - R. Zulmira Viêira de Araújo, 928 - Jardim Esperanca",
    "R. Dos Balsamos, 106 - Jardim Esperanca",
    "R. das Guarirobas, 111 - Jardim Esperanca",
    "R. dos Pinheiros, 510 - Morada do Sol",
    "Tv. Durval de Dom Vieira, 30 - Jardim Esperanca"
  ],
  "Mapa 06": [
    "R. Almério José de Souza, 561 - Boa Vista",
    "R. João Dias Soares, 89 - Jardim Recanto",
    "R. Ricardo Ferreira Ribeiro, 211 - Sebastião Amorim",
    "R. Onófre Resende Silva, 196 - Sebastião Amorim",
    "Av. Maria de Fátima Borges, 665 - Sebastião Amorim",
    "R. Geraldo Caixeta de Queiroz, 45 - Sebastião Amorim"
  ],
  "Mapa 07": [
    "R. Carlos Alberto Vilaça, 62 - Jardim Panoramico",
    "R. Oscar Jacinto dos Reis, 224 - Patos de Minas",
    "R. Ana da Maroca, 136 - Patos de Minas",
    "R. Zizinho Vida, 934 - Patos de Minas"
  ],
  "Mapa 08": [
    "R. Otávio Borges, 521 - Caiçaras",
    "Praça Santa Helena, 27 - Aurélio Caixeta",
    "R. Rogerio Severino de Almeida, 116 - Abner Afonso",
    "R. Geraldo Rodrigues dos Santos, 70 - Nova Floresta",
    "R. Ver. Filadelphio José da Fonseca, 849 - Nova Floresta"
  ],
  "Mapa 09": [
    "R. Toinzinho Amâncio, 154 - Centro",
    "R. Trinta e Um de Março, 164 - São Francisco",
    "IR ANCIÃO - R. Oscar de Souza, 65 - São Francisco",
    "R. Ver. Adalto Antonio Gonçalves, 145 - São Francisco",
    "R. Dr. Marcolino, 593, apto 101 - Centro"
  ],
  "Mapa 10": [
    "R. José de Anchieta, 137 - Jardim América",
    "R. Onofre Gonçalves, 27 - Jardim América",
    "R. Anicésio Vieira, 404 - Rosário",
    "Tv. Maria Inês de Jesus, 121 - Rosário",
    "Tv. Antero Eduardo, 346 - Rosário",
    "R. Zama Alves, 259 - Lagoinha",
    "R. Padre Pavoni, 26 - Rosário",
    "R. Antônio Bernardes, 47 - Nossa Sra. das Graças"
  ],
  "Mapa 11": [
    "Tv. Trinta, 39 - A Definir, Patos de Minas",
    "Tv. Trinta, 33 - A Definir, Patos de Minas",
    "R. Paraíba, 514 - Cristo Redentor",
    "R. Cônego Getúlio, 1088 - Centro",
    "R. Roberto de Assis Martins, 155 - Jardim Paulistano",
    "R. Espírito Santo, 1245 - Várzea"
  ],
  "Mapa 12": [
    "R. Pres. Olegário, 78 - Santa Terezinha",
    "R. Aristeu Pereira Cardoso, 26 - Várzea",
    "R. Ver. João Pacheco, 315 - Santo Antônio",
    "R. Guilherme Vilela, 400 - Nossa Sra. Aparecida",
    "R. Guilherme Vilela, 507 - Nossa Sra. Aparecida",
    "R. Duque de Caxias, 915 - Nossa Sra. Aparecida",
    "Tv. Hélio José da Silva, 50 - Nossa Sra. Aparecida",
    "Av. Joaquim Fubá, 226 - Nossa Sra. Aparecida",
    "Rua Tito Silva, 521 - São José Operária"
  ],
  "Mapa 13": [
    "R. Betim, 25 - Santa Terezinha",
    "R. São Gonçalo, 25 - Santa Terezinha",
    "Av. da Vitória, 201 - Santa Terezinha",
    "R. Minas Gerais, 688 - Santa Terezinha",
    "R. Espírito Santo, 557 - Várzea",
    "R. Dr. Marcolino, 593 - Centro",
    "R. Presidente Olegário, 78 - Sta. Terezinha",
    "R. Carmo do Paranaíba, 572 - Vila Rosa"
  ]
};

// ==========================
// FUNÇÕES DE APOIO
// ==========================

// Busca registros (últimos 90 dias)
async function buscarRegistros() {
  try {
    const res = await fetch(planilhaAPI);
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() - 90);

    return data.filter(item => {
      const dataItem = new Date(item["Data e Hora"]);
      return !isNaN(dataItem) && dataItem >= limite;
    });
  } catch (e) {
    console.error("Erro ao carregar registros:", e);
    return [];
  }
}

// Calcula tempo desde última visita
function infoUltimaVisita(registros, endereco) {
  const reg = registros
    .filter(r => (r.Endereço || r["Endereco"] || "").trim().toLowerCase() === endereco.trim().toLowerCase())
    .sort((a, b) => new Date(b["Data e Hora"]) - new Date(a["Data e Hora"]))[0];

  if (!reg) return { texto: "Sem visitas registradas", cor: "#888" };

  const ultima = new Date(reg["Data e Hora"]);
  const hoje = new Date();
  const diff = Math.floor((hoje - ultima) / (1000 * 60 * 60 * 24));

  let texto;
  if (diff === 0) texto = "Visitado hoje";
  else if (diff === 1) texto = "Sem visita há 1 dia";
  else if (diff > 90) texto = "Sem visita há +90 dias";
  else texto = `Sem visita há ${diff} dias`;

  let cor;
  if (diff <= 7) cor = "#2e7d32"; // verde
  else if (diff <= 30) cor = "#f9a825"; // amarelo
  else cor = "#c62828"; // vermelho

  return { texto, cor };
}

// ==========================
// GERA OS ENDEREÇOS
// ==========================

async function gerarEnderecos(nomeMapa) {
  const container = document.getElementById("enderecos");
  container.innerHTML = "<p>⏳ Carregando endereços...</p>";

  const registros = await buscarRegistros();
  container.innerHTML = "";

  if (!mapas[nomeMapa]) {
    container.innerHTML = "<p>Nenhum endereço cadastrado.</p>";
    return;
  }

  mapas[nomeMapa].forEach((endereco, i) => {
    const div = document.createElement("div");
    const isAnc = /ir\s*anci[ãa]o/i.test(endereco);
    const info = infoUltimaVisita(registros, endereco);

    div.className = "container_end" + (isAnc ? " anciao" : "");
    div.innerHTML = `
      <h4>${i + 1}. ${endereco}</h4>
      <p style="font-size:13px; color:${info.cor}; margin-top:4px; font-weight:500;">🕒 ${info.texto}</p>
      <div class="entradas">
        <button onclick="handleSubmit('Encontrado', '${nomeMapa}', '${endereco}')" class="btn-verde">✔ Encontrado</button>
        <button onclick="handleSubmit('Não encontrado', '${nomeMapa}', '${endereco}')" class="btn-vermelho">✖ Não encontrado</button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}" target="_blank">
          <button class="btn-endereco">🗺 Maps</button>
        </a>
      </div>
    `;
    container.appendChild(div);
  });
}

// ==========================
// ENVIO DE DADOS (PROXY)
// ==========================

async function handleSubmit(status, setor, endereco) {
  const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const payload = { dataHora, status, setor, endereco };

  showToast("⏳ Enviando...");

  try {
    const response = await fetch(proxyURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    let resultText = await response.text();
    let ok = /success|ok/i.test(resultText);

    showToast(ok ? "✅ Resposta registrada com sucesso!" : "⚠ Erro no envio.");
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
  globalToast.timeout = setTimeout(() => (globalToast.style.display = "none"), 3000);
}
