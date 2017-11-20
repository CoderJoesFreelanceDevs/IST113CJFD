/*
    
*/

"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";
	var correctnumber = "";
	var ww;
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
		
		$("#getWeather").click(function()
		{
			ww.update();
		});//end of #getWeather click function
	}

	// creating a public function on startup
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		
		$("#title").text("Welcome to the Weather App.");
		ww = new WeatherWidget("#weather-widget");
	};
	
	function getLocation()
	{
		if (navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(
			function(position)
			{
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
			},
			function(error)
			{
				$("#controls .error")
					.text("ERROR: " + error.message)
						.slideDown();
			});
		}
	}
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/

$(function() {
	window.app = new MyApp();
	window.app.start();
});
