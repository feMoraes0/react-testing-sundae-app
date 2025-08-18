import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatToCurrency } from "../../utilities";
import Options from "./Options";

const OrderEntry = () => {
  const { totals } = useOrderDetails();
  return (
    <>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatToCurrency(totals.scoops + totals.toppings)}</h2>
    </>
  );
};

export default OrderEntry;
