import { productData } from "./productData";

export const productCategoryItems = [
  { image: "face-wash-image.png", label: "Face Wash" },
  { image: "shampoo-image.png", label: "Sunscreen" },
  { image: "com-image.png", label: "Combo Box" },
  { image: "serum-image.png", label: "Serum" },
  { image: "shampoo-image.png", label: "Shampoo" },
];

export const introCarousalData = [
  {
    desktopImage: "img_hero_section.png",
    mobileImage: "img_hero_section_mob.png",
    linkUrl: "/products1",
  },
  {
    desktopImage: "img_hero_section.png",
    mobileImage: "img_hero_section_mob.png",
    linkUrl: "/products2",
  },
  {
    desktopImage: "img_hero_section.png",
    mobileImage: "img_hero_section_mob.png",
    linkUrl: "/products3",
  },
];

export const bestSellerData = {
  title: "Our best sellers",
  categories: [
    "all",
    "facewash",
    "shampoo",
    "hair oil",
    "serum",
    "skin care",
    "fragrances",
  ],
  products: {
    all: productData,
    // Add more products for 'all' category
    facewash: productData,
    shampoo: productData,
    "hair oil": productData,
    serum: productData,
    "skin care": productData,
    fragrances: productData,
  },
};

export const shopIngredientsData = {
  title: "shop by ingredients",
  ingredients: [
    { image: "img_shop_ingredient_onion.png", caption: "Onion" },
    { image: "img_shop_ingredient_lemon.png", caption: "Tomato" },
    { image: "img_shop_ingredient_elovera.png", caption: "Potato" },
    { image: "img_shop_ingredient_onion.png", caption: "Carrot" },
    { image: "img_shop_ingredient_onion.png", caption: "Cucumber" },
    { image: "img_shop_ingredient_onion.png", caption: "Garlic" },
    { image: "img_shop_ingredient_onion.png", caption: "Pepper" },
    { image: "img_shop_ingredient_onion.png", caption: "Broccoli" },
    { image: "img_shop_ingredient_onion.png", caption: "Broccoli" },
    { image: "img_shop_ingredient_onion.png", caption: "Broccoli" },
  ],
};

export const offersData = [
  {
    desktopImage: "img_offer_banner.png",
    mobileImage: "img_offer_banner_mob.png",
    label: "Offer 1",
    linkUrl: "/offer1",
  },
  {
    desktopImage: "img_offer_banner.png",
    mobileImage: "img_offer_banner_mob.png",
    label: "Offer 2",
    linkUrl: "/offer2",
  },
  {
    desktopImage: "img_offer_banner.png",
    mobileImage: "img_offer_banner_mob.png",
    label: "Offer 3",
    linkUrl: "/offer3",
  },
  // ... more offers
];

export const concernSectionData = {
  title: "Shop by Concern",
  items: [
    {
      image: "img_image_2004_1.png",
      title: "Hair Fall",
      link: "/concern/hair-fall",
    },
    {
      image: "img_image_2004_2.png",
      title: "Dry Skin",
      link: "/concern/dry-skin",
    },
    { image: "img_image_2004_3.png", title: "Acne", link: "/concern/acne" },
    { image: "img_image_2004_1.png", title: "Aging", link: "/concern/aging" },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation",
      link: "/concern/pigmentation",
    },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation1",
      link: "/concern/pigmentation",
    },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation2",
      link: "/concern/pigmentation",
    },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation3",
      link: "/concern/pigmentation",
    },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation4",
      link: "/concern/pigmentation",
    },
    {
      image: "img_image_2004_1.png",
      title: "Pigmentation5",
      link: "/concern/pigmentation",
    },
  ],
};

export const newLaunchData = {
  title: "Shop New Launches",
  productsData: productData,
  viewAllLinkUrl: "/new-launches",
};

export const testimonialBannerData = {
  linkUrl: "/shop/summer-collection",
  altText: "Shop banner",
  desktop: {
    width: 1440,
    height: 310,
    aspectRatio: "aspect-[1440/310]",
    desktopImageUrl: "img_testimonial_banner.png",
  },
  mobile: {
    width: 576,
    height: 288,
    aspectRatio: "aspect-[375/187]",
    mobileImageUrl: "img_testimonial_banner_mobile.png",
  },
  breakpoint: 576,
};

export const shopCategoriesData = {
  title: "Shop by Categories",
  items: [
    {
      image: "img_image_2054.png",
      title: "Hair Care",
      link: "/concern/hair-fall",
    },
    {
      image: "img_image_2055.png",
      title: "skin care",
      link: "/concern/dry-skin",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
    {
      image: "img_image_2056.png",
      title: "bath & body",
      link: "/concern/acne",
    },
  ],
};

export const tabProductData = {
  title: "Pick the right kit for you",
  categories: [
    "dandruff",
    "skin brightening",
    "acne",
    "hairfall",
    "pigmentation",
  ],
  products: {
    dandruff: productData,
    "skin brightening": productData,
    acne: productData,
    hairfall: productData,
    pigmentation: productData,
  },
};

export const portfolioBannerData = {
  linkUrl: "/shop/summer-collection",
  altText: "Shop banner",
  desktop: {
    width: 1440,
    height: 284,
    aspectRatio: "aspect-[1440/284]",
    desktopImageUrl: "img_portfolio_banner.png",
  },
  mobile: {
    width: 576,
    height: 598,
    aspectRatio: "aspect-[376/392]",
    mobileImageUrl: "img_portfolio_banner_mobile.png",
  },
  breakpoint: 576,
};
