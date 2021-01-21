const main = require("../main.ts");

describe("Distance function", () => {
  test("distance should be zero between identical points", () => {
    expect(main.distance([10,-20], [10,-20])).toBe(0);
  });

  test("x-axis distance should be accurate", () => {
    expect(main.distance([100,0], [-50,0])).toBe(150);
  })

  test("y-axis distance should be accurate", () => {
    expect(main.distance([0, 50], [0, -100])).toBe(150);
  })

  test("diagonal distance should be accurate", () => {
    expect(main.distance([0,0], [5, 12])).toBe(13);
  })
});
