import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";

export const useEventsDispatch = () => {
  const dispatch = useDispatch();

  const handleOutOfStock = useCallback(
    (products, inventory) => {
      dispatch({
        type: eventsSagaActions.OUT_OF_STOCK,
        payload: { products, inventory },
      });
    },
    [dispatch],
  );

  const viewItem = useCallback(
    (product) => {
      dispatch({ type: eventsSagaActions.VIEW_ITEM, payload: { product } });
    },
    [dispatch],
  );

  const viewReviews = useCallback(
    (payload) => {
      dispatch({ type: eventsSagaActions.VIEW_REVIEW, payload });
    },
    [dispatch],
  );

  const writeReview = useCallback(
    (payload) => {
      dispatch({ type: eventsSagaActions.WRITE_REVIEW, payload });
    },
    [dispatch],
  );

  const placeOrder = useCallback(
    (order, products, coupon, address, paymentType, checkoutSource) => {
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
    },
    [dispatch],
  );

  const ltoProductItem = useCallback(
    (product, type) => {
      dispatch({
        type: eventsSagaActions.LIMITED_TIME_DEAL_PRODUCT_ITEM,
        payload: { product, type },
      });
    },
    [dispatch],
  );

  const customEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.CUSTOM_EVENT,
        payload,
      });
    },
    [dispatch],
  );

  const startCheckout = useCallback(
    (source) => {
      dispatch({
        type: eventsSagaActions.CHECKOUT_STARTED,
        payload: {
          source: source || "BUYWOW",
        },
      });
    },
    [dispatch],
  );

  const search = useCallback(
    (term) => {
      dispatch({ type: eventsSagaActions.SEARCH, payload: { term } });
    },
    [dispatch],
  );

  const viewList = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.VIEW_LIST_ITEM,
        payload,
      });
    },
    [dispatch],
  );

  const addressSelected = useCallback(
    (address, totalPrice, checkoutSource = "BUYWOW") => {
      dispatch({
        type: eventsSagaActions.ADDRESS_SELECTED,
        payload: { address, totalPrice, checkoutSource },
      });
    },
    [dispatch],
  );

  const categoryViewed = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.CATEGORY_VIEWED,
        payload,
      });
    },
    [dispatch],
  );

  const homeViewed = useCallback(() => {
    dispatch({
      type: eventsSagaActions.HOME_VIEWED,
    });
  }, [dispatch]);

  const pageViewed = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.PAGE_VIEWED,
        payload,
      });
    },
    [dispatch],
  );

  const addPaymentInfo = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.ADD_PAYMENT_INFO,
        payload,
      });
    },
    [dispatch],
  );

  const bannerClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.BANNER_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const otpRequested = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.OTP_REQUESTED,
        payload,
      });
    },
    [dispatch],
  );

  // const productSearched = (payload) => {
  //   dispatch({
  //     type: eventsSagaActions.PRODUCT_SEARCHED,
  //     payload,
  //   });
  // };

  const tileClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.TILE_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const logout = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.LOG_OUT,
        payload,
      });
    },
    [dispatch],
  );

  const topNavbarClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.TOP_NAVBAR_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const priceMismatch = useCallback(
    (
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
    },
    [dispatch],
  );

  const shopByClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SHOP_BY_CLICK,
        payload,
      });
    },
    [dispatch],
  );

  const footerClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.FOOTER_CLICK,
        payload,
      });
    },
    [dispatch],
  );

  const announcementBarClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.ANNOUNCEMENT_BAR_CLICK,
        payload,
      });
    },
    [dispatch],
  );

  const sessionStartedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SESSION_STARTED,
        payload,
      });
    },
    [dispatch],
  );

  const sessionDestroyEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SESSION_DESTROY,
        payload,
      });
    },
    [dispatch],
  );

  const blogClicked = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.BLOG_CLICK,
        payload,
      });
    },
    [dispatch],
  );

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

  const handleProceedToCheckout = useCallback(
    (source) => {
      dispatch({
        type: eventsSagaActions.PROCEED_TO_CHECKOUT,
        payload: {
          source: source || "BUYWOW",
        },
      });
    },
    [dispatch],
  );

  const handleProductQtyChanges = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.PRODUCT_QTY_CHANGES,
        payload,
      });
    },
    [dispatch],
  );

  const viewCart = useCallback(() => {
    dispatch({
      type: eventsSagaActions.VIEW_CART,
      payload: {},
    });
  }, [dispatch]);

  const addressAdded = useCallback(
    (address, totalPrice, checkoutSource = "BUYWOW") => {
      dispatch({
        type: eventsSagaActions.ADDRESS_ADDED,
        payload: { address, totalPrice, checkoutSource },
      });
    },
    [dispatch],
  );

  // You can add more dispatch functions here
  // For example:
  // const removeItem = (itemId) => {
  //   dispatch({
  //     type: cartSagaActions.REMOVE_ITEM,
  //     payload: { itemId },
  //   });
  // };

  const spinTheWheelPlayed = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SPIN_THE_WHEEL_PLAYED,
        payload,
      });
    },
    [dispatch],
  );

  const spinTheWheelReward = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SPIN_THE_WHEEL_REWARD,
        payload,
      });
    },
    [dispatch],
  );

  const auth = useCallback(
    (payload) => {
      const { action, moe } = payload;
      dispatch({
        type: eventsSagaActions.AUTH,
        payload: {
          action,
          userId: moe?.userId,
          query: moe?.query,
          phone: moe?.phone,
        },
      });
    },
    [dispatch],
  );

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
    ltoProductItem,
    announcementBarClicked,
    handleProductQtyChanges,
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
    pageViewed,
    viewList,
    priceMismatch,
    footerClicked,
    viewReviews,
    writeReview,
    // customEventVercel,
    spinTheWheelPlayed,
    spinTheWheelReward,
    sessionStartedEvent,
    sessionDestroyEvent,
    customEvent,
  };
};
