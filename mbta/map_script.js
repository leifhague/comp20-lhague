function map_init()
{	
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
	
	var branchStops = [];
	branchStops.push(new google.maps.LatLng(42.320685, -71.052391)); // JFK/UMass
	branchStops.push(new google.maps.LatLng(42.31129, -71.053331)); // Savin Hill
	branchStops.push(new google.maps.LatLng(42.300093, -71.061667)); // Fields Corner
	branchStops.push(new google.maps.LatLng(42.29312583, -71.06573796000001)); // Shawmut
	branchStops.push(new google.maps.LatLng(42.284652, -71.06448899999999)); // Ashmont

	var mapSettings = {
		zoom: 12,
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
}