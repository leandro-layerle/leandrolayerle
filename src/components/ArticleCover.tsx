"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./ArticleCover.module.css";

type ArticleCoverProps = {
  src: string | null;
  alt: string;
  category: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function ArticleCover({
  src,
  alt,
  category,
  priority = false,
  sizes = "100vw",
  className,
}: ArticleCoverProps) {
  const [hasError, setHasError] = useState(false);

  const showImage =
    typeof src === "string" &&
    src.trim().length > 0 &&
    !hasError;

  if (!showImage) {
    return (
      <div
        className={[styles.fallback, className]
          .filter(Boolean)
          .join(" ")}
      >
        <span className={styles.category}>
          {category}
        </span>

        <div className={styles.visual}>
          <span>&lt;</span>
          <strong>/</strong>
          <span>&gt;</span>
        </div>

        <div className={styles.decoration}>
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}