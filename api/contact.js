const MAX_LENGTHS = {
  name: 100,
  company: 120,
  email: 160,
  phone: 80,
  area: 100,
  message: 2000,
};

function clean(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(body));
}

async function readResendResponse(response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { message: "Método no permitido." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("Contact form configuration missing", {
      hasApiKey: Boolean(apiKey),
      hasToEmail: Boolean(toEmail),
      hasFromEmail: Boolean(fromEmail),
    });

    return json(res, 500, {
      message: "El formulario todavía no está configurado para enviar emails.",
    });
  }

  const body = req.body || {};

  // Honeypot antispam.
  if (clean(body.website, 200)) {
    return json(res, 200, { ok: true });
  }

  const name = clean(body.name, MAX_LENGTHS.name);
  const company = clean(body.company, MAX_LENGTHS.company);
  const email = clean(body.email, MAX_LENGTHS.email);
  const phone = clean(body.phone, MAX_LENGTHS.phone);
  const area = clean(body.area, MAX_LENGTHS.area);
  const message = clean(body.message, MAX_LENGTHS.message);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !company || !emailOk || !area || !message || message.length < 15) {
    return json(res, 400, {
      message: "Faltan datos necesarios para enviar la consulta.",
    });
  }

  const safe = {
    name: escapeHtml(name),
    company: escapeHtml(company),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "No informado"),
    area: escapeHtml(area),
    message: escapeHtml(message).replaceAll("\n", "<br>"),
  };

  const html = `
    <div style="font-family:Arial,sans-serif;color:#15263b;max-width:680px;margin:auto">
      <h2 style="color:#07172c">Nueva consulta desde la landing</h2>

      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;font-weight:bold">Nombre</td>
          <td>${safe.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold">Empresa</td>
          <td>${safe.company}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold">Email</td>
          <td>${safe.email}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold">WhatsApp / teléfono</td>
          <td>${safe.phone}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:bold">Área</td>
          <td>${safe.area}</td>
        </tr>
      </table>

      <hr style="border:none;border-top:1px solid #e5e9ec;margin:20px 0">

      <h3 style="color:#07172c">Qué necesita resolver</h3>
      <p style="line-height:1.6">${safe.message}</p>
    </div>
  `;

  try {
    const idempotencyKey = `contact-${crypto.randomUUID()}`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "leandolayerle-landing/1.0",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Nueva consulta: ${company} — ${area}`,
        html,
      }),
    });

    const data = await readResendResponse(response);

    if (!response.ok) {
      const requestId =
        response.headers.get("x-request-id") ||
        response.headers.get("request-id") ||
        response.headers.get("cf-ray") ||
        null;

      console.error("Resend error", {
        status: response.status,
        statusText: response.statusText,
        requestId,
        from: fromEmail,
        to: toEmail,
        data,
      });

      return json(res, 502, {
        message:
          "No pudimos enviar la consulta en este momento. Intentá nuevamente.",
      });
    }

    console.log("Contact email sent", {
      resendEmailId: data.id,
      from: fromEmail,
      to: toEmail,
    });

    return json(res, 200, {
      ok: true,
      id: data.id,
    });
  } catch (error) {
    console.error("Unexpected contact form error", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });

    return json(res, 500, {
      message: "Ocurrió un error al enviar la consulta. Intentá nuevamente.",
    });
  }
}
