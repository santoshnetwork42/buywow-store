"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { STRAPI_API_TOKEN, STRAPI_API_URL } from "../../config";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${STRAPI_API_URL}/graphql`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
