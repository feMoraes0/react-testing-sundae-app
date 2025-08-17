import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import { test, expect } from "vitest";
import OrderEntry from "../OrderEntry";

test("handles error responses to toppings and scoops", async () => {
  server.resetHandlers(
    http.get("http://localhost:3000/scoops", () => {
      return new HttpResponse.json(null, { status: 500 });
    }),
    http.get("http://localhost:3000/toppings", () => {
      return new HttpResponse.json(null, { status: 500 });
    }),
  );

  render(<OrderEntry />);
  const alerts = await screen.findAllByRole("alert");
  expect(alerts).toHaveLength(2);
});
