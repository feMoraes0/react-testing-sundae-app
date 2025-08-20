import { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import { Button } from "react-bootstrap";

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOptionCounts } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000/order")
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(() => {
        // TODO: handle error
      });
  }, []);

  function handleClick() {
    resetOptionCounts();
    setOrderPhase("inProgress");
  }

  if (!orderNumber) {
    return <div>Loading</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank you!</h1>
      <p>Your order number is {orderNumber}</p>
      <p style={{ fontSize: "25%" }}>
        as per our terms and conditions, nothing will happen now
      </p>
      <Button onClick={handleClick}>Create a new order</Button>
    </div>
  );
};

export default OrderConfirmation;
