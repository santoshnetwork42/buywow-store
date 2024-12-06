import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { eventsSagaActions } from "@/store/sagas/sagaActions/events.actions";

export const useEventsDispatch = () => {
  const dispatch = useDispatch();

  const handleOutOfStockEvent = useCallback(
    (products, inventory) => {
      dispatch({
        type: eventsSagaActions.OUT_OF_STOCK,
        payload: { products, inventory },
      });
    },
    [dispatch],
  );

  const viewItemEvent = useCallback(
    (product) => {
      dispatch({ type: eventsSagaActions.VIEW_ITEM, payload: { product } });
    },
    [dispatch],
  );

  const productViewedKwikpassEvent = useCallback(
    (product) => {
      dispatch({
        type: eventsSagaActions.PRODUCT_VIEWED_KWIKPASS_EVENT,
        payload: { product },
      });
    },
    [dispatch],
  );

  const collectionViewedKwikpassEvent = useCallback(
    (collection) => {
      dispatch({
        type: eventsSagaActions.COLLECTION_VIEWED_KWIKPASS_EVENT,
        payload: { collection },
      });
    },
    [dispatch],
  );

  const viewReviewsEvent = useCallback(
    (payload) => {
      dispatch({ type: eventsSagaActions.VIEW_REVIEW, payload });
    },
    [dispatch],
  );

  const writeReviewEvent = useCallback(
    (payload) => {
      dispatch({ type: eventsSagaActions.WRITE_REVIEW, payload });
    },
    [dispatch],
  );

  const placeOrderEvent = useCallback(
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

  const ltoProductItemEvent = useCallback(
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

  const startCheckoutEvent = useCallback(
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

  const searchEvent = useCallback(
    (term) => {
      dispatch({ type: eventsSagaActions.SEARCH, payload: { term } });
    },
    [dispatch],
  );

  const viewListEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.VIEW_LIST_ITEM,
        payload,
      });
    },
    [dispatch],
  );

  const addressSelectedEvent = useCallback(
    (address, totalPrice, checkoutSource = "BUYWOW") => {
      dispatch({
        type: eventsSagaActions.ADDRESS_SELECTED,
        payload: { address, totalPrice, checkoutSource },
      });
    },
    [dispatch],
  );

  const categoryViewedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.CATEGORY_VIEWED,
        payload,
      });
    },
    [dispatch],
  );

  const homeViewedEvent = useCallback(() => {
    dispatch({
      type: eventsSagaActions.HOME_VIEWED,
    });
  }, [dispatch]);

  const pageViewedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.PAGE_VIEWED,
        payload,
      });
    },
    [dispatch],
  );

  const addPaymentInfoEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.ADD_PAYMENT_INFO,
        payload,
      });
    },
    [dispatch],
  );

  const bannerClickedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.BANNER_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const otpRequestedEvent = useCallback(
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

  const tileClickedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.TILE_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const logoutEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.LOG_OUT,
        payload,
      });
    },
    [dispatch],
  );

  const topNavbarClickedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.TOP_NAVBAR_CLICKED,
        payload,
      });
    },
    [dispatch],
  );

  const priceMismatchEvent = useCallback(
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

  const shopByClickedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SHOP_BY_CLICK,
        payload,
      });
    },
    [dispatch],
  );

  const footerClickedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.FOOTER_CLICK,
        payload,
      });
    },
    [dispatch],
  );

  const announcementBarClickedEvent = useCallback(
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

  const blogClickedEvent = useCallback(
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

  const handleProceedToCheckoutEvent = useCallback(
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

  const handleProductQtyChangesEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.PRODUCT_QTY_CHANGES,
        payload,
      });
    },
    [dispatch],
  );

  const viewCartEvent = useCallback(() => {
    dispatch({
      type: eventsSagaActions.VIEW_CART,
      payload: {},
    });
  }, [dispatch]);

  const addressAddedEvent = useCallback(
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

  const spinTheWheelPlayedEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SPIN_THE_WHEEL_PLAYED,
        payload,
      });
    },
    [dispatch],
  );

  const spinTheWheelRewardEvent = useCallback(
    (payload) => {
      dispatch({
        type: eventsSagaActions.SPIN_THE_WHEEL_REWARD,
        payload,
      });
    },
    [dispatch],
  );

  const authEvent = useCallback(
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
    viewItemEvent,
    handleOutOfStockEvent,
    handleProceedToCheckoutEvent,
    viewCartEvent,
    placeOrderEvent,
    startCheckoutEvent,
    authEvent,
    searchEvent,
    addressAddedEvent,
    addressSelectedEvent,
    categoryViewedEvent,
    logoutEvent,
    ltoProductItemEvent,
    announcementBarClickedEvent,
    handleProductQtyChangesEvent,
    // spinTheWheelPlayed,
    // spinTheWheelReward,
    addPaymentInfoEvent,
    bannerClickedEvent,
    otpRequestedEvent,
    // productSearched,
    tileClickedEvent,
    topNavbarClickedEvent,
    shopByClickedEvent,
    blogClickedEvent,
    homeViewedEvent,
    pageViewedEvent,
    viewListEvent,
    priceMismatchEvent,
    footerClickedEvent,
    viewReviewsEvent,
    writeReviewEvent,
    // customEventVercel,
    spinTheWheelPlayedEvent,
    spinTheWheelRewardEvent,
    sessionStartedEvent,
    sessionDestroyEvent,
    customEvent,
    productViewedKwikpassEvent,
    collectionViewedKwikpassEvent,
  };
};
