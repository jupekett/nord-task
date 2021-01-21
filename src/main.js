/**
 * author Juho Kettunen
 *
 * Solves the most suitable link stations for certain points [x,y].
 * Prints output to the browser developer console.
 */
/**
 * Calculates the distance between points A and B.
 * @returns distance between two points.
 */
var distance = function (a, b) {
    return Math.sqrt(Math.pow((a[0] - b[0]), 2) + Math.pow((a[1] - b[1]), 2));
};
/**
 * Calculates the distance between a point and a station.
 * @returns distance between the point and the station.
 */
var distanceToStation = function (point, station) {
    var stationCoords = getCoordinates(station);
    return distance(point, stationCoords);
};
/**
 * Returns coordinates from a tuple of type Station.
 * @returns link station's coordinates on a plane.
 */
var getCoordinates = function (station) {
    return [station[0], station[1]];
};
/**
 * Calculates a link station's power for a device at a given point.
 * @returns connection power at a point.
 */
var calculatePower = function (point, station) {
    var distance = distanceToStation(point, station);
    var reach = station[2];
    if (distance < reach) {
        return Math.pow((reach - distance), 2);
    }
    else {
        return 0;
    }
};
/**
 * Returns the link station with most power for a given point.
 * Note: if this code was inline in printBestStations, we'd save
 * one power calculation per point, because we'd have access to
 * the best power already calculated.
 * @returns {Station | undefined} Best station if found, or undefined if not.
 */
var findBestStation = function (point, stations) {
    var bestStation;
    var bestPower = 0;
    for (var _i = 0, stations_1 = stations; _i < stations_1.length; _i++) {
        var station = stations_1[_i];
        var power = calculatePower(point, station);
        if (bestPower < power) {
            bestPower = power;
            bestStation = station;
        }
    }
    return bestStation;
};
/**
 * Finds the best link station for each point and prints out
 * the results.
 */
var printBestStations = function (points, stations) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var bestStation = findBestStation(point, stations);
        if (bestStation) {
            var stationCoords = getCoordinates(bestStation);
            var power = calculatePower(point, bestStation);
            console.log("Best link station for point " + point + " is " + stationCoords + " " +
                (" with power " + power.toFixed(2)));
        }
        else {
            console.log("No link station within reach for point " + point);
        }
    }
};
var points = [
    [0, 0],
    [100, 100],
    [15, 10],
    [18, 18],
];
var stations = [
    [0, 0, 10],
    [20, 20, 5],
    [10, 0, 12],
];
/**
 * Main entry point for the program
 */
printBestStations(points, stations);
// Exports for testing
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        distance: distance,
        distanceToStation: distanceToStation,
        getCoordinates: getCoordinates,
        calculatePower: calculatePower,
        findBestStation: findBestStation
    };
}
