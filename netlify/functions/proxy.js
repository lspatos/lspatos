// netlify/functions/proxy.js

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/SEU_SCRIPT_ID/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
    });

    const text = await response.text();

    // Se o Apps Script retornar texto simples ("OK", "Success")
    if (text.includes("OK") || text.includes("Success")) {
      return {
        statusCode: 200,
        body: JSON.stringify({ result: "Success" }),
      };
    }

    // Se for JSON válido, repassa direto
    try {
      const json = JSON.parse(text);
      return {
        statusCode: 200,
        body: JSON.stringify(json),
      };
    } catch (e) {
      // fallback: retorna como texto mesmo
      return {
        statusCode: 200,
        body: JSON.stringify({ result: text }),
      };
    }

  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed", details: error.message }),
    };
  }
};
