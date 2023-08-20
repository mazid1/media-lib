import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

// https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/

/**
 * This client is intended to be used in the server component only
 */
export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY as string,
      },
    }),
  });
});
