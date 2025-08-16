import { useContext, createContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be used from within an OrderDetailsProvider",
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const initialState = { scoops: {}, toppings: {} };
  const [optionsCounts, setOptionsCounts] = useState(initialState);

  function updateItemCount(itemName, newItemCount, optionType) {
    setOptionsCounts((prev) => {
      prev[optionType][itemName] = newItemCount;
    });
  }

  function resetOptionCounts() {
    setOptionsCounts(initialState);
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionsCounts[optionType]);
    const total = countsArray.reduce((total, value) => total + value, 0);
    return total;
  }

  const total = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionsCounts, total, updateItemCount, resetOptionCounts };
  return <OrderDetails.Provider value={value} {...props} />;
}
