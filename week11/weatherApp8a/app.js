/*
    Create a folder in your local class repo called: guessGame
    Create the files: guessGame.html, guessGame.css, and guessGame.js in your guessGame folder
    Create a simple HTML and CSS interface
    Use an <input> field to collect responses
    Output instructions and responses to a <span> in your UI
    Include a way to start playing the game again
    Deploy your app to Azure through GitHub
    Submit the working link to your Azure app to this assignment
	------------------------------------------------------------------------------	
    Setup a local development environment including GitHub Desktop and WS for Chrome
    In your local class repo, copy folder appFrame to appFrameGame
    Using the app framework, reimplement your HTML Guessing Game (same requirements)
        ALL game JavaScript must be inside function MyApp() within app.js
        ALL game HTML must be within the #main div
        Game CSS must be integrated with (not break) the existing app frame CSS
    Commit and push to GitHub
    Verify your app is available on Azure
    Demonstrate for the instructor
    Submit your working link to your Azure app for this assignment
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
		ww = new WeatherWidget("test");
	};
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
