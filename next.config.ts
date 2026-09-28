import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "mdx",
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm",
    ],

    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-dimmed",
          keepBackground: false,

          defaultLang: {
            block: "plaintext",
            inline: "plaintext",
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig); 