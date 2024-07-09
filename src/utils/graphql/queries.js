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

export const navbar = gql`
  query Navbar {
    navbar {
      data {
        attributes {
          logo {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          VIPMembershipLogo {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          mWebMenuLogo {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          menu {
            id
            title
            slug

            subMenu {
              id
              title
              slug
            }
          }
        }
      }
    }
  }
`;
