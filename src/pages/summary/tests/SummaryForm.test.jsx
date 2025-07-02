import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";
import { expect } from "vitest";

describe("SummaryForm unit tests", () => {
  it("Initial state", () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const buttonElement = screen.getByRole("button", { name: /confirm order/i });
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
  });

  it("Button should be enabled when checkbox is clicked and return to initial state when clicked second time", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const buttonElement = screen.getByRole("button", { name: /confirm order/i });
    await user.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toBeEnabled();
    await user.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
  });

  it("popover responds hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
  });
});
