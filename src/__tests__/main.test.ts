/**
 * author Juho kettunen
 *
 * Tests for all reasonably testable files in main.ts.
 *
 * Notes:
 * - Should nulls and undefineds be allowed in tuples or not?
 * - What is to be expected with a mismatched number of parameters?
 */

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
  it("correctly extracts x- and y-coordinates as a Point tuple from a Station tuple", () => {
    const stations: Station[] = [
      [0, 0, 0],              // base case
      [1000, -1000, 500],     // also negative values
      [-12.34, 56.78, 91.23], // floats
    ];
    for (let station of stations) {
      expect(main.getCoordinates(station)).toEqual([station[0], station[1]]);
    }
  });
});

describe("distanceToStation", () => {
  it(
    "has return values identical to return values of function 'distance' for " +
      "tuples with identical x- and y-coordinates",
    () => {
      const points: Point[] = [
        [0, 0],
        [-999, 999],
        [55.55, 44.44],
      ];
      const stations: Station[] = [
        [0, 0, 0],              // base case
        [1000, -1000, 500],     // also negative values
        [-12.34, 56.78, 91.23], // floats
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
  it("returns reach^2 for points with distance 0 to link station", () => {
    expect(main.calculatePower([-50, 50], [-50, 50, 10])).toBe(100);
  });

  it("calculates power correctly when distance <= reach", () => {
    const points: Point[] = [
      [0, 0],
      [100, 100],
      [-50.0, 50.0],
    ];
    const stations: Station[] = [
      [0, 10, 20],      // distance < reach
      [0, 100, 100],    // distance == reach
      [-49.9, 50.0, 1], // 'reach - distance' between 0 and 1
    ];
    const powers: number[] = [100, 0, 0.81];
    for (let i = 0; i < points.length; i++) {
      expect(main.calculatePower(points[i], stations[i])).toBeCloseTo(powers[i]);
    }
  });

  it("returns 0 when reach < distance", () => {
    expect(main.calculatePower([0, 0], [0, 10, 9.999])).toBe(0);
  });
});

describe("findBestStation", () => {
  it("returns undefined when there are no stations", () => {
    expect(main.findBestStation([0, 0], [])).toBeUndefined();
  });

  it("returns undefined when no link stations are within reach", () => {
    expect(main.findBestStation([0, 0], [10, 10, 10])).toBeUndefined();
  });

  it("returns the only station within reach", () => {
    const station: Station = [10, 10, 20];
    expect(main.findBestStation([0, 0], [station])).toBe(station);
  });

  it("returns the link station with highest power from multiple stations within reach", () => {
    const point: Point = [0, 0];
    const stations: Station[] = [
      [0, 10, 12],  // power == 4
      [0, 0, 10],   // power == 100
      [0, 10, 15],  // power == 25
    ];
    expect(main.findBestStation(point, stations)).toEqual([0, 0, 10]);
  });
});
