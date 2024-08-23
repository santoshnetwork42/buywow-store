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

  return {
    handleOutOfStock,
    handleProceedToCheckout,
    viewCart,
    spinTheWheelPlayed,
    spinTheWheelReward,
  };
};
