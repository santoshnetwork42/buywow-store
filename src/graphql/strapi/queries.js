import { gql } from "@apollo/client";

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
            link
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

export const landingPage = gql`
  query LandingPage {
    pages(filters: { slugId: { eq: "index" } }) {
      data {
        attributes {
          blocks {
            __typename
            ... on ComponentBannerCarousal {
              carousalItems {
                id
                webImage {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                mWebImage {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                link
              }
              autoPlay
              autoPlayInterval
            }
            ... on ComponentBannerBanners {
              bannerItems {
                id
                webImage {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                mWebImage {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                link
              }
            }
            ... on ComponentBlocksFeaturedList {
              featuredListItems {
                id
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                text
              }
              isWebHorizontal
            }
            ... on ComponentCategoriesTrendingCategories {
              trendingCategoryItems {
                id
                slug
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
                title
              }
            }
            ... on ComponentCategoriesIngredientCategories {
              title
              ingredientCategoryItems {
                slug
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksFeaturedProducts {
              id
              title
              button {
                text
                slug
              }
              products {
                data {
                  attributes {
                    slug
                    imageBgColor
                    offerTag {
                      showOfferTag
                      bgColor
                    }
                    promotionTag {
                      data {
                        attributes {
                          tag
                          bgColor
                        }
                      }
                    }
                    productBenefitTags {
                      data {
                        attributes {
                          tag
                          bgColor
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
