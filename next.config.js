/** @type {import('next').NextConfig} */

const HASURA_URL = process.env.NEXT_PUBLIC_HASURA_API_URL;

const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "ui-avatars.com", "fakeimg.pl"],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: HASURA_URL,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
