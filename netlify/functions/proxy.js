export async function handler(event, context) {
  const targetUrl = "https://script.google.com/macros/s/AKfycbwd0P5RCJrbolrpE4s5vIME9_IVED_35sRU827sRVMFCye8COSiQu4h3gOOWyTDwhCLJw/exec"; // 👉 SUA URL DO GOOGLE APPS SCRIPT

  // Trata o preflight OPTIONS (necessário para CORS funcionar corretamente)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: ""
    };
  }

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: { "Content-Type": "application/json" },
      body: event.body
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // 🔥 libera para qualquer domínio
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "Erro no proxy", details: err.message })
    };
  }
}
