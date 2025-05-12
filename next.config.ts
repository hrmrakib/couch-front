import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "http://192.168.10.132:3759",
      "http://192.168.10.132:3759/api/v1",
      "192.168.10.132",
      "192.168.10.251",
      "http://192.168.10.132:3759",
    ],
  },
};

module.exports = nextConfig;
