import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatToCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionsCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionsCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  const toppingArray = Object.keys(optionsCounts.toppings);
  const toppingList = toppingArray.map((value) => {
    return <li key={value}>{value}</li>;
  });

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatToCurrency(totals.scoops)}</h2>
      {scoopList}
      <h2>Toppings: {formatToCurrency(totals.toppings)}</h2>
      {toppingList}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
