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

  const spinTheWheelPlayed = (payload) => {
    dispatch({
      type: eventsSagaActions.SPIN_THE_WHEEL_PLAYED,
      payload,
    });
  };

  const spinTheWheelReward = (payload) => {
    dispatch({
      type: eventsSagaActions.SPIN_THE_WHEEL_REWARD,
      payload,
    });
  };

  const auth = (payload) => {
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
  };

  const addPaymentInfo = (checkoutSource = "BUYWOW") => {
    dispatch({
      type: eventsSagaActions.ADD_PAYMENT_INFO,
      payload: { checkoutSource },
    });
  };

  return {
    handleOutOfStock,
    handleProceedToCheckout,
    viewCart,
    spinTheWheelPlayed,
    spinTheWheelReward,
    auth,
    addPaymentInfo,
  };
};
