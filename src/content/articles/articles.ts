import type { ComponentType } from "react";

import type { ArticleMetadata } from "@/types/article";

import ArticleContent, {
  article as rawArticleMetadata,
} from "./ef-core-10-named-query-filters.mdx";

/* ============================================================
   TYPES
============================================================ */

type ArticleModule = {
  default: ComponentType;
  article: ArticleMetadata;
};

export type RegisteredArticle = {
  metadata: ArticleMetadata;
  load: () => Promise<ArticleModule>;
};

/* ============================================================
   CURRENT ARTICLE

   El MDX expone:
   - default -> componente React
   - article -> metadata

   Hacemos el cast explícito porque el tipado generado
   automáticamente para MDX no conoce nuestra estructura.
============================================================ */

const efCore10NamedQueryFiltersMetadata =
  rawArticleMetadata as unknown as ArticleMetadata;

const EfCore10NamedQueryFiltersContent =
  ArticleContent as ComponentType;

/* ============================================================
   ARTICLE REGISTRY
============================================================ */

const registeredArticles: RegisteredArticle[] = [
  {
    metadata:
      efCore10NamedQueryFiltersMetadata,

    load: async () => ({
      default:
        EfCore10NamedQueryFiltersContent,

      article:
        efCore10NamedQueryFiltersMetadata,
    }),
  },
];

/* ============================================================
   GET ALL ARTICLES
============================================================ */

export function getAllArticles(): ArticleMetadata[] {
  return registeredArticles
    .filter(
      (registeredArticle) =>
        registeredArticle.metadata.published !== false,
    )
    .map(
      (registeredArticle) =>
        registeredArticle.metadata,
    )
    .sort((a, b) =>
      b.date.localeCompare(a.date),
    );
}

/* ============================================================
   GET ARTICLE BY SLUG
============================================================ */

export function getArticleBySlug(
  slug: string,
): RegisteredArticle | undefined {
  return registeredArticles.find(
    (registeredArticle) =>
      registeredArticle.metadata.slug === slug &&
      registeredArticle.metadata.published !== false,
  );
}

/* ============================================================
   GET ALL SLUGS
============================================================ */

export function getAllArticleSlugs(): string[] {
  return registeredArticles
    .filter(
      (registeredArticle) =>
        registeredArticle.metadata.published !== false,
    )
    .map(
      (registeredArticle) =>
        registeredArticle.metadata.slug,
    );
}