import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleCover from "@/components/ArticleCover";

import {
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/content/articles/articles";

import styles from "./article.module.css";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

/* ============================================================
   STATIC PARAMS
============================================================ */

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({
    slug,
  }));
}

/* ============================================================
   METADATA
============================================================ */

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const registeredArticle =
    getArticleBySlug(slug);

  if (!registeredArticle) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const article =
    registeredArticle.metadata;

  return {
    title: article.title,

    description: article.excerpt,

    alternates: {
      canonical:
        `/articulos/${article.slug}`,
    },

    openGraph: {
      type: "article",

      title: article.title,

      description:
        article.excerpt,

      url:
        `/articulos/${article.slug}`,

      publishedTime:
        article.date,

      tags:
        article.tags,

      ...(article.image
        ? {
            images: [
              {
                url: article.image,
                alt: article.title,
              },
            ],
          }
        : {}),
    },
  };
}

/* ============================================================
   PAGE
============================================================ */

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const registeredArticle =
    getArticleBySlug(slug);

  if (!registeredArticle) {
    notFound();
  }

  const article =
    registeredArticle.metadata;

  const articleModule =
    await registeredArticle.load();

  const ArticleContent =
    articleModule.default;

  const seriesUrl =
    article.series
      ? `/articulos?serie=${encodeURIComponent(
          article.series,
        )}`
      : null;

  return (
    <main className={styles.page}>
      <div className={styles.top}>
        <Link
          href="/articulos"
          className={styles.back}
        >
          <span aria-hidden="true">
            ←
          </span>

          Todos los artículos
        </Link>
      </div>

      <article className={styles.article}>
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className={styles.header}>
          <div className={styles.metadata}>
            <span className={styles.category}>
              {article.category}
            </span>

            <span
              className={styles.dot}
              aria-hidden="true"
            >
              •
            </span>

            <time dateTime={article.date}>
              {formatDate(article.date)}
            </time>

            <span
              className={styles.dot}
              aria-hidden="true"
            >
              •
            </span>

            <span>
              {article.readingTime}
            </span> 
          </div>

          {/* ==================================================
                SERIE
            ================================================== */}

            {article.series && seriesUrl && (
            <div className={styles.seriesLine}>
              <Link
                href={seriesUrl}
                className={styles.seriesName}
              >
                SERIE · {article.series}
              </Link>

              {article.seriesOrder && (
                <>
                  <span className={styles.seriesSeparator}>•</span>

                  <span className={styles.seriesPart}>
                    PARTE {article.seriesOrder}
                  </span>
                </>
              )}

              <span className={styles.seriesSeparator}>•</span>

              <Link
                href={seriesUrl}
                className={styles.seriesLink}
              >
                VER SERIE →
              </Link>
            </div>
          )}
        </header>

        {/* ====================================================
            COVER
        ==================================================== */}

        <div className={styles.cover}>
          <ArticleCover
            src={article.image}
            alt={article.title}
            category={article.category}
            priority
            sizes="(max-width: 900px) 100vw, 1100px"
            className={styles.coverImage}
          />
        </div>

        {/* ====================================================
            MDX
        ==================================================== */}

        <div className={styles.content}>
          <ArticleContent />
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <footer className={styles.footer}>
          <div>
            <span className={styles.footerLabel}>
              Escrito por
            </span>

            <strong>
              Leandro Layerle
            </strong>
          </div>

          <Link href="/articulos">
            Ver más artículos

            <span aria-hidden="true">
              →
            </span>
          </Link>
        </footer>
      </article>
    </main>
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
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(
    new Date(
      `${date}T12:00:00Z`,
    ),
  );
}