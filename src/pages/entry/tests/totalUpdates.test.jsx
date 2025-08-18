import { test, expect } from "vitest";
import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

describe("grand total", () => {
  test("starts at $0.00", () => {
    render(<OrderEntry />);
    const grandTotalText = screen.getByRole("heading", {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotalText).toHaveTextContent("$0.00");
  });

  test("updates properly when scoops is selected first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    const grandTotalText = screen.getByRole("heading", {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotalText).toHaveTextContent("2.00");
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("3.50");
  });

  test("updates properly when toppings is selected first", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const mAndMCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    await user.click(mAndMCheckbox);
    const grandTotalText = screen.getByRole("heading", {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotalText).toHaveTextContent("1.50");
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");
    expect(grandTotalText).toHaveTextContent("3.50");
  });

  test("updates properly if an item is removed", async () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const mAndMCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
    await user.click(mAndMCheckbox);
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "1");
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "vanilla",
    });
    await user.type(vanillaInput, "1");
    const grandTotalText = screen.getByRole("heading", {
      level: 2,
      name: /grand total: \$/i,
    });
    expect(grandTotalText).toHaveTextContent("7.00");
    await user.click(cherriesCheckbox);
    expect(grandTotalText).toHaveTextContent("5.50");
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "0");
    expect(grandTotalText).toHaveTextContent("3.50");
  });
});
