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
            const route = bus.RouteID;

            $(routeDataId).append(
                "<p><span class='font-weight-bold'>" + stop + "</span>: " + route + " - " + dir + "</p>"
            );
            $(minutesId).append(
                "<p>Approx. " + min + " away</p>"
            );
        });
    }
}
