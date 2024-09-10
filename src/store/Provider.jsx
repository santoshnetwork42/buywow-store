"use client";

import Carousel from "@/components/blocks/Carousel";
import FeaturedList from "@/components/blocks/FeaturedList";
import FeaturedProductsByTab from "@/components/blocks/FeaturedProductsByTab";
import TrendingCategories from "@/components/blocks/TrendingCategories";
import Header from "@/components/partials/Header";
import store, { persistor } from "@/store/store";
import { Provider as ReactProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const Provider = ({ children, data }) => {
  const { headerData, carouselData } = data || {};

  return (
    <ReactProvider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <div className="max-h-[100dvh] overflow-hidden">
            {headerData?.data && <Header data={headerData} />}
            <TrendingCategories
              trendingCategoryItems={[
                {
                  id: "1136",
                  slug: "face-wash-men-and-women",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/face_wash_5e0d222408.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Facewash",
                },
                {
                  id: "1137",
                  slug: "face-serum",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/face_serum_e9576c17c3.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Face Serum",
                },
                {
                  id: "1138",
                  slug: "hair-oil",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/hair_oil_01be67b89c.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Hair Oil",
                },
                {
                  id: "1139",
                  slug: "hair-shampoo",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/shampoo_7f557d8ecf.jpg",
                        height: 1250,
                        width: 1251,
                      },
                    },
                  },
                  title: "Shampoo",
                },
                {
                  id: "1140",
                  slug: "hair-conditioner",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/conditioner_cab53cfccb.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Conditioner",
                },
                {
                  id: "1141",
                  slug: "body-lotion",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/bodylotion_74f511eaf4.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Body Lotion",
                },
                {
                  id: "1142",
                  slug: "gift-pack",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/kit_091d9cbfad.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Gift Set",
                },
                {
                  id: "1143",
                  slug: "sunscreen",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/sunscreen_f4ffc158b1.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Sunscreen",
                },
                {
                  id: "1144",
                  slug: "skin-face-moisturizer",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/moisteriser_80b9c8abee.jpg",
                        height: 1251,
                        width: 1251,
                      },
                    },
                  },
                  title: "Moisturizer",
                },
              ]}
            />
            {carouselData?.showComponent && (
              <Carousel
                carousalItems={carouselData?.carousalItems}
                isPersistLoading
              />
            )}
            <FeaturedList
              isWebHorizontal={true}
              isInPDP={false}
              featuredListItems={[
                {
                  id: "1",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/image_03ed48d8a8.png",
                        height: 118,
                        width: 118,
                      },
                    },
                  },
                  text: "<p>Natural<br>ingredients</p>",
                },
                {
                  id: "2",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/image_1_d0768fe35c.png",
                        height: 118,
                        width: 118,
                      },
                    },
                  },
                  text: "<p>No Harsh<br>Chemicals</p>",
                },
                {
                  id: "3",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/image_2_9c01c2d4a9.png",
                        height: 118,
                        width: 118,
                      },
                    },
                  },
                  text: "<p>Cruelty<br>Free</p>",
                },
                {
                  id: "4",
                  image: {
                    data: {
                      attributes: {
                        alternativeText: null,
                        url: "https://media.buywow.in/public/wow-cms/image_3_d500fcc859.png",
                        height: 118,
                        width: 118,
                      },
                    },
                  },
                  text: "<p>Dermatologist&nbsp;<br>Tested</p>",
                },
              ]}
              isInPersistLoading
            />
            <FeaturedProductsByTab
              title="Our Best Sellers"
              featuredProductsByTabBgColor="WHITE"
              button={{
                id: "1",
                text: "View all",
                slug: "best-selling-products",
              }}
              featuredProductsTabItems={[
                {
                  id: "13140",
                  tab: {
                    data: {
                      attributes: {
                        title: "Facewash",
                      },
                    },
                  },
                  products: {
                    data: [
                      {
                        attributes: {
                          slug: "brightening-vitamin-c-foaming-face-wash-with-built-in-brush",
                          promotionTag: {
                            data: null,
                          },
                          productBenefitTags: {
                            data: [
                              {
                                id: "23",
                                attributes: {
                                  tag: "Impurities On Skin",
                                  bgColor: "#aee9d9",
                                },
                              },
                              {
                                id: "37",
                                attributes: {
                                  tag: "Uneven Skin Tone",
                                  bgColor: "#fcf4e3",
                                },
                              },
                              {
                                id: "22",
                                attributes: {
                                  tag: "Dark Spots",
                                  bgColor: "#aee9d9",
                                },
                              },
                              {
                                id: "42",
                                attributes: {
                                  tag: "Dullness",
                                  bgColor: "#fdfbdb",
                                },
                              },
                            ],
                          },
                          imageBgColor: "#F7F7E7",
                          offerTag: {
                            id: "127",
                            showOfferTag: true,
                            bgColor: "#FFFFFF",
                          },
                          fetchedProduct: {
                            benefits: [
                              "Brightens Skin",
                              "Fades Age Spots",
                              "Removes Skin Impurities",
                              "Restores Glow",
                            ],

                            listingPrice: 349,

                            __typename: "Product",
                            rating: 4.95,
                            hasVariant: true,
                            inventory: 100,
                            title:
                              "Vitamin C & Niacinamide Brightening Foaming Face Wash",

                            createdAt: "2024-03-04T05:22:29.834Z",

                            price: 349,

                            hasFaq: true,
                            otherCollections: [
                              "Skin Care with Bhumi",
                              "Upsell",
                              "Vitamin C Face Wash - Flash Deals",
                              "Green tea Serum - Flash Deals",
                              "Play and Win",
                            ],
                            currency: "INR",
                            id: "a1fed37e-5d80-4896-85dc-c140b399b591",
                            sku: "FW_VITCBR",
                            slug: "brightening-vitamin-c-foaming-face-wash-with-built-in-brush",
                            updatedAt: "2024-09-10T18:26:25.331Z",
                            isInventoryEnabled: true,
                            taxable: false,
                            totalRatings: 4434,
                            costPrice: 0,
                            variantGroups: [
                              {
                                variantGroupOptionIds: [
                                  "4a127279-5317-43a5-a6e8-91f1336e346a",
                                  "ae232eca-fd91-4965-b482-03915465c5ab",
                                  "a76b40b0-9d0c-477b-b9a5-acfe7bbff6bd",
                                ],
                                variantGroupId:
                                  "8fce41d6-e29c-41e0-8367-c97ed425a5a0",
                              },
                            ],
                            weight: 0,
                            priority: "5",
                            storeId: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                            pdpCustomAttributes: [
                              {
                                imageKey:
                                  "728963da-4766-4a0b-b151-f090a5611990",
                                description: "",
                                title: "1722343412782",
                              },
                              {
                                imageKey:
                                  "f517deca-89fb-4bc1-b8e9-b30ded0c41dd",
                                description: "",
                                title: "1722343415009",
                              },
                              {
                                imageKey:
                                  "2348bdac-5754-4af7-8b9a-1a76072b8538",
                                description: "",
                                title: "1722343417185",
                              },
                              {
                                imageKey:
                                  "a68b2a41-224e-45be-b2bd-2c672c0b1397",
                                description: "",
                                title: "1722343419448",
                              },
                              {
                                imageKey:
                                  "0f8b603d-39d2-440d-ad60-3f6c69e44442",
                                description: "",
                                title: "1722343422096",
                              },
                            ],
                            googleCategory: "2526",
                            position: 0,
                            categoryId: "bfe7b619-9477-4c58-a02a-cceedb70a1b8",
                            status: "ENABLED",
                            totalOrders: 12701,
                            brand: "WOW Skin Science",
                            continueSellingOutOfStock: false,
                            productType: "Face Wash",
                            minimumOrderQuantity: 1,
                            maximumOrderQuantity: 4,
                            isAtcEnabled: true,
                            isFeedEnabled: true,
                            isSearchFeedEnabled: true,
                            _lastSyncAt: "2024-07-16T07:35:45.099Z",
                            defaultInventory: 1217,
                            defaultPrice: 399,
                            label: " ",
                            seoSchemaCollection: "vitamin-c-range",
                            pageTitle: "",
                            barcode: "",
                            productDescription: "",
                            showOnlyVariantImages: false,
                            vendor: "",
                            labelColor: "",
                            isFbFeedEnabled: true,

                            recommended: false,
                            images: {
                              items: [
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "b2191290-24da-418b-b7d7-fff9f5f7b1d9",
                                  updatedAt: "2024-09-04T10:06:22.580Z",
                                  isThumb: true,
                                  createdAt: "2024-07-31T05:27:24.219Z",
                                  alt: "b2191290-24da-418b-b7d7-fff9f5f7b1d9",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "1b2a3e7b-1c53-4f58-b592-c57d68556772",
                                  position: 1,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "b61d27f7-ac7a-43f7-9f41-9eaed6a7f21c",
                                  updatedAt: "2024-09-04T10:06:22.710Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:18.932Z",
                                  alt: "b61d27f7-ac7a-43f7-9f41-9eaed6a7f21c",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "37a0949c-5af0-4731-81e4-4287a0f9a7f1",
                                  position: 2,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "4c45ba90-dc58-4b6d-866d-fa16b4639447",
                                  updatedAt: "2024-09-04T10:06:22.557Z",
                                  isThumb: false,
                                  createdAt: "2024-07-23T06:36:24.430Z",
                                  alt: "4c45ba90-dc58-4b6d-866d-fa16b4639447",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "d96f6853-eec3-48d5-87f8-b213641cffd5",
                                  position: 2,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "fc41cb25-10cd-4e09-bc80-f490a1fdb176",
                                  updatedAt: "2024-09-04T10:06:22.613Z",
                                  isThumb: false,
                                  alt: "fc41cb25-10cd-4e09-bc80-f490a1fdb176",
                                  createdAt: "2024-07-23T06:36:30.544Z",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "d384e1ad-da49-46d1-8b6a-b1bcdebaf160",
                                  position: 3,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "955a5912-39e5-46d2-9271-e4e726e1ce21",
                                  updatedAt: "2024-09-04T10:06:22.592Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:04.345Z",
                                  alt: "955a5912-39e5-46d2-9271-e4e726e1ce21",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "a39acb46-abe8-4ebc-9b8d-49db97b6211f",
                                  position: 3,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "90d52fe3-af5f-46be-8356-6e033c6dd5d7",
                                  updatedAt: "2024-09-04T10:06:22.609Z",
                                  isThumb: false,
                                  alt: "90d52fe3-af5f-46be-8356-6e033c6dd5d7",
                                  createdAt: "2024-07-23T06:36:27.462Z",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "012b5650-09e9-44c1-bf76-be8aaefd4ac1",
                                  position: 4,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "3b62f12c-77da-493e-b379-fe6065c7b8b2",
                                  updatedAt: "2024-09-04T10:06:22.601Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:08.851Z",
                                  alt: "3b62f12c-77da-493e-b379-fe6065c7b8b2",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "7fc57a06-d491-4cc5-a30e-83b93be39d49",
                                  position: 4,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "fa96388e-25c7-43ae-931b-841d3befdaa9",
                                  updatedAt: "2024-09-04T10:06:22.653Z",
                                  isThumb: false,
                                  createdAt: "2024-07-23T06:36:37.629Z",
                                  alt: "fa96388e-25c7-43ae-931b-841d3befdaa9",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "df42a5f6-92d3-4299-92e4-bade32a4ad5c",
                                  position: 5,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "16a8b677-d6f8-4e45-8fe9-3afdcc3f817e",
                                  updatedAt: "2024-09-04T10:06:22.589Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:14.296Z",
                                  alt: "16a8b677-d6f8-4e45-8fe9-3afdcc3f817e",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "d870bc05-7a8c-4cde-b4d7-ba05dbd81cfd",
                                  position: 5,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "77873940-f619-4e17-95b4-c576788550de",
                                  updatedAt: "2024-09-04T10:06:22.574Z",
                                  isThumb: false,
                                  createdAt: "2024-07-23T06:36:42.264Z",
                                  alt: "77873940-f619-4e17-95b4-c576788550de",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "06a56ea0-6ad1-4933-9775-dab81a26757a",
                                  position: 6,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "4852a5b5-8e17-4abe-9acc-1928302318bf",
                                  updatedAt: "2024-09-04T10:06:22.619Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:02:59.577Z",
                                  alt: "4852a5b5-8e17-4abe-9acc-1928302318bf",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "b3daf107-6e15-48ee-b307-017abe72c16e",
                                  position: 6,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "bc71340b-f9d6-4bd1-bfab-683aa3fadd05",
                                  updatedAt: "2024-09-04T10:06:22.681Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:23.148Z",
                                  alt: "bc71340b-f9d6-4bd1-bfab-683aa3fadd05",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "e214adb0-a1f7-47dd-96c7-95769e0aa0bc",
                                  position: 7,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "25d71e7b-481b-49a9-8370-98f51a401b6f",
                                  updatedAt: "2024-09-04T10:06:22.599Z",
                                  isThumb: false,
                                  alt: "25d71e7b-481b-49a9-8370-98f51a401b6f",
                                  createdAt: "2024-07-23T06:36:49.727Z",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "beb45d8a-0cae-4005-b81a-a493360b00a8",
                                  id: "c6ab376f-626f-47cf-89ea-5cdf709e414f",
                                  position: 8,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "b730c79a-7955-4cd7-b682-a1577fd706de",
                                  updatedAt: "2024-09-04T10:06:22.622Z",
                                  isThumb: false,
                                  createdAt: "2024-07-26T10:03:27.929Z",
                                  alt: "b730c79a-7955-4cd7-b682-a1577fd706de",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  variantId:
                                    "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  id: "3efbca6c-8a61-4ff7-846e-168247de80e6",
                                  position: 8,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                },
                              ],
                            },
                            variants: {
                              items: [
                                {
                                  __typename: "Variant",
                                  barcode: "8906105612099",
                                  inventory: 1217,
                                  status: "ENABLED",
                                  label: "150 ML (With built-in face brush)",
                                  customLabel: "38739161",
                                  lastInventoryUpdatedAt:
                                    "2024-09-10T18:26:25.132Z",
                                  createdAt: "2024-03-04T05:22:29.837Z",
                                  isInventoryEnabled: true,
                                  minimumOrderQuantity: 1,
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  listingPrice: 399,
                                  _lastSyncAt: "2024-07-16T07:35:45.125Z",
                                  productVariantOptionIds: [
                                    {
                                      variantGroupOptionId:
                                        "ae232eca-fd91-4965-b482-03915465c5ab",
                                      variantGroupId:
                                        "8fce41d6-e29c-41e0-8367-c97ed425a5a0",
                                    },
                                  ],
                                  updatedAt: "2024-09-04T10:06:22.427Z",
                                  maximumOrderQuantity: 4,
                                  price: 399,
                                  id: "2006b366-12b4-4162-8a3f-1e06322cf885",
                                  position: 0,
                                  productId:
                                    "a1fed37e-5d80-4896-85dc-c140b399b591",
                                  sku: "FW_VITCBR",
                                  title:
                                    "Vitamin C Foaming Face Wash For Brighter Glow",
                                  images: {
                                    items: [
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "b2191290-24da-418b-b7d7-fff9f5f7b1d9",
                                        updatedAt: "2024-09-04T10:06:22.580Z",
                                        isThumb: true,
                                        createdAt: "2024-07-31T05:27:24.219Z",
                                        alt: "b2191290-24da-418b-b7d7-fff9f5f7b1d9",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "1b2a3e7b-1c53-4f58-b592-c57d68556772",
                                        position: 1,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "b61d27f7-ac7a-43f7-9f41-9eaed6a7f21c",
                                        updatedAt: "2024-09-04T10:06:22.710Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:18.932Z",
                                        alt: "b61d27f7-ac7a-43f7-9f41-9eaed6a7f21c",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "37a0949c-5af0-4731-81e4-4287a0f9a7f1",
                                        position: 2,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "955a5912-39e5-46d2-9271-e4e726e1ce21",
                                        updatedAt: "2024-09-04T10:06:22.592Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:04.345Z",
                                        alt: "955a5912-39e5-46d2-9271-e4e726e1ce21",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "a39acb46-abe8-4ebc-9b8d-49db97b6211f",
                                        position: 3,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "3b62f12c-77da-493e-b379-fe6065c7b8b2",
                                        updatedAt: "2024-09-04T10:06:22.601Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:08.851Z",
                                        alt: "3b62f12c-77da-493e-b379-fe6065c7b8b2",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "7fc57a06-d491-4cc5-a30e-83b93be39d49",
                                        position: 4,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "16a8b677-d6f8-4e45-8fe9-3afdcc3f817e",
                                        updatedAt: "2024-09-04T10:06:22.589Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:14.296Z",
                                        alt: "16a8b677-d6f8-4e45-8fe9-3afdcc3f817e",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "d870bc05-7a8c-4cde-b4d7-ba05dbd81cfd",
                                        position: 5,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "4852a5b5-8e17-4abe-9acc-1928302318bf",
                                        updatedAt: "2024-09-04T10:06:22.619Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:02:59.577Z",
                                        alt: "4852a5b5-8e17-4abe-9acc-1928302318bf",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "b3daf107-6e15-48ee-b307-017abe72c16e",
                                        position: 6,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "bc71340b-f9d6-4bd1-bfab-683aa3fadd05",
                                        updatedAt: "2024-09-04T10:06:22.681Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:23.148Z",
                                        alt: "bc71340b-f9d6-4bd1-bfab-683aa3fadd05",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "e214adb0-a1f7-47dd-96c7-95769e0aa0bc",
                                        position: 7,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                      {
                                        __typename: "Image",
                                        imageKey:
                                          "b730c79a-7955-4cd7-b682-a1577fd706de",
                                        updatedAt: "2024-09-04T10:06:22.622Z",
                                        isThumb: false,
                                        createdAt: "2024-07-26T10:03:27.929Z",
                                        alt: "b730c79a-7955-4cd7-b682-a1577fd706de",
                                        storeId:
                                          "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                        variantId:
                                          "2006b366-12b4-4162-8a3f-1e06322cf885",
                                        id: "3efbca6c-8a61-4ff7-846e-168247de80e6",
                                        position: 8,
                                        productId:
                                          "a1fed37e-5d80-4896-85dc-c140b399b591",
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                      {
                        attributes: {
                          slug: "hyaluronic-acid-foaming-face-wash-with-pump-200-ml",
                          promotionTag: {
                            data: null,
                          },
                          productBenefitTags: {
                            data: [
                              {
                                id: "35",
                                attributes: {
                                  tag: "Dehydrated Skin",
                                  bgColor: "#fcf4e3",
                                },
                              },
                              {
                                id: "36",
                                attributes: {
                                  tag: "Dry, Tired Skin",
                                  bgColor: "#fcf4e3",
                                },
                              },
                              {
                                id: "67",
                                attributes: {
                                  tag: "Aging Skin",
                                  bgColor: "#f7e9e9",
                                },
                              },
                            ],
                          },
                          imageBgColor: "#F7F7E7",
                          offerTag: {
                            id: "238",
                            showOfferTag: true,
                            bgColor: "#FFFFFF",
                          },
                          fetchedProduct: {
                            minimumOrderQuantity: 1,
                            pageTitle: "",
                            rating: 0,
                            createdAt: "2024-05-10T12:56:41.700Z",

                            isTaxEnabled: false,
                            price: 399,
                            additionalInfo: [],
                            hasFaq: false,
                            id: "aba2073a-8811-4d55-970e-30bd2c00cbe9",
                            isFeatured: false,
                            sku: "WOW_FWD_HYAL",
                            barcode: "",
                            brand: "",
                            productDescription: "",
                            slug: "hyaluronic-acid-foaming-face-wash-with-pump-200-ml",
                            updatedAt: "2024-09-10T18:35:08.903Z",
                            taxable: false,
                            totalRatings: 0,
                            weight: 0,
                            googleCategory: "",
                            position: 8,
                            status: "ENABLED",
                            benefits: [
                              "Deeply Cleanses",
                              "Balances Sebum & Moisture Level",
                              "Removes Deep Seated Impurities",
                            ],

                            listingPrice: 399,
                            isAtcEnabled: true,
                            __typename: "Product",
                            inventory: 336,
                            title:
                              "Hyaluronic Acid Face Wash with Pump - 200 ml ",
                            hasVarient: false,
                            manufacturer:
                              "Kapco International Limited, Plot No 10-11, Sector 3, Parwanoo, Himachal Pradesh 173220, India",
                            maximumOrderQuantity: 4,
                            vendor: "",
                            currency: "INR",
                            productType: "",
                            isInventoryEnabled: true,
                            isPublished: true,
                            costPrice: 0,
                            variantGroups: [],
                            storeId: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                            recommended: false,
                            continueSellingOutOfStock: false,
                            isFeedEnabled: false,
                            isSearchFeedEnabled: false,
                            pdpCustomAttributes: [],
                            totalOrders: 1749,
                            categoryId: "bfe7b619-9477-4c58-a02a-cceedb70a1b8",
                            _lastSyncAt: "2024-07-16T07:35:45.112Z",
                            defaultInventory: 336,
                            defaultPrice: 399,
                            label: " ",
                            seoSchemaCollection: "hyaluronic-acid",
                            showOnlyVariantImages: false,
                            labelColor: "",
                            lastInventoryUpdatedAt: "2024-09-10T18:26:25.129Z",
                            isFbFeedEnabled: true,
                            cms: '{"productBenefitTags":{"data":[]},"promotionTag":null,"offerTag":{"showOfferTag":true,"bgColor":"#FFFFFF"},"slug":"hyaluronic-acid-foaming-face-wash-with-pump-200-ml","imageBgColor":"#FFFFFF"}',
                            images: {
                              items: [
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715345834877-HL---FW-200-1.jpg",
                                  updatedAt: "2024-09-10T06:43:19.971Z",
                                  isThumb: true,
                                  createdAt: "2024-05-10T12:57:16.114Z",
                                  alt: "products/1715345834877-HL---FW-200-1.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "3a112f6e-2d18-4d9e-9488-71f0abd68c5a",
                                  position: 1,
                                  productId:
                                    "aba2073a-8811-4d55-970e-30bd2c00cbe9",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715345838392-HL---FW-200-2_.jpg",
                                  updatedAt: "2024-09-10T06:43:19.923Z",
                                  isThumb: false,
                                  createdAt: "2024-05-10T12:57:18.646Z",
                                  alt: "products/1715345838392-HL---FW-200-2_.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "02f00d31-cf21-4f20-9918-c98631eff2fa",
                                  position: 1,
                                  productId:
                                    "aba2073a-8811-4d55-970e-30bd2c00cbe9",
                                },
                              ],
                            },
                            variants: {
                              items: [],
                            },
                          },
                        },
                      },
                      {
                        attributes: {
                          slug: "niacinamide-face-wash-with-brush",
                          promotionTag: {
                            data: null,
                          },
                          productBenefitTags: {
                            data: [
                              {
                                id: "32",
                                attributes: {
                                  tag: "Oily Skin",
                                  bgColor: "#f7e4e4",
                                },
                              },
                              {
                                id: "6",
                                attributes: {
                                  tag: "Acne Prone Skin",
                                  bgColor: "#e1faec",
                                },
                              },
                              {
                                id: "35",
                                attributes: {
                                  tag: "Dehydrated Skin",
                                  bgColor: "#fcf4e3",
                                },
                              },
                            ],
                          },
                          imageBgColor: "#F7F7E7",
                          offerTag: {
                            id: "409",
                            showOfferTag: true,
                            bgColor: "#FFFFFF",
                          },
                          fetchedProduct: {
                            minimumOrderQuantity: 1,
                            pageTitle: "",
                            rating: 0,
                            createdAt: "2024-05-13T05:25:49.700Z",

                            isTaxEnabled: false,
                            price: 399,
                            additionalInfo: [],
                            hasFaq: false,
                            id: "94431348-c454-465d-b567-1ba2e37cf8cc",
                            isFeatured: false,
                            sku: "FW_NIACBR",
                            barcode: "",
                            brand: "",
                            productDescription: "",
                            slug: "niacinamide-face-wash-with-brush",
                            updatedAt: "2024-09-10T18:27:46.019Z",
                            taxable: false,
                            totalRatings: 0,
                            weight: 0,
                            googleCategory: "",
                            position: 999,
                            status: "ENABLED",
                            benefits: [
                              "Balances Skin's Lupid Layer",
                              "Moisturizes Skin",
                              "Improves Skin Renewal Process",
                            ],

                            listingPrice: 399,
                            isAtcEnabled: true,
                            __typename: "Product",
                            inventory: 396,
                            title: "Niacinamide Face Wash with Brush",
                            hasVarient: false,
                            manufacturer:
                              "Kapco International Limited, Plot No 10-11, Sector 3, Parwanoo, Himachal Pradesh 173220, India",
                            maximumOrderQuantity: 1,
                            vendor: "",
                            currency: "INR",
                            productType: "",
                            isInventoryEnabled: true,
                            isPublished: true,
                            costPrice: 0,
                            variantGroups: [],
                            storeId: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                            recommended: false,
                            continueSellingOutOfStock: false,
                            isFeedEnabled: false,
                            isSearchFeedEnabled: false,
                            pdpCustomAttributes: [],
                            totalOrders: 1418,
                            categoryId: "bfe7b619-9477-4c58-a02a-cceedb70a1b8",
                            _lastSyncAt: "2024-07-16T07:35:45.113Z",
                            defaultInventory: 396,
                            defaultPrice: 399,
                            seoSchemaCollection: "niacinamide-range",
                            label: " ",
                            labelColor: "",
                            showOnlyVariantImages: false,
                            lastInventoryUpdatedAt: "2024-09-10T18:26:25.143Z",
                            isFbFeedEnabled: true,
                            cms: '{"productBenefitTags":{"data":[]},"promotionTag":null,"offerTag":{"showOfferTag":true,"bgColor":"#FFFFFF"},"slug":"niacinamide-face-wash-with-brush","imageBgColor":"#FFFFFF"}',
                            images: {
                              items: [
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715577967219-niacinamide-face-wash-brush.jpg",
                                  updatedAt: "2024-09-10T06:55:12.096Z",
                                  isThumb: true,
                                  createdAt: "2024-05-13T05:26:07.813Z",
                                  alt: "products/1715577967219-niacinamide-face-wash-brush.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "f238c343-0ce2-46a5-b974-483f4f60904e",
                                  position: 1,
                                  productId:
                                    "94431348-c454-465d-b567-1ba2e37cf8cc",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715577970963-niacinamide-face-wash-brush2.jpg",
                                  updatedAt: "2024-09-10T06:55:12.102Z",
                                  isThumb: false,
                                  createdAt: "2024-05-13T05:26:11.486Z",
                                  alt: "products/1715577970963-niacinamide-face-wash-brush2.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "fe3b706b-23e3-499a-b4c4-f6b22fb50cca",
                                  position: 1,
                                  productId:
                                    "94431348-c454-465d-b567-1ba2e37cf8cc",
                                },
                              ],
                            },
                            variants: {
                              items: [],
                            },
                          },
                        },
                      },
                      {
                        attributes: {
                          slug: "hyaluronic-acid-foaming-face-wash-with-pump",
                          promotionTag: {
                            data: null,
                          },
                          productBenefitTags: {
                            data: [
                              {
                                id: "35",
                                attributes: {
                                  tag: "Dehydrated Skin",
                                  bgColor: "#fcf4e3",
                                },
                              },
                              {
                                id: "36",
                                attributes: {
                                  tag: "Dry, Tired Skin",
                                  bgColor: "#fcf4e3",
                                },
                              },
                              {
                                id: "67",
                                attributes: {
                                  tag: "Aging Skin",
                                  bgColor: "#f7e9e9",
                                },
                              },
                            ],
                          },
                          imageBgColor: "#F7F7E7",
                          offerTag: {
                            id: "148",
                            showOfferTag: true,
                            bgColor: "#FFFFFF",
                          },
                          fetchedProduct: {
                            minimumOrderQuantity: 1,
                            pageTitle: "",
                            rating: 5,
                            createdAt: "2024-05-10T12:46:27.092Z",

                            isTaxEnabled: false,
                            price: 349,
                            additionalInfo: [],
                            hasFaq: false,
                            id: "ecb408a4-fe3a-468a-996b-57574e8cbcea",
                            isFeatured: false,
                            sku: "FW_HYAL",
                            barcode: "",
                            brand: "",
                            productDescription: "",
                            slug: "hyaluronic-acid-foaming-face-wash-with-pump",
                            updatedAt: "2024-09-10T17:40:39.603Z",
                            taxable: false,
                            totalRatings: 1,
                            weight: 0,
                            googleCategory: "",
                            position: 52,
                            status: "ENABLED",
                            benefits: [
                              "Removes Deep Seated Impurities",
                              "Deeply Cleanses",
                              "Balances Sebum & Moisture Level",
                            ],

                            listingPrice: 349,
                            isAtcEnabled: true,
                            __typename: "Product",
                            inventory: 1421,
                            title:
                              "Hyaluronic Acid Face Wash with Pump - 150 ml",
                            hasVarient: false,
                            manufacturer:
                              "Kapco International Limited, Plot No 10-11, Sector 3, Parwanoo, Himachal Pradesh 173220, India",
                            maximumOrderQuantity: 4,
                            vendor: "",
                            currency: "INR",
                            productType: "",
                            isInventoryEnabled: true,
                            isPublished: true,
                            costPrice: 0,
                            variantGroups: [],
                            storeId: "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                            recommended: false,
                            continueSellingOutOfStock: false,
                            isFeedEnabled: false,
                            isSearchFeedEnabled: false,
                            pdpCustomAttributes: [],
                            totalOrders: 826,
                            categoryId: "bfe7b619-9477-4c58-a02a-cceedb70a1b8",
                            _lastSyncAt: "2024-07-16T07:35:45.101Z",
                            defaultInventory: 1421,
                            defaultPrice: 349,
                            label: " ",
                            seoSchemaCollection: "hyaluronic-acid",
                            labelColor: "",
                            showOnlyVariantImages: false,
                            lastInventoryUpdatedAt: "2024-09-10T17:47:37.623Z",
                            isFbFeedEnabled: true,

                            images: {
                              items: [
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715345214888-HyaluronicFWwithpump.jpg",
                                  updatedAt: "2024-09-10T06:42:51.180Z",
                                  isThumb: true,
                                  createdAt: "2024-05-10T12:46:55.839Z",
                                  alt: "products/1715345214888-HyaluronicFWwithpump.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "c8fce044-1a7c-4689-afce-4d49df9e1932",
                                  position: 1,
                                  productId:
                                    "ecb408a4-fe3a-468a-996b-57574e8cbcea",
                                },
                                {
                                  __typename: "Image",
                                  imageKey:
                                    "products/1715345217587-HyaluronicFWwithpump1.jpg",
                                  updatedAt: "2024-09-10T06:42:51.167Z",
                                  isThumb: false,
                                  createdAt: "2024-05-10T12:46:57.845Z",
                                  alt: "products/1715345217587-HyaluronicFWwithpump1.jpg",
                                  storeId:
                                    "6eb42c89-4955-4fc8-8a87-b4ff92e0908c",
                                  id: "1d0ad2b6-8c0d-4661-933d-2e7593939766",
                                  position: 1,
                                  productId:
                                    "ecb408a4-fe3a-468a-996b-57574e8cbcea",
                                },
                              ],
                            },
                            variants: {
                              items: [],
                            },
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  id: "13141",
                  tab: {
                    data: {
                      attributes: {
                        title: "Serum",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13142",
                  tab: {
                    data: {
                      attributes: {
                        title: "Hair Oil",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13143",
                  tab: {
                    data: {
                      attributes: {
                        title: "Shampoo",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13144",
                  tab: {
                    data: {
                      attributes: {
                        title: "Conditioner",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13145",
                  tab: {
                    data: {
                      attributes: {
                        title: "Body Lotion",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13146",
                  tab: {
                    data: {
                      attributes: {
                        title: "Health Supplements",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
                {
                  id: "13147",
                  tab: {
                    data: {
                      attributes: {
                        title: "Combos",
                      },
                    },
                  },
                  products: {
                    data: [],
                  },
                },
              ]}
            />
          </div>
        }
      >
        {children}
      </PersistGate>
    </ReactProvider>
  );
};
