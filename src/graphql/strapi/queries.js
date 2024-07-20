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
          slug
          slugId
          type
          blocks {
            __typename
            ... on ComponentBannerCarousal {
              id
              carousalItems {
                id
                webImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                mWebImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                link
                moeText
              }
              autoPlay
              autoPlayInterval
            }
            ... on ComponentBannerBanners {
              id
              bannerItems {
                id
                webImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                mWebImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                link
                moeText
              }
            }
            ... on ComponentCategoriesFeaturedCategories {
              id
              title
              festuredItemSize: size
              featuredCategoryItems {
                id
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
                slug
                title
              }
            }
            ... on ComponentCategoriesTrendingCategories {
              id
              trendingCategoryItems {
                id
                slug
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                title
              }
            }
            ... on ComponentCategoriesIngredientCategories {
              id
              title
              ingredientCategoryItems {
                id
                slug
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                moeText
              }
            }
            ... on ComponentBlocksAnnouncementBar {
              id
              leftText
              rightText
              centerText
              timer {
                id
                type
                startTime
                endTime
                startDate
                endDate
              }
            }
            ... on ComponentBlocksBlogSection {
              id
              title
            }
            ... on ComponentBlocksCollectionLinks {
              id
              collectionLinksBgColor: bgColor
              collectionLinkItems {
                id
                text
                slug
              }
            }
            ... on ComponentBlocksFeaturedList {
              id
              featuredListItems {
                id
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      height
                      width
                    }
                  }
                }
                text
              }
              isWebHorizontal
            }
            ... on ComponentBlocksFeaturedProducts {
              id
              title
              featuredProductsBgColor: bgColor
              button {
                id
                text
                slug
              }
              products {
                data {
                  attributes {
                    slug
                    slugId
                    promotionTag {
                      data {
                        id
                        attributes {
                          tag
                          bgColor
                        }
                      }
                    }
                    productBenefitTags {
                      data {
                        id
                        attributes {
                          tag
                          bgColor
                        }
                      }
                    }
                    imageBgColor
                    offerTag {
                      id
                      showOfferTag
                      bgColor
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksFeaturedProductsByTab {
              id
              title
              featuredProductsByTabBgColor: bgColor
              button {
                id
                text
                slug
              }
              featuredProductsTabItems {
                id
                tab {
                  data {
                    attributes {
                      title
                    }
                  }
                }
                products {
                  data {
                    attributes {
                      slug
                      slugId
                      promotionTag {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      productBenefitTags {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      imageBgColor
                      offerTag {
                        id
                        showOfferTag
                        bgColor
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksInfoSection {
              id
              information
            }
            ... on ComponentBlocksPdp {
              id
              product {
                id
                product {
                  data {
                    attributes {
                      slug
                      slugId
                      promotionTag {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      productBenefitTags {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      imageBgColor
                      offerTag {
                        id
                        showOfferTag
                        bgColor
                      }
                      productDetailView {
                        ... on ComponentAccordionDescriptionSection {
                          id
                          accordionDescriptionTitle: title
                          image {
                            data {
                              attributes {
                                alternativeText
                                url
                                width
                                height
                              }
                            }
                          }
                          description
                        }
                        ... on ComponentAccordionFaQsSection {
                          id
                          accordionFAQsTitle: title
                          image {
                            data {
                              attributes {
                                alternativeText
                                url
                                width
                                height
                              }
                            }
                          }
                          FAQs {
                            id
                            question
                            answer
                          }
                        }
                        ... on ComponentAccordionIngredientsSection {
                          id
                          accordionIngredientsTitle: title
                          image {
                            data {
                              attributes {
                                alternativeText
                                url
                                width
                                height
                              }
                            }
                          }
                          ingredientItems {
                            data {
                              attributes {
                                text
                                subText
                                image {
                                  data {
                                    attributes {
                                      alternativeText
                                      url
                                      height
                                      width
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        ... on ComponentAccordionUsageInstructionsSection {
                          id
                          accordionUsageInstructionsTitle: title
                          image {
                            data {
                              attributes {
                                alternativeText
                                url
                                width
                                height
                              }
                            }
                          }
                          usageInstructionItems {
                            id
                            text
                          }
                        }
                        ... on ComponentBlocksFeaturedList {
                          id
                          isWebHorizontal
                          featuredListItems {
                            id
                            text
                            image {
                              data {
                                attributes {
                                  alternativeText
                                  width
                                  url
                                  height
                                }
                              }
                            }
                          }
                        }
                        ... on ComponentBlocksUpsellProducts {
                          id
                          title
                          upsellProductsBgColor: bgColor
                          upsellProductItems {
                            id
                            text
                            subText
                            product {
                              data {
                                attributes {
                                  slug
                                  slugId
                                  promotionTag {
                                    data {
                                      id
                                      attributes {
                                        tag
                                        bgColor
                                      }
                                    }
                                  }
                                  productBenefitTags {
                                    data {
                                      id
                                      attributes {
                                        tag
                                        bgColor
                                      }
                                    }
                                  }
                                  imageBgColor
                                  offerTag {
                                    id
                                    showOfferTag
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
            ... on ComponentBlocksProductCollectionByTab {
              id
              title
              defaultCollectionSorting
              verticalBlogCard {
                id
                title
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
                button {
                  id
                  text
                  link
                }
                bgColor
                row
              }
              horizontalBlogCards {
                id
                title
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
                button {
                  id
                  text
                  link
                }
                bgColor
                row
              }
              productCollectionTabItems {
                id
                tab {
                  data {
                    attributes {
                      title
                    }
                  }
                }
                products {
                  data {
                    attributes {
                      slug
                      slugId
                      promotionTag {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      productBenefitTags {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      imageBgColor
                      offerTag {
                        id
                        showOfferTag
                        bgColor
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksTestimonialSection {
              id
              title
              testimonials {
                data {
                  attributes {
                    name
                    age
                    webImage {
                      data {
                        attributes {
                          alternativeText
                          url
                          width
                          height
                        }
                      }
                    }
                    mWebImage {
                      data {
                        attributes {
                          alternativeText
                          url
                          width
                          height
                        }
                      }
                    }
                    description
                    concerns {
                      id
                      text
                    }
                    product {
                      data {
                        attributes {
                          slug
                          slugId
                          imageBgColor
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksUpsellProducts {
              id
              title
              upsellProductsBgColor: bgColor
              upsellProductItems {
                id
                text
                subText
                product {
                  data {
                    attributes {
                      slug
                      slugId
                      promotionTag {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      productBenefitTags {
                        data {
                          id
                          attributes {
                            tag
                            bgColor
                          }
                        }
                      }
                      imageBgColor
                      offerTag {
                        id
                        showOfferTag
                        bgColor
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentBlocksVideoSection {
              id
              title
              videoSectionBgColor: bgColor
              videoSize: size
              button {
                id
                text
                link
              }
              videoItems {
                id
                video {
                  data {
                    attributes {
                      alternativeText
                      width
                      height
                      url
                    }
                  }
                }
                thumbnail {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on ComponentAccordionDescriptionSection {
              id
              accordionDescriptionTitle: title
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              description
            }
            ... on ComponentAccordionFaQsSection {
              id
              accordionFAQsTitle: title
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              FAQs {
                id
                question
                answer
              }
            }
            ... on ComponentAccordionIngredientsSection {
              id
              accordionIngredientsTitle: title
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              ingredientItems {
                data {
                  attributes {
                    text
                    subText
                    image {
                      data {
                        attributes {
                          alternativeText
                          url
                          height
                          width
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentAccordionUsageInstructionsSection {
              id
              accordionUsageInstructionsTitle: title
              image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              usageInstructionItems {
                id
                text
              }
            }
            ... on ComponentAccordionInfoDropdownSection {
              id
              accordionInfoDropdownTitle: title
              accordionInfoDropdownBgColor: bgColor
              information
            }
            ... on ComponentProductProductBenefits {
              id
              title
              productBenefitsBgColor: bgColor
              productBenefitItems {
                id
                text
                subText
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on ComponentProductProductEffectivenessImages {
              id
              title
              images {
                id
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on ComponentProductProductHighlightImages {
              id
              images {
                id
                webImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
                mWebImage {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on ComponentProductProductKeyIngredientImages {
              id
              title
              productProductKeyIngredientImagesBgColor: bgColor
              primaryIngredient {
                data {
                  attributes {
                    alternativeText
                    width
                    height
                    url
                  }
                }
              }
              secondaryIngredients {
                id
                title
                image {
                  data {
                    attributes {
                      alternativeText
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
            ... on ComponentProductProductReviews {
              id
              title
            }
          }
        }
      }
    }
  }
`;
