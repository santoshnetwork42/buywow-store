import { gql } from "@apollo/client";

export const testQuery = gql`
  query Test {
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
          menus {
            id
            title
            slug
            subMenu {
              id
              title
              slug
            }
          }
          otherLinks {
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

export const footer = gql`
  query Footer {
    footer {
      data {
        attributes {
          logo {
            data {
              attributes {
                alternativeText
                url
              }
            }
          }
          description
          socialLinks {
            id
            link
            image {
              data {
                attributes {
                  alternativeText
                  url
                }
              }
            }
          }
          copyrightText
          menus {
            id
            title
            slug
            subMenu {
              id
              title
              slug
            }
          }
          otherLinks {
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
