"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import type {
  ArticleMetadata,
} from "@/types/article";

import ArticleCover from "./ArticleCover";

import styles from "./Articles.module.css";

type Props = {
  articles: ArticleMetadata[];
};

export default function ArticlesCarousel({
  articles,
}: Props) {
  /*
   * Arrancamos en 3 para que SSR y primera
   * hidratación sean consistentes.
   *
   * Después del mount detectamos el viewport.
   */
  const [
    itemsPerView,
    setItemsPerView,
  ] = useState(3);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  useEffect(() => {
    function updateItemsPerView() {
      const width =
        window.innerWidth;

      if (width <= 700) {
        setItemsPerView(1);

        return;
      }

      if (width <= 1050) {
        setItemsPerView(2);

        return;
      }

      setItemsPerView(3);
    }

    updateItemsPerView();

    window.addEventListener(
      "resize",
      updateItemsPerView,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateItemsPerView,
      );
    };
  }, []);

  /*
   * Nunca intentamos mostrar más cards
   * de las que realmente existen.
   */
  const visibleCount =
    Math.min(
      itemsPerView,
      articles.length,
    );

  /*
   * El carrusel solamente es necesario
   * cuando hay más artículos que lugares
   * disponibles en pantalla.
   */
  const hasCarousel =
    articles.length >
    visibleCount;

  /*
   * Construimos siempre las cards visibles
   * partiendo del currentIndex.
   *
   * Esto funciona igual para:
   *
   * 2 artículos + mobile  → 1 visible
   * 3 artículos + mobile  → 1 visible
   * 3 artículos + tablet  → 2 visibles
   * 4 artículos + desktop → 3 visibles
   *
   * El módulo permite continuar desde
   * el principio cuando llegamos al final.
   */
  const visibleArticles =
    useMemo(() => {
      if (
        articles.length === 0
      ) {
        return [];
      }

      return Array.from(
        {
          length:
            visibleCount,
        },
        (_, offset) => {
          const index =
            (currentIndex +
              offset) %
            articles.length;

          return articles[index];
        },
      );
    }, [
      articles,
      currentIndex,
      visibleCount,
    ]);

  function previous() {
    if (
      articles.length === 0
    ) {
      return;
    }

    setCurrentIndex(
      (current) =>
        (current -
          1 +
          articles.length) %
        articles.length,
    );
  }

  function next() {
    if (
      articles.length === 0
    ) {
      return;
    }

    setCurrentIndex(
      (current) =>
        (current + 1) %
        articles.length,
    );
  }

  function goTo(
    index: number,
  ) {
    setCurrentIndex(index);
  }

  if (
    articles.length === 0
  ) {
    return null;
  }

  return (
    <>
      <div
        className={[
          styles.grid,

          visibleCount === 1
            ? styles.single
            : "",

          visibleCount === 2
            ? styles.double
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {visibleArticles.map(
          (article) => (
            <ArticleCard
              key={`${currentIndex}-${article.slug}`}
              article={
                article
              }
            />
          ),
        )}
      </div>

      {hasCarousel && (
        <div
          className={
            styles.footer
          }
        >
          <div
            className={
              styles.dots
            }
          >
            {articles.map(
              (
                article,
                index,
              ) => (
                <button
                  key={
                    article.slug
                  }
                  type="button"
                  aria-label={`Ir al artículo ${index + 1}`}
                  aria-current={
                    index ===
                    currentIndex
                      ? "true"
                      : undefined
                  }
                  className={
                    index ===
                    currentIndex
                      ? styles.activeDot
                      : ""
                  }
                  onClick={() =>
                    goTo(
                      index,
                    )
                  }
                />
              ),
            )}
          </div>

          <div
            className={
              styles.controls
            }
          >
            <button
              type="button"
              onClick={
                previous
              }
              aria-label="Artículo anterior"
            >
              ←
            </button>

            <button
              type="button"
              onClick={
                next
              }
              aria-label="Artículo siguiente"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   CARD
============================================================ */

function ArticleCard({
  article,
}: {
  article: ArticleMetadata;
}) {
  return (
    <article
      className={
        styles.card
      }
    >
      <Link
        href={`/articulos/${article.slug}`}
        className={
          styles.cardLink
        }
      >
        <ArticleCover
          src={
            article.image
          }
          alt={
            article.title
          }
          category={
            article.category
          }
          sizes="
            (max-width: 700px) 100vw,
            (max-width: 1050px) 50vw,
            33vw
          "
          className={
            styles.image
          }
        />

        <div
          className={
            styles.imageOverlay
          }
        />

        <div
          className={
            styles.cardContent
          }
        >
          <div
            className={
              styles.meta
            }
          >
            <span
              className={
                styles.category
              }
            >
              {
                article.category
              }
            </span>

            <span>•</span>

            <time
              dateTime={
                article.date
              }
            >
              {formatDate(
                article.date,
              )}
            </time>

            <span>•</span>

            <span>
              {
                article.readingTime
              }
            </span>
          </div>

          <h3>
            {article.title}
          </h3>

          <p>
            {article.excerpt}
          </p>

          <div
            className={
              styles.readMore
            }
          >
            Leer artículo
            <span>→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   DATE
============================================================ */

function formatDate(
  date: string,
) {
  return new Intl.DateTimeFormat(
    "es-AR",
    {
      day: "2-digit",

      month:
        "short",

      year:
        "numeric",

      timeZone:
        "UTC",
    },
  ).format(
    new Date(
      `${date}T12:00:00Z`,
    ),
  );
}