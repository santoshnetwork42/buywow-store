// data/myCartData.js
export const myCartData = {
  itemCount: 1,
  amountAwayFromFreeShipping: 676,
  cartItems: [
    {
      id: 1,
      name: "Onion black seed hair oil",
      size: "200ml",
      image: "img_image_2071.png",
      price: 323,
      originalPrice: 599,
      discount: "35%",
      quantity: 1,
    },
    {
      id: 2,
      name: "Another product",
      size: "100ml",
      image: "img_image_2071.png",
      price: 200,
      originalPrice: 300,
      discount: "33%",
      quantity: 1,
    },
  ],
  offers: [
    {
      image: "img_image_2021.png",
      heading: "coupons & offers",
      subtext: "Apply now and save extra!",
      textColor: "text-white-a700_01",
      bgColor: "bg-blue_gray-300_01",
    },
    {
      image: "img_offer_2.png",
      heading: "coupons & offers",
      subtext: "Apply now and save extra!",
      textColor: "text-black-900",
      bgColor: "bg-deep_orange-50_03",
    },
  ],
  cashback: 14.86,
  paymentSummary: {
    subtotal: 351,
    shipping: 149,
    savings: 276,
    total: 500,
  },
};
