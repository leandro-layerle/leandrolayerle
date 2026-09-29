import type { ComponentType } from "react";

import type { ArticleMetadata } from "@/types/article";

type ArticleModule = {
  default: ComponentType;
  article: ArticleMetadata;
};

export type RegisteredArticle = {
  metadata: ArticleMetadata;
  load: () => Promise<ArticleModule>;
};

/*
 * Metadata de todos los .mdx de esta carpeta.
 */
const metadataModules = import.meta.glob("./*.mdx", {
  eager: true,
  import: "article",
}) as Record<string, ArticleMetadata>;

/*
 * Contenido completo de los artículos.
 * Se carga solamente cuando se necesita.
 */
const articleModules = import.meta.glob("./*.mdx") as Record<
  string,
  () => Promise<unknown>
>;

/*
 * Registro generado automáticamente.
 */
const registeredArticles: RegisteredArticle[] = Object.entries(
  metadataModules,
)
  .map(([path, metadata]) => {
    const loader = articleModules[path];

    if (!loader) {
      return null;
    }

    return {
      metadata,

      load: async () => {
        const articleModule =
          (await loader()) as ArticleModule;

        return articleModule;
      },
    };
  })
  .filter(
    (
      registeredArticle,
    ): registeredArticle is RegisteredArticle =>
      registeredArticle !== null,
  );

/*
 * Devuelve todos los artículos publicados,
 * ordenados del más reciente al más antiguo.
 */
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

/*
 * Busca un artículo por slug.
 */
export function getArticleBySlug(
  slug: string,
): RegisteredArticle | undefined {
  return registeredArticles.find(
    (registeredArticle) =>
      registeredArticle.metadata.slug === slug &&
      registeredArticle.metadata.published !== false,
  );
}

/*
 * Slugs utilizados por generateStaticParams().
 */
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