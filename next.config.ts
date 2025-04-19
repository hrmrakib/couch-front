const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.10.132',
        port: '3759',
        pathname: '/images/resized/**',
      },
    ],
  },
};

module.exports = nextConfig;
