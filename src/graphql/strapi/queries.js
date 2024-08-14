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
    pages(filters: { slug: { eq: "hair-oil" } }) {
      data {
        attributes {
          slug
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
              showComponent
            }
            ... on ComponentBannerSingleBanner {
              id
              banner {
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
              showComponent
            }
            ... on ComponentBannerMiniBanners {
              id
              miniBannerItems {
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
              showComponent
            }
            ... on ComponentCategoriesFeaturedCategories {
              id
              title
              featuredItemSize: size
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
              showComponent
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
              showComponent
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
              showComponent
            }
            ... on ComponentBlocksAnnouncementBar {
              id
              leftText
              rightText
              centerText
              showTimer
              bgColor
              link
              timer {
                id
                type
                startTime
                endTime
                startDate
                endDate
              }
              showComponent
            }
            ... on ComponentBlocksBreadcrumb {
              id
              breadcrumbTitle: title
              showComponent
            }
            ... on ComponentBlocksBlogSection {
              id
              title
              showComponent
            }
            ... on ComponentBlocksCollectionLinks {
              id
              collectionLinksBgColor: bgColor
              collectionLinkItems {
                id
                text
                slug
              }
              showComponent
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
              showComponent
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
              showComponent
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
              showComponent
            }
            ... on ComponentBlocksInfoSection {
              id
              information
              showComponent
            }
            ... on ComponentBlocksPdp {
              id
              product {
                data {
                  attributes {
                    slug
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
                      __typename
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
                        showComponent
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
                        showComponent
                      }
                      ... on ComponentAccordionIngredientsSection {
                        id
                        accordionIngredientsTitle: title
                        accordionIngredientsImage: image {
                          data {
                            attributes {
                              alternativeText
                              url
                              width
                              height
                            }
                          }
                        }
                        ingredientItems: ingredients {
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
                        showComponent
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
                        showComponent
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
                        showComponent
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
                        showComponent
                      }
                    }
                  }
                }
              }
              showComponent
            }
            ... on ComponentBlocksProductCollectionByTab {
              id
              title
              defaultCollectionSorting
              productCollectionTabItems {
                id
                tab {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
                products {
                  data {
                    attributes {
                      slug
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
              verticalBlogSection {
                id
                row
                verticalBlogItem {
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
                }
              }
              horizontalBlogSection {
                id
                row
                horizontalBlogItems {
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
                }
              }
              showComponent
            }
            ... on ComponentBlocksRecentlyViewed {
              id
              recentlyViewedTitle: title
              recentlyViewedBgColor: bgColor
              showComponent
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
                          imageBgColor
                        }
                      }
                    }
                  }
                }
              }
              showComponent
            }
            ... on ComponentBlocksUpsellProducts {
              id
              title
              upsellProductsBgColor: bgColor
              upsellProductItems {
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
                product {
                  data {
                    attributes {
                      slug
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
              showComponent
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
              showComponent
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
              showComponent
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
              showComponent
            }
            ... on ComponentAccordionIngredientsSection {
              id
              accordionIngredientsTitle: title
              accordionIngredientsImage: image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              ingredientItems: ingredients {
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
              showComponent
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
              showComponent
            }
            ... on ComponentAccordionInfoDropdownSection {
              id
              accordionInfoDropdownTitle: title
              accordionInfoDropdownBgColor: bgColor
              information
              showComponent
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
              showComponent
            }
            ... on ComponentProductProductEffectivenessImages {
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
              EffectivenessChart {
                id
                text
                number
              }
              showComponent
            }
            ... on ComponentProductProductHighlightImages {
              id
              title
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
              showComponent
            }
            ... on ComponentProductProductKeyIngredientImages {
              id
              title
              productProductKeyIngredientImagesBgColor: bgColor
              primaryIngredient {
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
              showComponent
            }
            ... on ComponentProductProductReviews {
              id
              title
              reviewProduct: product {
                data {
                  attributes {
                    slug
                  }
                }
              }
              showComponent
            }
          }
        }
      }
    }
  }
`;
