const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '', // Specify port if necessary; leave empty if not needed
        pathname: '/**', // Use this to match all paths
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '', // Specify port if necessary; leave empty if not needed
        pathname: '/**', // Use this to match all paths
      },
    ],
  },
};

module.exports = nextConfig;
