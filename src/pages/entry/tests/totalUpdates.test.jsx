import { test, expect } from "vitest";
import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoops total when scoops changes", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");
  // update chocolate scoops to 2 and check subtotal
  const chocoloateInput = await screen.findByRole("spinbutton", {
    name: "chocolate",
  });
  await user.clear(chocoloateInput);
  await user.type(chocoloateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update toppings total when toppings input change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);
  // initial state
  const subtotal = screen.getByText("toppings total", { exact: false });
  expect(subtotal).toHaveTextContent("0.00");
  // select one of toppings and check it
  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesInput);
  expect(subtotal).toHaveTextContent("1.50");
  // select another toppings to validate the sum
  const mmInput = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mmInput);
  expect(subtotal).toHaveTextContent("3.00");
  // uncheck one about to validate the behaviour
  await user.click(cherriesInput);
  expect(subtotal).toHaveTextContent("1.50");
});
