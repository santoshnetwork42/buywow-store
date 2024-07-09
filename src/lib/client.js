import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "../../config";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${STRAPI_API_URL}/graphql`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    }),
    cache: new InMemoryCache(),
  });
});
