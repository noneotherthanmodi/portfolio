// GitHub Pages serves a project repo from /<repo>; the deploy workflow passes that prefix in.
// Empty for a <user>.github.io repo or a custom domain.
const basePath = process.env.PAGES_BASE_PATH ?? "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
