/** @type {import('next').NextConfig} */

const HASURA_URL = process.env.NEXT_PUBLIC_HASURA_API_URL;

const nextConfig = {
  images: {
    domains: ["image.tmdb.org", "ui-avatars.com", "fakeimg.pl"],
  },
  async rewrites() {
    return [
      {
        source: "/v1/graphql",
        destination: HASURA_URL,
      },
    ];
  },
};

module.exports = nextConfig;
