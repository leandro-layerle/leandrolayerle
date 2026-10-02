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

  async rewrites() {
    return [
      {
        source: "/cursoia",
        destination: "https://mini-app-curso-ia.vercel.app/",
      },
      {
        source: "/cursoia/:path*",
        destination: "https://mini-app-curso-ia.vercel.app/:path*",
      },
    ];
  },
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