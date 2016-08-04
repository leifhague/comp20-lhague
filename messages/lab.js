function parse() {
	var request = new XMLHttpRequest();
	var messageData;

	request.open("GET", "data.json", true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			messageData = request.responseText;
			
			var dataObj = JSON.parse(messageData);
			messages.innerHTML = dataObj[0].content + ' ' + dataObj[0].username;
			messages.innerHTML += "<br>" + dataObj[1].content + ' ' + dataObj[1].username;
		}
	};
	
	request.send();
};
