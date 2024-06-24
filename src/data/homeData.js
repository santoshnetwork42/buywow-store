import { productData } from "./productData";

export const productCategoryItems = [
  { image: "face-wash-image.png", label: "Face Wash" },
  { image: "shampoo-image.png", label: "Sunscreen" },
  { image: "com-image.png", label: "Combo Box" },
  { image: "serum-image.png", label: "Serum" },
  { image: "shampoo-image.png", label: "Shampoo" },
  { image: "com-image.png", label: "Combo Box" },
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
  categories: ["all", "facewash", "shampoo", "hair oil", "serum", "skin care", "fragrances"],
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
