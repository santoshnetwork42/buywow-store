import { gql } from "@apollo/client";

export const testQuery = gql`
  query test {
    pages {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
