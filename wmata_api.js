/**
 * Finds the next bus that will be at the given stop.
 *
 * @param {string} apiKey the API key needed for the WMATA API
 * @param {string} stopId the stop to find the next bus for
 * @return {object} The bus retrieved from the WMATA API
 */
function nextBusesAtStop(apiKey, stopId) {
    const today = new Date();
    const time = today.toLocaleTimeString();
    const predictionParams = {
        "api_key": apiKey,
        "StopID": stopId,
    };

    var nextBuses = $.ajax({
        url: "https://api.wmata.com/NextBusService.svc/json/jPredictions?" + $.param(predictionParams),
        type: "GET",
    })
    .fail(function() {
        alert("Unable to query for next bus at stop");
    });

    return nextBuses;
}

/**
 * Finds the location (latitude & longitude) of the next bus that will
 * arrive at the bus stop.
 *
 * @param {string} apiKey The API key needed to connect to the WMATA API
 * @param {object} bus The object from the WMATA API for the next bus
 * @return {object} The lat and lng of the bus' location
 */
function findBusLocation(apiKey, bus) {
    const params = {
        "api_key": apiKey,
        "RouteID": bus.RouteID,
    };
    var busLoc;

    var location = $.ajax({
        url: "https://api.wmata.com/Bus.svc/json/jBusPositions?" + $.param(params),
        type: "GET",
    })
    .fail(function() {
        alert("Unable to retrieve bus location");
    });

    return location;
}
