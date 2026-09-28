import type { MetadataRoute } from "next";

import {
  getAllArticles,
} from "@/content/articles/articles";

const BASE_URL =
  "https://www.leandrolayerle.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles =
    getAllArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre-mi`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mentorias`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/articulos`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap =
    articles.map(
      (article) => ({
        url:
          `${BASE_URL}/articulos/${article.slug}`,

        lastModified:
          new Date(
            `${article.date}T12:00:00Z`,
          ),

        changeFrequency:
          "monthly",

        priority: 0.8,

        ...(article.image
          ? {
              images: [
                `${BASE_URL}${article.image}`,
              ],
            }
          : {}),
      }),
    );

  return [
    ...staticPages,
    ...articlePages,
  ];
}