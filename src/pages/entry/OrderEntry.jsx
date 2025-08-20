import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatToCurrency } from "../../utilities";
import Options from "./Options";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();

  function handleClick() {
    setOrderPhase("review");
  }

  return (
    <>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatToCurrency(totals.scoops + totals.toppings)}</h2>
      <Button onClick={handleClick}>Order sundae</Button>
    </>
  );
};

export default OrderEntry;
