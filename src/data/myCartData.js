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
      subOffers: [
        {
          heading: "Free Shipping",
          description: "Free shipping on orders above ₹499",
        },
        {
          heading: "10% Cashback",
          description: "Get 10% cashback on prepaid orders",
        },
        {
          heading: "Bundle Discount",
          description: "Buy 2 get 1 free on selected items",
        },
      ],
      coupons: [
        {
          code: "PREPAID30",
          description:
            "30% off from total upto ₹600 on orders above ₹398. Only Prepaid Orders.",
          isDisabled: false,
        },
        {
          code: "WOW20",
          description: "20% off from total upto ₹300 on orders above ₹398.",
          isDisabled: false,
        },
        {
          code: "SHILAJIT999",
          description:
            "Get Shilajit Fitness Freak Combo only for Rs.999. Only Prepaid Orders.",
          isDisabled: true,
          additionalInfo: "Add 1 more items to the cart to avail this offer*",
        },
        {
          code: "FLASH60",
          description: "Buy any 3 Products @ 60% OFF from this Collection.",
          isDisabled: true,
          additionalInfo: "Add 2 more items to the cart to avail this offer*",
        },
        {
          code: "FLASH50",
          description: "Buy any 2 Products @50% OFF from this Collection.",
          isDisabled: true,
          additionalInfo: "Add 1 more items to the cart to avail this offer*",
        },
      ],
    },
    {
      image: "img_offer_2.png",
      heading: "become a member",
      subtext: "Get FREE shipping on every orders",
      textColor: "text-black-900",
      bgColor: "bg-deep_orange-50_03",
      subOffers: [
        {
          heading: "10% Cashback",
          description: "Get 10% cashback on prepaid orders",
        },
        {
          heading: "Bundle Discount",
          description: "Buy 2 get 1 free on selected items",
        },
      ],
      coupons: [],
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
