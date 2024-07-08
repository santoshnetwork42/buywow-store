import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "../../config";

const createApolloClient = () => {
  console.log("STRAPI_API_URL :>> ", STRAPI_API_URL);
  console.log("STRAPI_API_TOKEN :>> ", STRAPI_API_TOKEN);
  return new ApolloClient({
    uri: `${STRAPI_API_URL}/graphql`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
