/**
 * Updates the Google Map
 *
 * @param {object} busLoc an object with the fields needed for a Marker
 */
function initMap(busLoc) {
    // Hard-code the lat/lon for home
    const homeLatLng = {
        lat: 38.887536,
        lng: -77.147325
    };

    // Initializes the Google Map to the <div> set aside for that.
    var map = new google.maps.Map($("#map")[0]);

    // Create a marker at the house
    var homeMarker = new google.maps.Marker({
        position: homeLatLng,
        map: map,
        title: "1900 North Ohio St",
    });

    // Create an icon for the bus
    var busMarkerIcon = {
        url: "./bus.png",
        size: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(14, 32),
    }

    // Create a marker for the bus, based on the location passed in
    var busMarker = new google.maps.Marker({
        position: busLoc,
        map: map,
        icon: busMarkerIcon,
        title: "Bus",
    });

    // Get a list of all markers
    var markers = [homeMarker, busMarker];
    var bounds = new google.maps.LatLngBounds();

    // Create a set of bounds that contains all markers and use it to set
    // the bounds for the map (ensuring that home and the bus are always both
    // visible).
    for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
}
