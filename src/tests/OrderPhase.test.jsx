import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  const orderSundae = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderSundae);

  // summary page
  const summaryHeader = screen.getByRole("heading", {
    level: 1,
    name: /order summary/i,
  });
  expect(summaryHeader).toBeInTheDocument();
  const summarySubHeaderScoops = screen.getByRole("heading", {
    level: 2,
    name: /scoops/i,
  });
  expect(summarySubHeaderScoops).toHaveTextContent("Scoops: $2.00");
  const summarySubHeaderToppings = screen.getByRole("heading", {
    level: 2,
    name: /toppings/i,
  });
  expect(summarySubHeaderToppings).toHaveTextContent("Toppings: $1.50");

  expect(screen.getByText(/1 Vanilla/i)).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsAndConditionsCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();
  const loadingAfter = screen.queryByText(/loading/i);
  expect(loadingAfter).not.toBeInTheDocument();

  const orderNumber = screen.getByText(/order number/i);
  expect(orderNumber).toHaveTextContent("1234567890");

  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  const scoopsTotal = await screen.findByText(/scoops total: \$/i);
  expect(scoopsTotal).toHaveTextContent("0.00");
  const toppingsTotal = await screen.findByText(/toppings total: \$/i);
  expect(toppingsTotal).toHaveTextContent("0.00");
});
