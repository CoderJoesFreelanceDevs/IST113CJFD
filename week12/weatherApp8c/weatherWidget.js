function WeatherWidget($widget, apiKey)
{
	//basic call that resets the UI and attempts to update the weather
	this.update = function(lat,lon)
	{
		$(".results", $widget).hide();
		$(".loading", $widget).show();
		getWeatherReport(lat, lon);
	};
	
	//use latitude and longitude in an ajax call to the wunderground weather api
	function getWeatherReport(lat, lon)
	{
		var coordinates = lat + ","+ lon;
		$.ajax({
			url: "http://api.wunderground.com/api/"+apiKey+"/conditions/q/"+coordinates+".json",
			dataType: "jsonp"
		})
		.done(function(data)
		{
			populateWeather(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			showError(errorThrown);
		});
	}
	
	//arbitrary error method that doesn't work
	function showError(errorThrown)
	{
        $(".loading", $widget).fadeOut(function ()
        {
            alert(text(errorThrown));
        });
		return;
	}
	
	//takes the json data from the ajax call and forms it to our html
	function populateWeather(data)
	{
		var observation = data.current_observation;
		$(".results header img", $widget).attr("src", observation.icon_url);
		$(".location>span", $widget).text(observation.display_location.full);
		$(".conditions>span").each(function(i, e)
		{
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(observation[field]);
		});
		$(".results footer img", $widget)
			.attr("src", observation.image.url);
		$(".loading", $widget).fadeOut(function ()
		{
			$(".results", $widget).fadeIn();
		});
	}
	
}