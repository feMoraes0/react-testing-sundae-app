import { useOrderDetails } from "../../contexts/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = () => {
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
      <h2>Scoops</h2>
      {scoopList}
      <h2>Toppings</h2>
      {toppingList}
      <SummaryForm />
    </div>
  );
};

export default OrderSummary;
