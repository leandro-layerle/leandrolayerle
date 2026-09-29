declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { JSX } from "react";

  type ArticleMetadata =
    import("./article").ArticleMetadata;

  export const article: ArticleMetadata;

  export default function MDXContent(
    props: MDXProps,
  ): JSX.Element;
}