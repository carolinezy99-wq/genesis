import type { NextConfig } from "next";

const isSitesStaticExport = process.env.SITES_STATIC_EXPORT === "1";
const isGitHubPages = process.env.GITHUB_PAGES === "1";
const isStaticExport = isSitesStaticExport || isGitHubPages;
const basePath = isGitHubPages ? "/genesis" : undefined;

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath,
  assetPrefix: basePath,
  trailingSlash: isStaticExport,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
  images: {
    unoptimized: isStaticExport,
  },
};

export default nextConfig;
