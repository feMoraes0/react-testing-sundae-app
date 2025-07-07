import { screen, render } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop option from server", () => {
  render(<Options optionType="scoop" />);

  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const scoopAltTexts = scoopImages.map((element) => element.alt);
  expect(scoopAltTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
