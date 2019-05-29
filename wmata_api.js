/**
 * Finds the next bus that will be at the given stop.
 *
 * @param {string} apiKey the API key needed for the WMATA API
 * @param {string} stopId the stop to find the next bus for
 * @return {object} The bus retrieved from the WMATA API
 */
function nextBusAtStop(apiKey, stopId) {
    const today = new Date();
    const time = today.toLocaleTimeString();
    const predictionParams = {
        "api_key": apiKey,
        "StopID": stopId,
    };
    var nextBus;

    $.ajax({
        url: "https://api.wmata.com/NextBusService.svc/json/jPredictions?" + $.param(predictionParams),
        type: "GET",
        // Run synchronously so we can depend on the results. This actually
        // needs to be re-worked because doing this work in the main thread
        // is bad.
        async: false,
    })
    .done(function(data) {
		console.log(data.Predictions);
        nextBus = data.Predictions[0];
		if (data.Predictions.length > 0) {
			// Update the HTML elements
			$("#last_refresh").text(time);
			$("#stop-1-stop-name").text(nextBus.Name)
			$("#stop-1-route-id").text(nextBus.RouteID)
			$("#stop-1-route-dir").text(nextBus.DirectionText);
			$("#stop-1-time").text(nextBus.Minutes);
		}
		else {
			$("#stop-1").text("No real time prediction available");
			$("#minues-away-1").text("No approximation available");
		}
    })
    .fail(function() {
        alert("Unable to query for next bus at stop");
    });

    return nextBus;
}

/**
 * Finds the location (latitude & longitude) of the next bus that will
 * arrive at the bus stop.
 *
 * @param {string} apiKey The API key needed to connect to the WMATA API
 * @param {object} nextBus The object from the WMATA API for the next bus
 * @return {object} The lat and lng of the bus' location
 */
function nextBusCurrentLoc(apiKey, nextBus) {
	if (nextBus != undefined) {
		const params = {
			"api_key": apiKey,
			"RouteID": nextBus.RouteID,
		};
		var busLoc;

		$.ajax({
			url: "https://api.wmata.com/Bus.svc/json/jBusPositions?" + $.param(params),
			type: "GET",
			// Run synchronously so we can depend on the results. This actually
			// needs to be re-worked because doing this work in the main thread
			// is bad.
			async: false,
		})
		.done(function(busData) {
			console.log(busData);
			busLoc = busData.BusPositions.filter(function(elem) {
				return elem.VehicleID.valueOf() == nextBus.VehicleID.valueOf();
			})[0];
		})
		.fail(function() {
			alert("Unable to retrieve bus location");
		});

		return {
			lat: busLoc.Lat,
			lng: busLoc.Lon,
		};
	}
	else {
		return null;
	}
}
