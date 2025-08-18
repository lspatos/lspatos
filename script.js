// ENDEREÇOS DE CADA MAPA
const mapas = {
  "Mapa 01": [
    "R. Antônia Carrilho, 115 - Res. Barreiro",
    "Av. Dep. Binga, 56 - Nossa Sra. de Fátima",
    "R. Zina Rocha, 748 - Nossa Sra. das Gracas",
    "R. Corinto, 108 - Padre Eustaquio",
    "R. José Miguel de Sousa, 115 - Padre Eustaquio",
    "R. São Geraldo, 874 - Lagoinha"
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
    "R. Mario Aleixo Caixeta, 20 - Jardim Céu Azul",
    "R. Pedro Caixeta de Melo, 1375 - Jardim Céu Azul"
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
    "R. Zulmira Viêira de Araújo, 928 - Jardim Esperanca",
    "R. Dos Balsamos, 106 - Jardim Esperanca",
    "R. das Guarirobas, 111 - Jardim Esperanca",
    "R. dos Pinheiros, 510 - Morada do Sol",
    "Tv. Durval de Dom Vieira, 30 - Jardim Esperanca"
  ],
  "Mapa 06": [
    "R. Joana da Rocha Andrade, 60 - Cidade Jardim",
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
    "R. Ubá, 52 - Vila Garcia",
    "R. Rogerio Severino de Almeida, 116 - Abner Afonso",
    "R. Geraldo Rodrigues dos Santos, 70 - Nova Floresta",
    "R. Ver. Filadelphio José da Fonseca, 849 - Nova Floresta"
  ],
  "Mapa 9": [
    "R. Toinzinho Amâncio, 154 - Centro",
    "R. Trinta e Um de Março, 164 - São Francisco",
    "R. Rui Corrêa, 45 - São Francisco",
    "R. Oscar de Souza, 65 - São Francisco",
    "R. Ver. Adalto Antonio Gonçalves, 145 - São Francisco"
  ],
  "Mapa 10": [
    "R. José de Anchieta, 137 - Jardim América",
    "R. Onofre Gonçalves, 27 - Jardim América",
    "R. Anicésio Vieira, 404 - Rosário",
    "Tv. Maria Inês de Jesus, 121 - Rosário",
    "R. Zama Alves, 259 - Lagoinha",
    "R. Padre Pavoni, 26 - Rosário",
    "R. Antônio Bernardes, 47 - Nossa Sra. das Graças"
  ],
  "Mapa 11": [
    "Tv. Trinta, 39 - A Definir, Patos de Minas",
    "Tv. Trinta, 33 - A Definir, Patos de Minas",
    "R. Paraíba, 514 - Cristo Redentor",
    "R. Daniel Alves Beluco, 49 - Cristo Redentor",
    "R. Cônego Getúlio, 1088 - Centro",
    "R. Roberto de Assis Martins, 155 - Jardim Paulistano",
    "R. Espírito Santo, 1245 - Várzea"
  ],
  "Mapa 12": [
    "R. Aristeu Pereira Cardoso, 26 - Várzea",
    "R. Ver. João Pacheco, 315 - Santo Antônio",
    "R. Guilherme Vilela, 400 - Nossa Sra. Aparecida",
    "R. Guilherme Vilela, 507 - Nossa Sra. Aparecida",
    "R. Duque de Caxias, 915 - Nossa Sra. Aparecida",
    "Tv. Hélio José da Silva, 50 - Nossa Sra. Aparecida",
    "Av. Joaquim Fubá, 226 - Nossa Sra. Aparecida"
  ],
  "Mapa 13": [
    "R. Betim, 25 - Santa Terezinha",
    "R. São Gonçalo, 25 - Santa Terezinha",
    "Av. da Vitória, 201 - Santa Terezinha",
    "R. Minas Gerais, 688 - Santa Terezinha",
    "R. Espírito Santo, 557 - Várzea",
    "R. Dr. Marcolino, 593 - Centro"
  ]
};

// URL DO SCRIPT GOOGLE
const scriptURL = "https://script.google.com/macros/s/AKfycbwd0P5RCJrbolrpE4s5vIME9_IVED_35sRU827sRVMFCye8COSiQu4h3gOOWyTDwhCLJw/exec";

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
    div.className = "container_end";
    div.innerHTML = `
      <h4>${i + 1}. ${endereco}</h4>
      <div class="entradas">
        <button onclick="handleSubmit('Encontrado', '${nomeMapa}', '${endereco}')"
          class="btn-verde">✔ Encontrado</button>
        <button onclick="handleSubmit('Não encontrado', '${nomeMapa}', '${endereco}')"
          class="btn-vermelho">✖ Não encontrado</button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}" target="_blank">
          <button class="btn-endereco"> 🗺 Maps </button>
        </a>
      </div>
    `;
    container.appendChild(div);
  });
}

// ENVIO PARA GOOGLE SHEETS
async function handleSubmit(status, setor, endereco) {
  const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const payload = { dataHora, status, setor, endereco };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
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
function showToast(msg) {
  let toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "8px";
  toast.style.zIndex = "1000";
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
