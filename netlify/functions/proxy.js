export async function handler(event, context) {
  const targetUrl = "https://script.google.com/macros/s/AKfycb.../exec"; // SUA URL DO APPS SCRIPT

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
        "Access-Control-Allow-Origin": "*",  // 🔥 Libera para qualquer domínio
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro no proxy", details: err.message })
    };
  }
}
