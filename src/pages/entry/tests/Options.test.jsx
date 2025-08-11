import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  const scoopAltTexts = scoopImages.map((element) => element.alt);
  expect(scoopAltTexts).toEqual(["chocolate scoop", "vanilla scoop"]);
});

test("display image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);
  const toppingsImages = await screen.findAllByRole("img", { name: /toppings$/i });
  expect(toppingsImages).toHaveLength(3);
  const toppingsAltTexts = toppingsImages.map((image) => image.alt);
  expect(toppingsAltTexts).toEqual(["Cherries toppings", "M&Ms toppings", "Hot Fudge toppings"]);
});
