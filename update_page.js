function displayBusTimes(nextBuses) {
    const busPredictions = nextBuses.Predictions;
    const routeDataId01 = "#stop-route-data-1";
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
                "</span> will arrive in approximately <span class='font-weight-bold'>" + min +
                " " + mins + "</span></li>"
            );
        });
    }
}
