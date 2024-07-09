// data/menuData.js
export const mainMenuItems = [
  {
    text: "Face",
    link: "/collections/face",
    submenu: [
      { text: "Cleansers", link: "/collections/cleansers" },
      { text: "Moisturizers", link: "/collections/moisturizers" },
      { text: "Serums", link: "/collections/serums" },
    ],
  },
  {
    text: "Hair",
    link: "/collections/hair",
    submenu: [
      { text: "Shampoo", link: "/collections/shampoo" },
      { text: "Conditioner", link: "/collections/conditioner" },
      { text: "Hair Oils", link: "/collections/hair-oils" },
    ],
  },
  { text: "Bath & Body", link: "/collections/bath-and-body" },
  { text: "Kids", link: "/collections/kids" },
  {
    text: "Nutrition",
    link: "/collections/nutrition",
    submenu: [
      { text: "Vitamins", link: "/collections/vitamins" },
      { text: "Supplements", link: "/collections/supplements" },
    ],
  },
  { text: "Combos", link: "/collections/combos" },
  { text: "Gift Sets", link: "/collections/gift-sets" },
  { text: "Blogs", link: "/blogs" },
  { text: "About Us", link: "/about-us" },
];
