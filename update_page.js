function displayBusTimes(nextBuses) {
    const busPredictions = nextBuses.Predictions;
    const routeDataId = "#stop-route-data";
    const minutesId = "#stop-time";

    $(routeDataId).empty();
    $(minutesId).empty();
    $("#last_refresh").text(new Date().toLocaleTimeString());
    if (busPredictions.length == 0) {
        $(routeDataId).text("No route data available");
    }
    else {
        busPredictions.forEach((bus) => {
            const stop = nextBuses.StopName;
            const dir = bus.DirectionText;
            const min = bus.Minutes;
            const id = bus.VehicleID;
            const route = bus.RouteID;

            $(routeDataId).append(
                "<p><span class='font-weight-bold'>Bus " + id + "</span> will be at <span class='font-weight-bold'>" + stop + "</span> on route <span class='font-weight-bold'>" + route + "</span> heading <span class='font-weight-bold'>" + dir + "</span></p>" 
            );
            $(minutesId).append(
                "<p>Approx. " + min + " away</p>"
            );
        });
    }
}
