"use client";

import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import styles from "./CodeBlock.module.css";

type Props = ComponentPropsWithoutRef<"pre">;

type CodeProps = {
  "data-language"?: string;
  children?: ReactNode;
};

function getLanguage(children: ReactNode): string {
  const firstChild = Children.toArray(children)[0];

  if (!isValidElement(firstChild)) {
    return "CODE";
  }

  const props = firstChild.props as CodeProps;

  const language = props["data-language"];

  switch (language) {
    case "csharp":
    case "cs":
      return "C#";

    case "sql":
      return "SQL";

    case "json":
      return "JSON";

    case "typescript":
    case "ts":
      return "TypeScript";

    case "javascript":
    case "js":
      return "JavaScript";

    case "powershell":
    case "ps1":
      return "PowerShell";

    case "text":
    case "plaintext":
      return "TEXT";

    default:
      return language?.toUpperCase() ?? "CODE";
  }
}

export default function CodeBlock({
  children,
  className,
  ...props
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  const language = getLanguage(children);

  async function handleCopy() {
    const code =
      wrapperRef.current?.querySelector("code")?.textContent;

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        code.replace(/\n$/, ""),
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
    >
      <div className={styles.toolbar}>
        <span className={styles.language}>
          {language}
        </span>

        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label="Copiar código"
        >
          {copied ? (
            <>
              <span className={styles.check}>✓</span>
              Copiado
            </>
          ) : (
            <>
              <span className={styles.copyIcon}>
                ⧉
              </span>
              Copiar
            </>
          )}
        </button>
      </div>

      <pre
        {...props}
        className={[
          styles.pre,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </pre>
    </div>
  );
}