import { useDispatch } from "react-redux";
import { eventsSagaActions } from "../sagaActions/events.actions";

export const useEventsDispatch = () => {
  const dispatch = useDispatch();

  const handleOutOfStock = (products, inventory) => {
    dispatch({
      type: eventsSagaActions.OUT_OF_STOCK,
      payload: { products, inventory },
    });
  };

  const viewItem = (product) => {
    dispatch({ type: eventsSagaActions.VIEW_ITEM, payload: { product } });
  };

  const placeOrder = (
    order,
    products,
    coupon,
    address,
    paymentType,
    checkoutSource,
  ) => {
    dispatch({
      type: eventsSagaActions.PLACE_ORDER,
      payload: {
        order,
        products,
        coupon,
        address,
        paymentType,
        checkoutSource,
      },
    });
  };

  const startCheckout = (source) => {
    dispatch({
      type: eventsSagaActions.CHECKOUT_STARTED,
      payload: {
        source: source || "BUYWOW",
      },
    });
  };

  const auth = (action, moe) => {
    dispatch({
      type: eventsSagaActions.AUTH,
      payload: {
        action,
        userId: moe?.userId,
        query: moe?.query,
        phone: moe?.phone,
      },
    });
  };

  const search = (term) => {
    dispatch({ type: eventsSagaActions.SEARCH, payload: { term } });
  };

  const viewList = (id, name, products) => {
    dispatch({
      type: eventsSagaActions.VIEW_LIST_ITEM,
      payload: { id, name, products },
    });
  };

  const addressSelected = (address, totalPrice, checkoutSource = "BUYWOW") => {
    dispatch({
      type: eventsSagaActions.ADDRESS_SELECTED,
      payload: { address, totalPrice, checkoutSource },
    });
  };

  const categoryViewed = (payload) => {
    dispatch({
      type: eventsSagaActions.CATEGORY_VIEWED,
      payload,
    });
  };

  const homeViewed = () => {
    dispatch({
      type: eventsSagaActions.HOME_VIEWED,
    });
  };

  const addPaymentInfo = (checkoutSource = "BUYWOW") => {
    dispatch({
      type: eventsSagaActions.ADD_PAYMENT_INFO,
      payload: { checkoutSource },
    });
  };

  const bannerClicked = (payload) => {
    dispatch({
      type: eventsSagaActions.BANNER_CLICKED,
      payload,
    });
  };

  const otpRequested = (payload) => {
    dispatch({
      type: eventsSagaActions.OTP_REQUESTED,
      payload,
    });
  };

  // const productSearched = (payload) => {
  //   dispatch({
  //     type: eventsSagaActions.PRODUCT_SEARCHED,
  //     payload,
  //   });
  // };

  const tileClicked = (payload) => {
    dispatch({
      type: eventsSagaActions.TILE_CLICKED,
      payload,
    });
  };

  const logout = (payload) => {
    dispatch({
      type: eventsSagaActions.LOG_OUT,
      payload,
    });
  };

  const topNavbarClicked = (payload) => {
    dispatch({
      type: eventsSagaActions.TOP_NAVBAR_CLICKED,
      payload,
    });
  };

  const priceMismatch = (
    products,
    coupon,
    paymentType,
    mismatchedPrices,
    mismatchedProductDetails,
  ) => {
    dispatch({
      type: eventsSagaActions.PRICE_MISMATCH,
      payload: {
        products,
        coupon,
        paymentType,
        mismatchedPrices,
        mismatchedProductDetails,
      },
    });
  };

  const shopByClicked = (payload) => {
    dispatch({
      type: eventsSagaActions.SHOP_BY_CLICK,
      payload,
    });
  };

  const blogClicked = (payload) => {
    dispatch({
      type: eventsSagaActions.BLOG_CLICK,
      payload,
    });
  };

  // const spinTheWheelPlayed = (payload) => {
  //   dispatch({
  //     type: eventsSagaActions.SPIN_THE_WHEEL_PLAYED,
  //     payload,
  //   });
  // };

  // const spinTheWheelReward = (payload) => {
  //   dispatch({
  //     type: eventsSagaActions.SPIN_THE_WHEEL_REWARD,
  //     payload,
  //   });
  // };

  // const customEventVercel = (title, data) => {
  //   dispatch({
  //     type: eventsSagaActions.CUSTOM_EVENT_VERCEL,
  //     payload: { title, data },
  //   });
  // };

  const handleProceedToCheckout = (source) => {
    dispatch({
      type: eventsSagaActions.PROCEED_TO_CHECKOUT,
      payload: {
        source: source || "BUYWOW",
      },
    });
  };

  const viewCart = () => {
    dispatch({
      type: eventsSagaActions.VIEW_CART,
      payload: {},
    });
  };

  const addressAdded = (address, totalPrice, checkoutSource = "BUYWOW") => {
    dispatch({
      type: eventsSagaActions.ADDRESS_ADDED,
      payload: { address, totalPrice, checkoutSource },
    });
  };

  // You can add more dispatch functions here
  // For example:
  // const removeItem = (itemId) => {
  //   dispatch({
  //     type: cartSagaActions.REMOVE_ITEM,
  //     payload: { itemId },
  //   });
  // };

  return {
    viewItem,
    handleOutOfStock,
    handleProceedToCheckout,
    viewCart,
    placeOrder,
    startCheckout,
    auth,
    search,
    addressAdded,
    addressSelected,
    categoryViewed,
    logout,
    // spinTheWheelPlayed,
    // spinTheWheelReward,
    addPaymentInfo,
    bannerClicked,
    otpRequested,
    // productSearched,
    tileClicked,
    topNavbarClicked,
    shopByClicked,
    blogClicked,
    homeViewed,
    viewList,
    priceMismatch,
    // customEventVercel,
  };
};
