"use client";

import {
  useState,
  type SyntheticEvent,
} from "react";

import styles from "./ContactForm.module.css";

const services = [
  "Consultoría",
  "Automatización e integraciones",
  "Sistemas a medida",
  "IA aplicada",
  "Mentoría",
  "No estoy seguro",
];

type FormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error";

export default function ContactForm() {
  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const payload = {
      name:
        formData.get("name"),

      email:
        formData.get("email"),

      company:
        formData.get("company"),

      service:
        formData.get("service"),

      message:
        formData.get("message"),

      /*
       * Honeypot.
       *
       * Una persona real nunca debería
       * completar este campo.
       */
      website:
        formData.get("website"),
    };

    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload,
              ),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "No se pudo enviar el mensaje.",
        );
      }

      form.reset();

      setStatus("success");
    } catch (error) {
      console.error(
        "Error enviando formulario:",
        error,
      );

      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "No pude enviar el mensaje. Probá nuevamente.",
      );
    }
  }

  return (
    <section
      className={
        styles.wrapper
      }
    >
      <div
        className={
          styles.formHeader
        }
      >
        <span
          className={
            styles.formNumber
          }
        >
          01
        </span>

        <div>
          <p
            className={
              styles.kicker
            }
          >
            Primera conversación
          </p>

          <h2>
            Contame qué está pasando.
          </h2>
        </div>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className={
          styles.form
        }
      >
        {/* ==================================================
            HONEYPOT
        ================================================== */}

        <div
          aria-hidden="true"
          style={{
            position:
              "absolute",

            left:
              "-10000px",

            top:
              "auto",

            width:
              "1px",

            height:
              "1px",

            overflow:
              "hidden",
          }}
        >
          <label htmlFor="website">
            Sitio web
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* ==================================================
            NOMBRE + EMAIL
        ================================================== */}

        <div
          className={
            styles.row
          }
        >
          <div
            className={
              styles.field
            }
          >
            <label htmlFor="name">
              Nombre{" "}
              <span>*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
              minLength={2}
              maxLength={100}
              required
            />
          </div>

          <div
            className={
              styles.field
            }
          >
            <label htmlFor="email">
              Email{" "}
              <span>*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>
        </div>

        {/* ==================================================
            EMPRESA
        ================================================== */}

        <div
          className={
            styles.field
          }
        >
          <label htmlFor="company">
            Empresa
          </label>

          <input
            id="company"
            name="company"
            type="text"
            placeholder="Nombre de tu empresa — opcional"
            autoComplete="organization"
            maxLength={120}
          />
        </div>

        {/* ==================================================
            SERVICIO
        ================================================== */}

        <fieldset
          className={
            styles.serviceFieldset
          }
        >
          <legend>
            ¿En qué te puedo ayudar?
          </legend>

          <div
            className={
              styles.serviceOptions
            }
          >
            {services.map(
              (service) => (
                <label
                  key={service}
                  className={
                    styles.serviceOption
                  }
                >
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    required
                  />

                  <span>
                    {service}
                  </span>
                </label>
              ),
            )}
          </div>
        </fieldset>

        {/* ==================================================
            MENSAJE
        ================================================== */}

        <div
          className={
            styles.field
          }
        >
          <label htmlFor="message">
            ¿Qué necesitás resolver?{" "}
            <span>*</span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={6}
            minLength={5}
            maxLength={5000}
            placeholder="Contame brevemente cuál es el problema, qué proceso querés mejorar o qué idea tenés..."
            required
          />
        </div>

        {/* ==================================================
            SUBMIT
        ================================================== */}

        <button
          type="submit"
          className={
            styles.submit
          }
          disabled={
            status ===
            "sending"
          }
        >
          <span>
            {status ===
            "sending"
              ? "Enviando..."
              : "Enviar consulta"}
          </span>

          <span
            aria-hidden="true"
          >
            →
          </span>
        </button>

        {/* ==================================================
            SUCCESS
        ================================================== */}

        {status ===
          "success" && (
          <div
            className={
              styles.success
            }
            role="status"
            aria-live="polite"
          >
            <strong>
              Consulta enviada.
            </strong>

            <span>
              Gracias. Te voy a
              responder a la
              brevedad.
            </span>
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {status ===
          "error" && (
          <div
            className={
              styles.error
            }
            role="alert"
            aria-live="assertive"
          >
            {errorMessage}
          </div>
        )}
      </form>
    </section>
  );
}