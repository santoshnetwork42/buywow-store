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
    height: 600,
    aspectRatio: "aspect-[576/600]",
    mobileImageUrl: "img_portfolio_banner_mobile.png",
  },
  breakpoint: 576,
};

export const customerReviewSectionData = {
  title: "Real Reviews From Real Customers",
  reviews: [
    {
      productImage: {
        desktop: {
          src: "img_image_2062.png",
          width: 502,
          height: 250,
          aspectRatio: "aspect-[502/250]",
          alt: "Product Image 1",
        },
        mobile: {
          src: "img_image_2062_mobile.png",
          width: 320,
          height: 192,
          aspectRatio: "aspect-[320/192]",
          alt: "Product Image 1",
        },
      },
      userInfo: {
        name: "Trisha",
        age: 25,
      },
      reviewText:
        "If you're looking for a product that provides deep hydration, look no further. This aloe vera gel has transformed my skin. It keeps my face moisturized and refreshed, even during the driest days.",
      skinConcerns: ["Dry skin", "Pigmentation"],
      relatedProduct: {
        image: {
          src: "img_rectangle_35.png",
          width: 44,
          height: 49,
          alt: "Aloe Vera Gel",
        },
        name: "Apple Cider Vinegar Face Wash Apple Cider Vinegar Face Wash",
        currentPrice: "₹339",
        originalPrice: "₹399",
        addToCartText: "Add",
      },
    },
    {
      productImage: {
        desktop: {
          src: "img_image_2063.png",
          width: 502,
          height: 250,
          aspectRatio: "aspect-[502/250]",
          alt: "Product Image 1",
        },
        mobile: {
          src: "img_image_2062_mobile.png",
          width: 320,
          height: 192,
          aspectRatio: "aspect-[320/192]",
          alt: "Product Image 1",
        },
      },
      userInfo: {
        name: "Trisha",
        age: 25,
      },
      reviewText:
        "If you're looking for a product that provides deep hydration, look no further. This aloe vera gel has transformed my skin. It keeps my face moisturized and refreshed, even during the driest days.",
      skinConcerns: ["Dry skin", "Pigmentation"],
      relatedProduct: {
        image: {
          src: "img_rectangle_35.png",
          width: 44,
          height: 49,
          alt: "Aloe Vera Gel",
        },
        name: "Pure Aloe Vera Gel",
        currentPrice: "₹339",
        originalPrice: "₹399",
        addToCartText: "Add",
      },
    },
    {
      productImage: {
        desktop: {
          src: "img_image_2062.png",
          width: 502,
          height: 250,
          aspectRatio: "aspect-[502/250]",
          alt: "Product Image 1",
        },
        mobile: {
          src: "img_image_2062_mobile.png",
          width: 320,
          height: 192,
          aspectRatio: "aspect-[320/192]",
          alt: "Product Image 1",
        },
      },
      userInfo: {
        name: "Trisha",
        age: 25,
      },
      reviewText:
        "If you're looking for a product that provides deep hydration, look no further. This aloe vera gel has transformed my skin. It keeps my face moisturized and refreshed, even during the driest days.",
      skinConcerns: ["Dry skin", "Pigmentation"],
      relatedProduct: {
        image: {
          src: "img_rectangle_35.png",
          width: 44,
          height: 49,
          alt: "Aloe Vera Gel",
        },
        name: "Pure Aloe Vera Gel",
        currentPrice: "₹339",
        originalPrice: "₹399",
        addToCartText: "Add",
      },
    },
  ],
};

export const blogSectionData = {
  title: "Explore Blogs",
  buttonText: "Read More",
  articles: [
    {
      id: 1,
      image: "img_image_2058.png",
      title: "Leave-In Conditioning: Know It All Know It All",
      author: "Garima Singh",
      publishDate: "February 27, 2024",
      link: "/blog/leave-in-conditioning",
    },
    {
      id: 1,
      image: "img_image_2058.png",
      title: "Leave-In Conditioning: Know It All",
      author: "Garima Singh",
      publishDate: "February 27, 2024",
      link: "/blog/leave-in-conditioning",
    },
    {
      id: 1,
      image: "img_image_2058.png",
      title: "Leave-In Conditioning: Know It All",
      author: "Garima Singh",
      publishDate: "February 27, 2024",
      link: "/blog/leave-in-conditioning",
    },
    {
      id: 1,
      image: "img_image_2058.png",
      title: "Leave-In Conditioning: Know It All",
      author: "Garima Singh",
      publishDate: "February 27, 2024",
      link: "/blog/leave-in-conditioning",
    },
    // Add more articles as needed
  ],
};

export const instagramFeedData = {
  title: "Find us on instagram",
  buttonText: "@wowskinscienceindia",
  images: [
    {
      id: 1,
      src: "img_rectangle_26044.png",
      width: 334,
      height: 320,
      alt: "profile image",
    },
    {
      id: 2,
      src: "img_rectangle_26044_320x318.png",
      width: 318,
      height: 320,
      alt: "forward image",
    },
    {
      id: 3,
      src: "img_rectangle_26044_1.png",
      width: 318,
      height: 320,
      alt: "image",
    },
    {
      id: 4,
      src: "img_rectangle_26044_319x318.png",
      width: 318,
      height: 319,
      alt: "rectangle",
    },
  ],
  playButtonIcon: "img_forward.svg",
};

export const deliveryInfoData = {
  items: [
    {
      id: 1,
      icon: "img_delivery_1.png",
      text: (
        <>
          Delivery within <br /> 3-5 days
        </>
      ),
    },
    {
      id: 2,
      icon: "img_delivery_2.png",
      text: (
        <>
          Free Shipping on <br />
          orders above ₹999
        </>
      ),
    },
    {
      id: 3,
      icon: "img_delivery_3.png",
      text: (
        <>
          Easy return and <br />
          refund policy
        </>
      ),
    },
  ],
};

export const productFeaturesData = {
  features: [
    {
      id: 1,
      icon: "img_wow_feature_1.png",
      text: (
        <>
          Natural <br /> ingredients
        </>
      ),
    },
    {
      id: 2,
      icon: "img_wow_feature_2.png",
      text: (
        <>
          no harsh <br /> chemicals
        </>
      ),
    },
    {
      id: 3,
      icon: "img_wow_feature_3.png",
      text: (
        <>
          dermatologically <br /> tested
        </>
      ),
    },
    {
      id: 4,
      icon: "img_wow_feature_4.png",
      text: (
        <>
          cruelty <br /> free
        </>
      ),
    },
  ],
};
