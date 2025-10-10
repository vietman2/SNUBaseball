import type { NextConfig } from "next";

const { TAILSCALE_IP } = process.env;

const devOrigins = ["localhost", TAILSCALE_IP || ""].filter(Boolean);

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  allowedDevOrigins: devOrigins,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      new URL("https://cdn.snubaseball.co.kr/images/**"),
      new URL("https://cdn.snubaseball.co.kr/profiles/**"),
      new URL("https://cdn.snubaseball.co.kr/gallery/**"),
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
