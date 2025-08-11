import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/scoops", () => {
    return HttpResponse.json([
      { name: "chocolate", imagePath: "/images/chocolate.png" },
      { name: "vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
  http.get("http://localhost:3000/toppings", () => {
    return HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-m.png" },
      { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
    ]);
  })
];
