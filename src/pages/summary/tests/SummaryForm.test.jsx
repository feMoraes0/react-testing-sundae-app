import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

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
});
