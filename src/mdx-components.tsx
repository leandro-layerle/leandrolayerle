import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

import CodeBlock from "@/components/article/CodeBlock";
import MdxTable from "@/components/article/MdxTable";

import styles from "@/components/article/ArticleProse.module.css";

type CodeProps =
  ComponentPropsWithoutRef<"code"> & {
    "data-language"?: string;
  };

function MdxCode({
  className,
  ...props
}: CodeProps) {
  /*
   * Si rehype-pretty-code agregó data-language,
   * estamos dentro de un bloque de código.
   * No aplicamos el estilo de inline-code.
   */
  if (props["data-language"]) {
    return (
      <code
        {...props}
        className={className}
      />
    );
  }

  return (
    <code
      {...props}
      className={[
        styles.inlineCode,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

const components: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className={styles.h1}
    />
  ),

  h2: (props) => (
    <h2
      {...props}
      className={styles.h2}
    />
  ),

  h3: (props) => (
    <h3
      {...props}
      className={styles.h3}
    />
  ),

  p: (props) => (
    <p
      {...props}
      className={styles.paragraph}
    />
  ),

  strong: (props) => (
    <strong
      {...props}
      className={styles.strong}
    />
  ),

  ul: (props) => (
    <ul
      {...props}
      className={styles.ul}
    />
  ),

  ol: (props) => (
    <ol
      {...props}
      className={styles.ol}
    />
  ),

  blockquote: (props) => (
    <blockquote
      {...props}
      className={styles.blockquote}
    />
  ),

  a: (props) => (
    <a
      {...props}
      className={styles.link}
    />
  ),

  hr: (props) => (
    <hr
      {...props}
      className={styles.hr}
    />
  ),

  code: MdxCode,

  pre: CodeBlock,

  table: MdxTable,
};

export function useMDXComponents(): MDXComponents {
  return components;
}