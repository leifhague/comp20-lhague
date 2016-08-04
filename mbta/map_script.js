function map_init()
{	
	var request = new XMLHttpRequest();
	var tData;
	
	request.open("GET", "https://powerful-depths-66091.herokuapp.com/redline.json", true);
	
	

	var mainStops = [];
	mainStops.push(new google.maps.LatLng(42.395428, -71.142483)); // Alewife
	mainStops.push(new google.maps.LatLng(42.39674, -71.121815)); // Davis
	mainStops.push(new google.maps.LatLng(42.3884, -71.11914899999999)); // Porter Sq
	mainStops.push(new google.maps.LatLng(42.373362, -71.118956)); // Harvard Sq
	mainStops.push(new google.maps.LatLng(42.365486, -71.103802)); // Central Square
	mainStops.push(new google.maps.LatLng(42.36249079, -71.08617653)); // Kendall/MIT
	mainStops.push(new google.maps.LatLng(42.361166, -71.070628)); // Charles/MGH
	mainStops.push(new google.maps.LatLng(42.35639457, -71.0624242)); // Park Street
	mainStops.push(new google.maps.LatLng(42.355518, -71.060225)); // Downtown Crossing
	mainStops.push(new google.maps.LatLng(42.352271, -71.05524200000001)); // South Station
	mainStops.push(new google.maps.LatLng(42.342622, -71.056967)); // Broadway
	mainStops.push(new google.maps.LatLng(42.330154, -71.057655)); // Andrew
	mainStops.push(new google.maps.LatLng(42.320685, -71.052391)); // JFK/UMass
	mainStops.push(new google.maps.LatLng(42.275275, -71.029583)); // North Quincy
	mainStops.push(new google.maps.LatLng(42.2665139, -71.0203369)); // Wollaston
	mainStops.push(new google.maps.LatLng(42.251809, -71.005409)); // Quincy Center
	mainStops.push(new google.maps.LatLng(42.233391, -71.007153)); // Quincy Adams
	mainStops.push(new google.maps.LatLng(42.2078543, -71.0011385)); // Braintree
	
	var mainStopNames = ["Alewife", "Davis", "Porter Square", "Harvard Square",
						 "Central Square", "Kendall/MIT", "Charles/MGH", "Park Street",
						 "Downtown Crossing", "South Station", "Broadway", "Andrew",
						 "JFK/UMASS", "North Quincy", "Wollaston", "Quincy Center",
						 "Quincy Adams", "Braintree"];
	
	var branchStops = [];
	branchStops.push(new google.maps.LatLng(42.320685, -71.052391)); // JFK/UMass
	branchStops.push(new google.maps.LatLng(42.31129, -71.053331)); // Savin Hill
	branchStops.push(new google.maps.LatLng(42.300093, -71.061667)); // Fields Corner
	branchStops.push(new google.maps.LatLng(42.29312583, -71.06573796000001)); // Shawmut
	branchStops.push(new google.maps.LatLng(42.284652, -71.06448899999999)); // Ashmont
	
	var branchStopNames = ["JFK/UMass", "Savin Hill", "Fields Corner", "Shawmut",
						   "Ashmont"];

	var mapSettings = {
		zoom: 5,
		center: mainStops[9], // centered at South Station
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapSettings);
	
	var stopIcon = "t_marker.png";
	
	// Mark all of the T stops on the map
	for (var i = 0; i < mainStops.length; i++) {
		var marker = new google.maps.Marker({
			position: mainStops[i],
			icon: stopIcon,
			title: "Marker"
		});
		marker.setMap(map);
	}
	
	for (var i = 1; i < branchStops.length; i++) {
		var marker = new google.maps.Marker({
			position: branchStops[i],
			icon: stopIcon,
			title: "Marker"
		});
		marker.setMap(map);
	}
	
	// Mark the red line on the map
	var redLineMain = new google.maps.Polyline({
		path: mainStops,
		geodesic: true,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	
	var redLineBranch = new google.maps.Polyline({
		path: branchStops,
		geodesic: true,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	
	redLineMain.setMap(map);
	redLineBranch.setMap(map);
	
	var userLatLng = new google.maps.LatLng(0, 0); // placeholder
	var userMarker = new google.maps.Marker({ // placeholder
		position: userLatLng,
		title: "Position"
	});
	
	
	var closestStop = mainStopNames[0];
	var DistString;
	
	// Find user's location
	navigator.geolocation.getCurrentPosition(function(position) {
		userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		userMarker.setPosition(userLatLng);
		userMarker.setMap(map);
	
		// Find the closest T station
		var closestStopPos = mainStops[0];
		var closestStopDist = computeDistance(closestStopPos.lat(), closestStopPos.lng(), userLatLng.lat(), userLatLng.lng());
	
		for (var i = 1; i < mainStops.length; i++) {
			var stopDist = computeDistance(mainStops[i].lat(), mainStops[i].lng(), userLatLng.lat(), userLatLng.lng());
	
			if (stopDist < closestStopDist) {
				closestStopDist = stopDist;
				closestStopPos = mainStops[i];
				closestStop = mainStopNames[i];
			}
		}
		
		for (var i = 1; i < branchStops.length; i++) {
			var stopDist = computeDistance(branchStops[i].lat(), branchStops[i].lng(), userLatLng.lat(), userLatLng.lng());
	
			if (stopDist < closestStopDist) {
				closestStopDist = stopDist;
				closestStopPos = branchStops[i];
				closestStop = branchStopNames[i];
			}
		}
	
		distString = closestStopDist.toString();
		
		var closestStopPath = [];
		closestStopPath.push(userLatLng);
		closestStopPath.push(closestStopPos);
	
		var closestStopLine = new google.maps.Polyline({
			path: closestStopPath,
			geodesic: true,
			strokeColor: "blue",
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		
		closestStopLine.setMap(map);
	});
	
	var infowindow = new google.maps.InfoWindow();
	
	google.maps.event.addListener(userMarker, 'click', function() {
		infowindow.setContent("The closest T stop, " + closestStop + ", is " + distString + " miles away");
		infowindow.open(map, userMarker);
	});

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			messageData = request.responseText;
			
			var dataObj = JSON.parse(messageData);
			//apply retrieved data to T stop markers
		}
	};
}

// Adapted from StackOverflow
function computeDistance(lat2, lon2, lat1, lon1) {
	var R = 6371; // km
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
					Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
					Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var stopDist = R * c * 0.621371; 

	return stopDist;
}

// Copied from StackOverflow
// Used for Haversine Formula
Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}
