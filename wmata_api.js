/**
 * Finds the next bus that will be at the given stop.
 *
 * @param {string} apiKey the API key needed for the WMATA API
 * @param {string} stopId the stop to find the next bus for
 * @return {object} The bus retrieved from the WMATA API
 */
function nextBusesAtStop(apiKey, stopId) {
    const params = {
        "api_key": apiKey,
        "StopID": stopId,
    };

    var nextBuses = $.ajax({
        url: "https://api.wmata.com/NextBusService.svc/json/jPredictions?"
			+ $.param(params),
        type: "GET",
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
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
function findBusLocation(apiKey, routeId) {
    const params = {
        "api_key": apiKey,
        "RouteID": routeId
    };

    var location = $.ajax({
        url: "https://api.wmata.com/Bus.svc/json/jBusPositions?"
			+ $.param(params),
        type: "GET",
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });

    return location;
}

/**
 * Finds the next trains that will be at the given stations.
 *
 * @param {string} apiKey the API key needed for the WMATA API
 * @param {string} stationCodes the stations to find the trains for
 * @return {object} The trains retrieved from the WMATA API
 */
function nextTrainsAtTrains(apiKey, stationCodes) {
    const params = {
        "api_key": apiKey,
    };

    var nextTrains = $.ajax({
        url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/"
			+ stationCodes + "?" + $.param(params),
        type: "GET",
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    });

    return nextTrains;
}
