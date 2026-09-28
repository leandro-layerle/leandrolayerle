"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./Header.module.css";

export default function Header() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const menuButtonRef =
    useRef<HTMLButtonElement>(
      null,
    );

  const mobileMenuRef =
    useRef<HTMLDivElement>(
      null,
    );

  const firstLinkRef =
    useRef<HTMLAnchorElement>(
      null,
    );

  /* ============================================================
     MOBILE MENU EFFECTS
  ============================================================ */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow =
        "";

      return;
    }

    /*
     * Evitamos scroll de la página
     * mientras el menú está abierto.
     */
    document.body.style.overflow =
      "hidden";

    /*
     * Cuando abrimos el menú,
     * llevamos el foco al primer enlace.
     */
    const focusTimer =
      window.setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      /* ========================================================
         ESCAPE
      ======================================================== */

      if (
        event.key === "Escape"
      ) {
        event.preventDefault();

        setMenuOpen(false);

        /*
         * Devolvemos el foco al botón
         * que abrió el menú.
         */
        window.setTimeout(
          () => {
            menuButtonRef.current?.focus();
          },
          0,
        );

        return;
      }

      /* ========================================================
         FOCUS TRAP
      ======================================================== */

      if (
        event.key !== "Tab"
      ) {
        return;
      }

      const menu =
        mobileMenuRef.current;

      const menuButton =
        menuButtonRef.current;

      if (
        !menu ||
        !menuButton
      ) {
        return;
      }

      const focusableElements =
        Array.from(
          menu.querySelectorAll<HTMLElement>(
            `
              a[href],
              button:not([disabled]),
              input:not([disabled]),
              textarea:not([disabled]),
              select:not([disabled]),
              [tabindex]:not([tabindex="-1"])
            `,
          ),
        );

      /*
       * Incluimos también el botón de cerrar.
       */
      const allFocusable = [
        menuButton,
        ...focusableElements,
      ];

      if (
        allFocusable.length ===
        0
      ) {
        return;
      }

      const firstFocusable =
        allFocusable[0];

      const lastFocusable =
        allFocusable[
          allFocusable.length - 1
        ];

      const activeElement =
        document.activeElement;

      /*
       * Shift + Tab desde el primer elemento
       * vuelve al último.
       */
      if (
        event.shiftKey &&
        activeElement ===
          firstFocusable
      ) {
        event.preventDefault();

        lastFocusable.focus();

        return;
      }

      /*
       * Tab desde el último elemento
       * vuelve al primero.
       */
      if (
        !event.shiftKey &&
        activeElement ===
          lastFocusable
      ) {
        event.preventDefault();

        firstFocusable.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.clearTimeout(
        focusTimer,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /* ============================================================
     ACTIONS
  ============================================================ */

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(
      (current) =>
        !current,
    );
  }

  return (
    <header
      className={
        styles.header
      }
    >
      <div
        className={
          styles.container
        }
      >
        {/* ====================================================
            BRAND
        ==================================================== */}

        <Link
          href="/"
          className={
            styles.brand
          }
          onClick={
            closeMenu
          }
        >
          <span
            className={
              styles.name
            }
          >
            LEANDRO LAYERLE
          </span>

          <span
            className={
              styles.tagline
            }
          >
            Consultor · Mentor · Tecnología
          </span>
        </Link>

        {/* ====================================================
            DESKTOP
        ==================================================== */}

        <nav
          className={
            styles.desktopNav
          }
          aria-label="Navegación principal"
        >
          <Link href="/">
            Inicio
          </Link>

          <Link href="/#servicios">
            Servicios
          </Link>

          <Link href="/#proyectos">
            Proyectos
          </Link>

          <Link href="/articulos">
            Artículos
          </Link>

          <Link href="/mentorias">
            Mentorías
          </Link>

          <Link href="/sobre-mi">
            Sobre mí
          </Link>

          <Link
            href="/contact"
            className={
              styles.contact
            }
          >
            Hablemos

            <span
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </nav>

        {/* ====================================================
            MOBILE BUTTON
        ==================================================== */}

        <button
          ref={
            menuButtonRef
          }
          type="button"
          className={[
            styles.menuButton,

            menuOpen
              ? styles.menuButtonOpen
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={
            menuOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={
            menuOpen
          }
          aria-controls="mobile-navigation"
          onClick={
            toggleMenu
          }
        >
          <span />
          <span />
        </button>
      </div>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      <div
        ref={
          mobileMenuRef
        }
        id="mobile-navigation"
        aria-hidden={
          !menuOpen
        }
        className={[
          styles.mobileMenu,

          menuOpen
            ? styles.mobileMenuOpen
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <nav
          className={
            styles.mobileNav
          }
          aria-label="Navegación móvil"
        >
          <Link
            ref={
              firstLinkRef
            }
            href="/"
            onClick={
              closeMenu
            }
          >
            <span>
              01
            </span>

            Inicio
          </Link>

          <Link
            href="/#servicios"
            onClick={
              closeMenu
            }
          >
            <span>
              02
            </span>

            Servicios
          </Link>

          <Link
            href="/#proyectos"
            onClick={
              closeMenu
            }
          >
            <span>
              03
            </span>

            Proyectos
          </Link>

          <Link
            href="/articulos"
            onClick={
              closeMenu
            }
          >
            <span>
              04
            </span>

            Artículos
          </Link>

          <Link
            href="/mentorias"
            onClick={
              closeMenu
            }
          >
            <span>
              05
            </span>

            Mentorías
          </Link>

          <Link
            href="/sobre-mi"
            onClick={
              closeMenu
            }
          >
            <span>
              06
            </span>

            Sobre mí
          </Link>
        </nav>

        {/* ====================================================
            MOBILE CTA
        ==================================================== */}

        <div
          className={
            styles.mobileBottom
          }
        >
          <p>
            ¿Tenés un proyecto o
            desafío tecnológico?
          </p>

          <Link
            href="/contact"
            className={
              styles.mobileContact
            }
            onClick={
              closeMenu
            }
          >
            Hablemos

            <span
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* ======================================================
          BACKDROP
      ====================================================== */}

      {menuOpen && (
        <button
          type="button"
          className={
            styles.backdrop
          }
          aria-label="Cerrar menú"
          onClick={() => {
            closeMenu();

            window.setTimeout(
              () => {
                menuButtonRef.current?.focus();
              },
              0,
            );
          }}
        />
      )}
    </header>
  );
}