import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatToCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <>
      <h2>{title}</h2>
      <p>{formatToCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatToCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
