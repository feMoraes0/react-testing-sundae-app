import { Col, Form } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  function handleCheckbox(event) {
    updateItemCount(name, event.target.checked ? 1 : 0, "toppings");
    return;
  }

  return (
    <Col>
      <img
        src={`http://localhost:3000/${imagePath}`}
        alt={`${name} toppings`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" label={name} onChange={handleCheckbox} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
