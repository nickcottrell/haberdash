$(document).ready(function() {
	var x = confirm("Heya, this site contains \"progressive enhancements\" for modern web browsers... \n\nClick \"OK\" to get something better:");
	if (x == true) {
		window.location.href = "http://google.com/chrome";
	} else {
		window.location.href = "#";
	}
});