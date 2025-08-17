import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (component, options) =>
  render(component, { wrapper: OrderDetailsProvider, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
