// URL DO PROXY NO CLOUDFLARE
const proxyURL = "https://ls-mapas-proxy.lspatosdeminas.workers.dev/";

// Variável global para o nome do responsável
let responsavelAtual = localStorage.getItem("responsavelLS") || "";

// ==========================
// MAPAS E ENDEREÇOS
// ==========================

const mapas = {
  "Mapa 01": [
    "IR ANCIÃO - R. José Valadares de Oliveira, 41 - Planalto",
    "R. Sebastião Silva, 197 - Cidade Nova",
    "R. Mario Aleixo Caixeta, 20 - Jardim Céu Azul",
    "IR ANCIÃO - R. Augusto Ferreira da Cunha, 349 - Res. Gramado",
    "Av. Vereador José Caixeta Magalhães, 174 - Ipanema II"
  ],
  "Mapa 02": [
    "R. Zizinho Vida, 934 - Patos de Minas",
    "R. Ana da Maroca, 136 - Patos de Minas",
    "R. Oscar Jacinto dos Reis, 224 - Patos de Minas",
    "R. Carlos Alberto Vilaça, 62 - Jardim Panoramico",
    "R. Pedro Vicente da Silva, 524 - Patos de Minas"
  ],
  "Mapa 03": [
    "Av. Maria de Fátima Borges, 665 - Sebastião Amorim",
    "R. Geraldo Caixeta de Queiroz, 45 - Sebastião Amorim",
    "R. Ricardo Ferreira Ribeiro, 211 - Sebastião Amorim",
    "R. Almério José de Souza, 561 - Boa Vista",
    "R. José Álvaro Borges, 466 - Cidade Jardim",
    "R. João Dias Soares, 89 - Jardim Recanto"
  ],
  "Mapa 04": [
    "R. José Miguel Barbosa, 60 - Patos de Minas",
    "R. Geraldo Luiz da Mota, 615 - Patos de Minas",
    "Condomínio Terra Nova Patos de Minas I - Casa 89",
    "R. Oristila Abdo, 330 - Alto Limoeiro"
  ],
  "Mapa 05": [
    "IR ANCIÃO - R. Zulmira Viêira de Araújo, 928 - Jardim Esperanca",
    "R. Carinhanha, 142 - Jardim Esperanca",
    "R. Laura Fonseca, 575 - Jardim Esperanca",
    "R. Tucuruí, 443 - Jardim Esperanca",
    "R. Pacajá, 155 - Jardim Esperanca",
    "R. Acari, 65 - Jardim Esperanca",
    "R. Angelim, 50 - Alto Maraba"
  ],
  "Mapa 06": [
    "R. Padre Bento Engemann, 315 - Res. Monjolo",
    "Tv. Durval de Dom Vieira, 30 - Jardim Esperanca",
    "Tv. e, 10 - Res. Monjolo",
    "R. das Guarirobas, 111 - Jardim Esperanca",
    "R. Dos Balsamos, 106 - Jardim Esperanca",
    "R. dos Pinheiros, 510 - Morada do Sol",
    "IR ANCIÃO - R. Marieta Eneas Caetano, 55 - Novo Horizonte"
  ],
  "Mapa 07": [
    "R. Ver. Filadelphio José da Fonseca, 849 - Nova Floresta",
    "R. Geraldo Rodrigues dos Santos, 70 - Nova Floresta",
    "R. Orlando Pedro da Silva, 42 - Abner Afonso",
    "IR HOMEM - R. Getúlio Borges, 714 - Vila Garcia",
    "R. Otávio Borges, 521 - Caiçaras",
    "Rua Doutor José Belluco, 84 - Nova Floresta"
  ],
  "Mapa 08": [
    "Praça Santa Helena, 27 - Aurélio Caixeta",
    "R. Ver. Adalto Antonio Gonçalves, 145 - São Francisco",
    "IR ANCIÃO - R. Oscar de Souza, 65 - São Francisco",
    "R. das Acácias, 227 - Jardim Paraiso",
    "R. Toinzinho Amâncio, 154 - Centro",
    "R. Trinta e Um de Março, 164 - São Francisco"
  ],
  "Mapa 09": [
    "R. 11, 136 - Patos de Minas",
    "R. Antônia Carrilho, 115 - Res. Barreiro",
    "R. Clariza Araújo, 283 - Nossa Sra. de Fátima",
    "R. Gerôncio Gonçalves, 46 - Nossa Sra. de Fátima",
    "R. Lázaro Tadeu Pereira, 84 - Alvorada",
    "IR ANCIÃO - R. Aracajú, 183 - Caramuru",
    "R. Luzia Gonçalves de Souza, 82 - Nossa Sra. de Fátima",
    "R. João C. de Castro, 16 - Nossa Sra. de Fátima"
  ],
  "Mapa 10": [
    "R. Roberto de Assis Martins, 155 - Jardim Paulistano",
    "R. do Sol, 220 - apto 32 - Jardim Andrades",
    "R. Carmo do Paranaíba, 1418 - Vila Rosa",
    "R. Ver. João Pacheco, 2801 - Cristo Redentor",
    "R. Paraíba, 514 - Cristo Redentor"
  ],
  "Mapa 11": [
    "Av. Joaquim Fubá, 226 - Nossa Sra. Aparecida",
    "Tv. Hélio José da Silva, 50 - Nossa Sra. Aparecida",
    "R. Duque de Caxias, 915 - Nossa Sra. Aparecida",
    "R. Guilherme Vilela, 507 - Nossa Sra. Aparecida",
    "R. Tito Silva, 521 - São José Operário",
    "IR ANCIÃO - R. Guilherme Vilela, 400 - Nossa Sra. Aparecida",
    "R. Ver. João Pacheco, 315 - Santo Antônio",
    "R. Aristeu Pereira Cardoso, 26 - Várzea"
  ],
  "Mapa 12": [
    "R. Carmo do Paranaíba, 572- Vila Rosa",
    "R. Betim, 25 - Santa Terezinha",
    "R. Daniel Alves Beluco, 49 - Cristo Redentor",
    "R. Espírito Santo, 1245 - Várzea",
    "R. Cônego Getúlio, 1088 - Centro"
  ],
  "Mapa 13": [
    "R. Pres. Olegário, 78 - Santa Terezinha",
    "R. São Gonçalo, 25 - Santa Terezinha",
    "Av. da Vitória, 201 - Santa Terezinha",
    "R. Minas Gerais, 688 - Santa Terezinha",
    "R. Espírito Santo, 557 - Várzea"
  ],
  "Mapa 14": [
    "R. Dr. Marcolino, 593 - Centro",
    "R. Onofre Gonçalves, 27 - Jardim América",
    "IR ANCIÃO - R. José de Anchieta, 137 - Jardim América",
    "R. Alfredo Borges, 427 - Centro"
  ],
  "Mapa 15": [
    "R. Antônio Bernardes, 47 - Nossa Sra. das Gracas",
    "R. Xavantes, 167 - Caiçaras",
    "R. Padre Pavoni, 26 - Rosário",
    "R. Anicésio Vieira, 404 - Rosário",
    "R. Zama Alves, 259 - Lagoinha",
    "R. Zama Alves, 73 - Rosário",
    "Tv. Maria Inês de Jesus, 121 - Rosário"
  ],
  "Mapa 16": [
    "R. Antônio Severo, 77 - Laranjeiras",
    "IR ANCIÃO - R. Três Pontas, 149 - Padre Eustaquio",
    "R. Muriaé, 290 - Padre Eustaquio",
    "R. Marta Eulália Ferreira, 230 - Cerrado",
    "R. São Geraldo, 682 - Lagoinha"
  ],
  "Mapa 17": [
    "R. José Miguel de Sousa, 115 - Padre Eustaquio",
    "R. Corinto, 108 - Padre Eustaquio",
    "R. dos Tupis, 530 - Caramuru",
    "R. Zeca Filgueira, 509 - Nossa Sra. das Gracas",
    "IR ANCIÃO - R. Tonho do Nico, 314 - Nossa Sra. das Gracas",
    "R. Emídio de Souza, 375, Fundo - Nossa Sra. das Graças"
  ]
};

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

// ✅ ENVIO PARA GOOGLE SHEETS (VIA PROXY) — corrigido
async function handleSubmit(status, setor, endereco) {
  const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const payload = {
    acao: "submit", // obrigatório para o Apps Script aceitar
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
      ok = parsed.result?.toLowerCase() === "success" || parsed.status?.toLowerCase() === "ok";
    } catch {
      ok = /ok|success/i.test(resultText);
    }

    if (ok) showToast("✅ Resposta registrada com sucesso!");
    else showToast("⚠ Erro no envio.");
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
