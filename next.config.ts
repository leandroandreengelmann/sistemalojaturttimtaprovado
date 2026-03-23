import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cnehsxushfulwhuwgjli.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(process.cwd(), "node_modules/tailwindcss/index.css"),
      "tw-animate-css": path.resolve(process.cwd(), "node_modules/tw-animate-css/dist/tw-animate.css"),
      "shadcn/tailwind.css": path.resolve(process.cwd(), "node_modules/shadcn/dist/tailwind.css"),
    },
  },
};

export default nextConfig;
