import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_BODY_SIZE = 20_000;

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 120;
const MAX_SERVICE_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 5_000;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;

  /*
   * Honeypot.
   *
   * En el próximo paso lo conectamos
   * con un input oculto en ContactForm.
   */
  website?: unknown;
};

export async function POST(request: Request) {
  try {
    /* ========================================================
       CONTENT TYPE
    ======================================================== */

    const contentType =
      request.headers.get("content-type") ?? "";

    if (
      !contentType
        .toLowerCase()
        .includes("application/json")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Formato de solicitud inválido.",
        },
        {
          status: 415,
        },
      );
    }

    /* ========================================================
       TAMAÑO DEL REQUEST
    ======================================================== */

    const contentLength =
      Number(
        request.headers.get(
          "content-length",
        ) ?? 0,
      );

    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_BODY_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La solicitud es demasiado grande.",
        },
        {
          status: 413,
        },
      );
    }

    /* ========================================================
       BODY
    ======================================================== */

    let body: ContactRequest;

    try {
      body =
        (await request.json()) as ContactRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "El contenido enviado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    const name =
      readString(body.name);

    const email =
      readString(body.email);

    const company =
      readString(body.company);

    const service =
      readString(body.service);

    const message =
      readString(body.message);

    const website =
      readString(body.website);

    /* ========================================================
       HONEYPOT
    ======================================================== */

    /*
     * Una persona real nunca debería completar este campo.
     *
     * Si un bot lo completa, simulamos una respuesta correcta
     * para no avisarle que lo detectamos.
     */
    if (website) {
      return NextResponse.json({
        success: true,
      });
    }

    /* ========================================================
       CAMPOS OBLIGATORIOS
    ======================================================== */

    if (
      !name ||
      !email ||
      !service ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Faltan campos obligatorios.",
        },
        {
          status: 400,
        },
      );
    }

    /* ========================================================
       VALIDACIONES
    ======================================================== */

    if (
      name.length < 2 ||
      name.length > MAX_NAME_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El nombre ingresado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      email.length >
        MAX_EMAIL_LENGTH ||
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El email ingresado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      company.length >
      MAX_COMPANY_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El nombre de la empresa es demasiado largo.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      service.length >
      MAX_SERVICE_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El servicio seleccionado no es válido.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      message.length < 5 ||
      message.length >
        MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El mensaje debe tener entre 5 y 5000 caracteres.",
        },
        {
          status: 400,
        },
      );
    }

    /* ========================================================
       CONFIGURACIÓN RESEND
    ======================================================== */

    const apiKey =
      process.env.RESEND_API_KEY;

    const fromEmail =
      process.env.RESEND_FROM_EMAIL;

    const toEmail =
      process.env.CONTACT_TO_EMAIL;

    if (
      !apiKey ||
      !fromEmail ||
      !toEmail
    ) {
      console.error(
        "Contact API: faltan variables de entorno.",
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "No fue posible enviar el mensaje.",
        },
        {
          status: 500,
        },
      );
    }

    const resend =
      new Resend(apiKey);

    /* ========================================================
       VALORES SEGUROS
    ======================================================== */

    const safeName =
      escapeHtml(name);

    const safeEmail =
      escapeHtml(email);

    const safeCompany =
      escapeHtml(
        company ||
          "No indicada",
      );

    const safeService =
      escapeHtml(service);

    const safeMessage =
      escapeHtml(message).replace(
        /\n/g,
        "<br>",
      );

    /*
     * Evitamos saltos de línea dentro del subject.
     */
    const subjectName =
      singleLine(name);

    const subjectService =
      singleLine(service);

    /* ========================================================
       ENVÍO
    ======================================================== */

    const {
      data,
      error,
    } =
      await resend.emails.send({
        from:
          fromEmail,

        to: [
          toEmail,
        ],

        replyTo:
          email,

        subject:
          `Nueva consulta web · ${subjectService} · ${subjectName}`,

        text: `
Nueva consulta desde la web

Nombre: ${name}
Email: ${email}
Empresa: ${company || "No indicada"}
Servicio: ${service}

Mensaje:
${message}
        `.trim(),

        html: `
          <div
            style="
              max-width: 640px;
              margin: 0 auto;
              font-family: Arial, Helvetica, sans-serif;
              color: #17212a;
            "
          >
            <h2
              style="
                margin-bottom: 24px;
                color: #0b1724;
              "
            >
              Nueva consulta desde la web
            </h2>

            <p>
              <strong>Nombre:</strong>
              ${safeName}
            </p>

            <p>
              <strong>Email:</strong>
              ${safeEmail}
            </p>

            <p>
              <strong>Empresa:</strong>
              ${safeCompany}
            </p>

            <p>
              <strong>Servicio:</strong>
              ${safeService}
            </p>

            <hr
              style="
                margin: 28px 0;
                border: 0;
                border-top: 1px solid #e0e4e8;
              "
            />

            <p>
              <strong>Mensaje:</strong>
            </p>

            <p
              style="
                line-height: 1.65;
              "
            >
              ${safeMessage}
            </p>
          </div>
        `,
      });

    /* ========================================================
       ERROR RESEND
    ======================================================== */

    if (error) {
      console.error(
        "Contact API: Resend rechazó el envío.",
        {
          message:
            error.message,
        },
      );

      /*
       * No enviamos al navegador detalles internos
       * del proveedor.
       */
      return NextResponse.json(
        {
          success: false,
          error:
            "No fue posible enviar el mensaje. Intentá nuevamente.",
        },
        {
          status: 500,
        },
      );
    }

    /* ========================================================
       OK
    ======================================================== */

    return NextResponse.json({
      success: true,
      id:
        data?.id,
    });
  } catch (error) {
    console.error(
      "Contact API: error inesperado.",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Ocurrió un error inesperado. Intentá nuevamente.",
      },
      {
        status: 500,
      },
    );
  }
}

/* ============================================================
   HELPERS
============================================================ */

function readString(
  value: unknown,
): string {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function singleLine(
  value: string,
): string {
  return value
    .replace(
      /[\r\n]+/g,
      " ",
    )
    .trim();
}

function isValidEmail(
  value: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

function escapeHtml(
  value: string,
): string {
  return value
    .replaceAll(
      "&",
      "&amp;",
    )
    .replaceAll(
      "<",
      "&lt;",
    )
    .replaceAll(
      ">",
      "&gt;",
    )
    .replaceAll(
      '"',
      "&quot;",
    )
    .replaceAll(
      "'",
      "&#039;",
    );
}