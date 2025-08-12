import { Col } from "react-bootstrap";

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col>
      <img
        src={`http://localhost:3000/${imagePath}`}
        alt={`${name} toppings`}
      />
    </Col>
  );
};

export default ToppingOption;
