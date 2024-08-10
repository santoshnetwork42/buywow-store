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

  // You can add more dispatch functions here
  // For example:
  // const removeItem = (itemId) => {
  //   dispatch({
  //     type: cartSagaActions.REMOVE_ITEM,
  //     payload: { itemId },
  //   });
  // };

  return {
    handleOutOfStock,
    handleProceedToCheckout,
  };
};
