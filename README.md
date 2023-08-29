I have created this project to play with some popular serverless graphql platforms such as [Hasura](https://hasura.io/), [Grafbase](https://grafbase.com/).

The idea is to connect multiple REST/GraphQL APIs using a grahql server. Essentially the root graphql server will act as the API gateway.

## Project Roadmap

- [x] Use [Hasura](https://hasura.io/) or [Grafbase](https://grafbase.com/) as root GraphQL server. (Currently using Hasura).
- [x] Use [TMDB API popular movies](https://developer.themoviedb.org/reference/movie-popular-list) for movie list.
- [ ] Use [TMDB API popular TV series](https://developer.themoviedb.org/reference/tv-series-popular-list) for TV series list.
- [ ] Use [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/overview/graphql/getting-started) for list of animes.
- [x] Authenticate user using [next-auth](https://next-auth.js.org/).
- [x] Connect to [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) for storing user related data.
- [ ] Store users favorite media content list in database.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Tailwindcss](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Hasura](https://hasura.io/)
- [Prisma](https://www.prisma.io/)
