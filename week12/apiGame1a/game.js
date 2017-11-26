"use strict";

function Game()
{	
	function listen()
	{
		$("#getQuestion").click(function(){getRandomQuestion();});
	}
	
	function getRandomQuestion()
	{
		$.ajax({
			url: "http://jservice.io/api/random",
			dataType: "json"
		})
		.done(function(data)
		{
			displaySingleResult(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			showError(errorThrown);
		});
	}
	
	function displaySingleResult(data)
	{
		var jData = data[0];
		$(".question>span").text(jData.question);
		$(".answer>span").text(jData.answer);
		$(".category>span").text(jData.category.title);
	}
	
	function showError(error)
	{
		alert("Error: Try Again!")
	}
	
	this.start = function()
	{
		listen();
	};
}

$(function() {
	window.game = new Game();
	window.game.start();
});