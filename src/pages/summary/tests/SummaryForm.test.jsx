import { render, fireEvent, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm unit tests", () => {
  it("Initial state", () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const buttonElement = screen.getByRole("button", { name: /confirm order/i });
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
  });

  it("Button should be enabled when checkbox is clicked and return to initial state when clicked second time", () => {
    render(<SummaryForm />);
    const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
    const buttonElement = screen.getByRole("button", { name: /confirm order/i });
    fireEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
    expect(buttonElement).toBeEnabled();
    fireEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    expect(buttonElement).toBeDisabled();
  });
});
