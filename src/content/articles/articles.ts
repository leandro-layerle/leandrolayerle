import type { ComponentType } from "react";

import type { ArticleMetadata } from "@/types/article";

import {
  generatedArticles,
} from "./articles.generated";

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
   ARTICLE REGISTRY

   Los artículos se descubren automáticamente mediante:

   scripts/generate-articles-registry.mjs

   Ese script genera:
   articles.generated.ts

   Este archivo ya no necesita modificarse cuando agregamos
   nuevos archivos .mdx.
============================================================ */

const registeredArticles: RegisteredArticle[] =
  generatedArticles.map(
    (generatedArticle) => ({
      metadata:
        generatedArticle.metadata,

      load: async () => ({
        default:
          generatedArticle.content,

        article:
          generatedArticle.metadata,
      }),
    }),
  );

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