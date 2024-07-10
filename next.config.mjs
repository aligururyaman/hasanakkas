/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://localhost:2000/api/:path*`,
      },
    ];
  }
};

export default nextConfig;
