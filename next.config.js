/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.module.rules.push({
      contract: src/contracts,
      loader: "ignore-loader",
    });
    return config;
  },
  
};

module.exports = nextConfig;
