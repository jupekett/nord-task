const main = require("../main.ts");

describe("distance", () => {
  it("is zero between identical points", () => {
    expect(main.distance([10, -20], [10, -20])).toBe(0);
  });

  it("is accurate on x-axis", () => {
    expect(main.distance([100, 0], [-50, 0])).toBe(150);
  });

  it("is accurate on y-axis", () => {
    expect(main.distance([0, 50], [0, -100])).toBe(150);
  });

  it("is accurate diagonally", () => {
    expect(main.distance([0, 0], [5, 12])).toBe(13);
  });

  it("is accurate with floating point coordinates", () => {
    expect(main.distance([-44.44, 33.33], [-22.22, 11.11])).toBeCloseTo(31.424);
  });
});

describe("getCoordinates", () => {
  it("gets coordinates", () => {
    const stations: Station[] = [
      [0, 0, 0],
      [1000, -1000, 500],
      [-12.34, 56.78, 91.23],
    ];
    for (let station of stations) {
      expect(main.getCoordinates(station)).toEqual([station[0], station[1]]);
    }
  });

  /*
   * Notes:
   * - should nulls and undefineds be allowed in the tuple or not?
   * - what is to be expected with a mismatched number of parameters?
   */
});

describe("distanceToStation", () => {
  it(
    "has identical return values as function 'distance' for tuples with " +
      "identical x- and y-coordinates",
    () => {
      const points: Point[] = [
        [0, 0],
        [-999, 999],
        [55.55, 44.44],
      ];
      const stations: Station[] = [
        [0, 0, 0],
        [1000, -1000, 500],
        [-12.34, 56.78, 91.23],
      ];
      const stationCoords: Point[] = [
        main.getCoordinates(stations[0]),
        main.getCoordinates(stations[1]),
        main.getCoordinates(stations[2]),
      ];
      for (let i = 0; i < points.length; i++) {
        expect(main.distanceToStation(points[i], stations[i])).toBe(
          main.distance(points[i], stationCoords[i]),
        );
      }
    },
  );
});

describe("calculatePower", () => {
  it("should blaa", () => {
  });
});
