"use client";

import {
  Suspense,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import type { ArticleMetadata } from "@/types/article";

import styles from "./ArticlesExplorer.module.css";

type Props = {
  articles: ArticleMetadata[];
};

type SortMode =
  | "recent"
  | "oldest"
  | "title";

type ExplorerContentProps = Props & {
  selectedSeries: string;
};

/* ============================================================
   COMPONENT
============================================================ */

export default function ArticlesExplorer({
  articles,
}: Props) {
  return (
    <Suspense
      fallback={
        <ArticlesExplorerContent
          articles={articles}
          selectedSeries=""
        />
      }
    >
      <ArticlesExplorerFromUrl
        articles={articles}
      />
    </Suspense>
  );
}

/* ============================================================
   READ SERIES FROM URL
============================================================ */

function ArticlesExplorerFromUrl({
  articles,
}: Props) {
  const searchParams =
    useSearchParams();

  const selectedSeries =
    searchParams
      .get("serie")
      ?.trim() ?? "";

  return (
    <ArticlesExplorerContent
      articles={articles}
      selectedSeries={selectedSeries}
    />
  );
}

/* ============================================================
   EXPLORER
============================================================ */

function ArticlesExplorerContent({
  articles,
  selectedSeries,
}: ExplorerContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState("Todos");

  const [tag, setTag] =
    useState("Todos");

  const [sort, setSort] =
    useState<SortMode>("recent");

  /* ==========================================================
     CATEGORIES
  ========================================================== */

  const categories = useMemo(
    () => [
      "Todos",

      ...Array.from(
        new Set(
          articles.map(
            (article) =>
              article.category,
          ),
        ),
      ).sort(),
    ],

    [articles],
  );

  /* ==========================================================
     TAGS
  ========================================================== */

  const tags = useMemo(
    () => [
      "Todos",

      ...Array.from(
        new Set(
          articles.flatMap(
            (article) =>
              article.tags,
          ),
        ),
      ).sort(),
    ],

    [articles],
  );

  /* ==========================================================
     FILTER + SORT
  ========================================================== */

  const filteredArticles =
    useMemo(() => {
      const normalizedQuery =
        normalize(query);

      const normalizedSeries =
        normalize(selectedSeries);

      const result =
        articles.filter(
          (article) => {
            const searchable =
              normalize(
                [
                  article.title,
                  article.excerpt,
                  article.category,
                  article.series ?? "",
                  ...article.tags,
                ].join(" "),
              );

            const matchesQuery =
              !normalizedQuery ||
              searchable.includes(
                normalizedQuery,
              );

            const matchesCategory =
              category === "Todos" ||
              article.category ===
                category;

            const matchesTag =
              tag === "Todos" ||
              article.tags.includes(
                tag,
              );

            const matchesSeries =
              !normalizedSeries ||
              normalize(
                article.series ?? "",
              ) === normalizedSeries;

            return (
              matchesQuery &&
              matchesCategory &&
              matchesTag &&
              matchesSeries
            );
          },
        );

      /*
       * Cuando estamos viendo una serie concreta:
       *
       * Parte 1
       * Parte 2
       * Parte 3
       * ...
       */

      if (selectedSeries) {
        return [...result].sort(
          compareBySeriesOrder,
        );
      }

      /*
       * Orden normal de artículos.
       *
       * En "Más recientes", una serie se trata como un bloque:
       *
       * - el bloque se posiciona según la fecha más reciente
       *   de sus artículos;
       * - dentro de la serie se respeta seriesOrder.
       *
       * Así evitamos:
       *
       * Parte 2
       * Parte 3
       * Parte 1
       *
       * cuando varios artículos de la misma serie tienen
       * fechas distintas o iguales.
       */

      if (sort === "recent") {
        return sortRecentKeepingSeriesTogether(
          result,
        );
      }

      if (sort === "oldest") {
        return [...result].sort(
          (a, b) =>
            a.date.localeCompare(
              b.date,
            ),
        );
      }

      return [...result].sort(
        (a, b) =>
          a.title.localeCompare(
            b.title,
            "es",
          ),
      );
    }, [
      articles,
      query,
      category,
      tag,
      sort,
      selectedSeries,
    ]);

  /* ==========================================================
     CLEAR FILTERS
  ========================================================== */

  function clearFilters() {
    setQuery("");
    setCategory("Todos");
    setTag("Todos");
    setSort("recent");

    if (selectedSeries) {
      router.replace(
        pathname,
        {
          scroll: false,
        },
      );
    }
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <>
      <div className={styles.filters}>
        <div className={styles.search}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path d="m20 20-4-4" />
          </svg>

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
            placeholder="Buscar por nombre, tecnología o tema..."
            aria-label="Buscar artículos"
          />
        </div>

        <div className={styles.selects}>
          <label>
            <span>Tag</span>

            <select
              value={tag}
              onChange={(event) =>
                setTag(
                  event.target.value,
                )
              }
            >
              {tags.map(
                (currentTag) => (
                  <option
                    key={currentTag}
                    value={currentTag}
                  >
                    {currentTag}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span>Orden</span>

            {selectedSeries ? (
              <select
                value="series"
                disabled
                aria-label="Orden de la serie"
              >
                <option value="series">
                  Orden de la serie
                </option>
              </select>
            ) : (
              <select
                value={sort}
                onChange={(event) =>
                  setSort(
                    event.target
                      .value as SortMode,
                  )
                }
              >
                <option value="recent">
                  Más recientes
                </option>

                <option value="oldest">
                  Más antiguos
                </option>

                <option value="title">
                  Nombre A-Z
                </option>
              </select>
            )}
          </label>
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map(
          (currentCategory) => (
            <button
              key={currentCategory}
              type="button"
              className={
                category ===
                currentCategory
                  ? styles.activeCategory
                  : ""
              }
              onClick={() =>
                setCategory(
                  currentCategory,
                )
              }
            >
              {currentCategory}
            </button>
          ),
        )}
      </div>

      <div className={styles.summary}>
        <p>
          {selectedSeries && (
            <>
              Serie{" "}
              <strong>
                {selectedSeries}
              </strong>
              {" · "}
            </>
          )}

          {filteredArticles.length ===
          1
            ? "1 artículo"
            : `${filteredArticles.length} artículos`}
        </p>

        {(query ||
          category !== "Todos" ||
          tag !== "Todos" ||
          selectedSeries) && (
          <button
            type="button"
            onClick={clearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filteredArticles.length >
      0 ? (
        <div className={styles.grid}>
          {filteredArticles.map(
            (article) => (
              <ArticleCard
                key={article.slug}
                article={article}
              />
            ),
          )}
        </div>
      ) : (
        <div className={styles.empty}>
          <span>0 resultados</span>

          <h2>
            No encontré artículos con
            esos filtros.
          </h2>

          <p>
            Probá modificando la
            búsqueda, categoría o tag.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Ver todos los artículos
          </button>
        </div>
      )}
    </>
  );
}

/* ============================================================
   ARTICLE CARD
============================================================ */

function ArticleCard({
  article,
}: {
  article: ArticleMetadata;
}) {
  return (
    <article className={styles.card}>
      <Link
        href={`/articulos/${article.slug}`}
        className={styles.imageLink}
      >
        <div className={styles.image}>
          {article.series &&
            article.seriesOrder != null && (
              <div
                className={styles.partBadge}
                title={`Parte ${article.seriesOrder} de ${article.series}`}
                aria-label={`Parte ${article.seriesOrder} de la serie ${article.series}`}
              >
                <span>Parte</span>

                <strong>
                  {article.seriesOrder}
                </strong>
              </div>
            )}

          {article.image ? (
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              className={
                styles.articleImage
              }
            />
          ) : (
            <div
              className={
                styles.imagePlaceholder
              }
            >
              <span>
                {article.category}
              </span>

              <strong>
                &lt;/&gt;
              </strong>
            </div>
          )}
        </div>
      </Link>

      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span
            className={
              styles.cardCategory
            }
          >
            {article.category}
          </span>

          <span>•</span>

          <time
            dateTime={article.date}
          >
            {formatDate(
              article.date,
            )}
          </time>

          <span>•</span>

          <span>
            {article.readingTime}
          </span>
        </div>

        <h2>
          <Link
            href={`/articulos/${article.slug}`}
          >
            {article.title}
          </Link>
        </h2>

        <p>{article.excerpt}</p>

        <div className={styles.cardTags}>
          {article.tags
            .slice(0, 3)
            .map((currentTag) => (
              <span key={currentTag}>
                {currentTag}
              </span>
            ))}
        </div>

        {article.series && (
          <div
            className={
              styles.seriesRow
            }
          >
            <div
              className={
                styles.seriesInfo
              }
            >
              <span
                className={
                  styles.seriesEyebrow
                }
              >
                Serie
              </span>

              <span
                className={
                  styles.seriesName
                }
              >
                {article.series}
              </span>
            </div>

            <Link
              href={`/articulos?serie=${encodeURIComponent(
                article.series,
              )}`}
              className={
                styles.seriesLink
              }
            >
              Explorar serie

              <span aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        )}

        <Link
          href={`/articulos/${article.slug}`}
          className={styles.readMore}
        >
          Leer artículo

          <span>→</span>
        </Link>
      </div>
    </article>
  );
}

/* ============================================================
   SORT - SERIES
============================================================ */

function compareBySeriesOrder(
  a: ArticleMetadata,
  b: ArticleMetadata,
) {
  const orderA =
    a.seriesOrder ??
    Number.MAX_SAFE_INTEGER;

  const orderB =
    b.seriesOrder ??
    Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return a.title.localeCompare(
    b.title,
    "es",
  );
}

/* ============================================================
   SORT - RECENT KEEPING SERIES AS BLOCKS
============================================================ */

function sortRecentKeepingSeriesTogether(
  articles: ArticleMetadata[],
): ArticleMetadata[] {
  type ArticleGroup = {
    key: string;
    articles: ArticleMetadata[];
    newestDate: string;
    originalIndex: number;
  };

  const groups =
    new Map<string, ArticleGroup>();

  articles.forEach(
    (article, index) => {
      const key =
        article.series
          ? `series:${article.series}`
          : `article:${article.slug}`;

      const existingGroup =
        groups.get(key);

      if (existingGroup) {
        existingGroup.articles.push(
          article,
        );

        if (
          article.date >
          existingGroup.newestDate
        ) {
          existingGroup.newestDate =
            article.date;
        }

        return;
      }

      groups.set(
        key,
        {
          key,
          articles: [article],
          newestDate: article.date,
          originalIndex: index,
        },
      );
    },
  );

  return Array.from(
    groups.values(),
  )
    .sort(
      (a, b) => {
        const dateComparison =
          b.newestDate.localeCompare(
            a.newestDate,
          );

        if (dateComparison !== 0) {
          return dateComparison;
        }

        return (
          a.originalIndex -
          b.originalIndex
        );
      },
    )
    .flatMap(
      (group) => {
        if (
          group.articles.length > 1 &&
          group.articles.every(
            (article) =>
              article.series != null,
          )
        ) {
          return [
              ...group.articles,
            ].sort(
              (a, b) =>
                (b.seriesOrder ?? 0) -
                (a.seriesOrder ?? 0),
            );
        }

        return group.articles;
      },
    );
}

/* ============================================================
   NORMALIZE
============================================================ */

function normalize(
  value: string,
) {
  return value
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      "",
    )
    .toLowerCase()
    .trim();
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
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(
    new Date(
      `${date}T12:00:00Z`,
    ),
  );
}
