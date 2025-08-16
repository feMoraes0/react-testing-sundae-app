import { Col, Row, Form } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ScoopOptions = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();

  function handleChange(event) {
    updateItemCount(name, parseInt(event.target.value), "scoops");
    return;
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3000/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOptions;
