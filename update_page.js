function displayBusTimes(nextBuses) {
    const busPredictions = nextBuses.Predictions;
    const routeDataId01 = "#stop-route-data-0";
    const minutesId = "#stop-time";

    $(routeDataId01).empty();
    $(minutesId).empty();
    $("#last_refresh").text(new Date().toLocaleTimeString());
    if (busPredictions.length == 0) {
        $(routeDataId01).text("No route data available");
    }
    else {
        busPredictions.forEach((bus) => {
            const stop = nextBuses.StopName;
            const dir = bus.DirectionText;
            const min = bus.Minutes;
            const id = bus.VehicleID;
            const route = bus.RouteID;
            const mins = (min == 1) ? "minute" : "minutes";

            $(routeDataId01).append(
                "<li class='list-group-item'><span class='font-weight-bold'>Bus " + id +
                "</span> is arriving in approximately <span class='font-weight-bold'>" + min +
                " " + mins + "</span></li>"
            );
        });
    }
}

function displayTrainTimes(nextTrains) {
    const trainPredictions = nextTrains.Trains;
    const routeDataId01 = "#station-data-0";
	const routeDataId02 = "#station-data-1";

    $(routeDataId01).empty();
	$(routeDataId02).empty();
    $("#last_refresh").text(new Date().toLocaleTimeString());
    if (trainPredictions.length == 0) {
        $(routeDataId01).text("No train data available :(");
		$(routeDataId02).text("No train data available :(");
    }
    else {
        trainPredictions.forEach((train) => {
            const min = train.Min;
            const id = train.DestinationName;
            const mins = (min == 1) ? "minute" : "minutes";
			
			// Ugly brute-forcing
			if (train.LocationName == "Spring Hill") {
				if (min == "ARR") {
					$(routeDataId02).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is <span class='font-weight-bold'>arriving now"
					);
				}
				else if (min == "BRD") {
					$(routeDataId02).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is <span class='font-weight-bold'>boarding now</span>"
					);
				}
				else {
					$(routeDataId02).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is about <span class='font-weight-bold'>" + min +
						" " + mins + "</span> out</li>"
					);
				}

			}
			else {
				if (min == "ARR") {
					$(routeDataId01).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is <span class='font-weight-bold'>arriving now"
					);
				}
				else if (min == "BRD") {
					$(routeDataId01).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is <span class='font-weight-bold'>boarding now</span>"
					);
				}
				else {
					$(routeDataId01).append(
						"<li class='list-group-item'>Train headed for <span class='font-weight-bold'>" + id +
						"</span> is about <span class='font-weight-bold'>" + min +
						" " + mins + "</span> out</li>"
					);
				}
			}
        });
    }
}