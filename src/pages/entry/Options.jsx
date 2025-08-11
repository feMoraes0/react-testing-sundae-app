import { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOptions from './ScoopOptions';
import { Row } from 'react-bootstrap';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/${optionType}`)
    .then((response) => {
      setItems(response.data);
    }).catch(() => {
      // TODO: handle error later
    });
  }, [optionType]);

  // TODO: replace null with ToppingOption when available.
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : null;
  const optionItems = items.map((item) => {
    return <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}  />
  })

  return (
    <Row>
      {optionItems}
    </Row>
  );
};

export default Options;
