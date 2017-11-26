"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var correctnumber = "";
	var ww;
	var lat;
	var lon;
	
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);	
		$("#getWeather").click(function()
		{
			//set latitude and longitude to pass to weatherWidget
			lat = document.getElementById("latitude").value;
			lon = document.getElementById("longitude").value;
			ww.update(lat, lon);
		});//end of #getWeather click function
	}//end of setStatus

	// creating a public function on startup
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		
		$("#title").text("Welcome to the Weather App.");
		ww = new WeatherWidget("#weather-widget", "53e3a2e304ca4611");
	};
} // end App

$(function() {
	window.app = new MyApp();
	window.app.start();
});
