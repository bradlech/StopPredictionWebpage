function test() {	
	var today = new Date();
	var time = today.toLocaleTimeString();
	var params = {
		"api_key": "e13626d03d8e4c03ac07f95541b3091b",
		// Request parameters
		"StopID": "6000615",
	};
  
	$.ajax({
		url: "https://api.wmata.com/NextBusService.svc/json/jPredictions?" + $.param(params),
		type: "GET",
	})
	.done(function(data) {
		console.log(data);
		document.getElementById("last_refresh").innerHTML = time;
		document.getElementById("stop_1").innerHTML = data.Predictions[0].RouteID + " - " + data.Predictions[0].DirectionText;
		document.getElementById("stop_1_time").innerHTML = data.Predictions[0].Minutes;
		//alert("success");
	})
	.fail(function() {
		alert("error");
	});
}
