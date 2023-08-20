/** @type {import('next').NextConfig} */

const GRAFBASE_URL = process.env.NEXT_PUBLIC_GRAFBASE_API_URL;

const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "ui-avatars.com", "fakeimg.pl"],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: GRAFBASE_URL,
      },
    ];
  },
};

module.exports = nextConfig;
