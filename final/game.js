"use strict";

function Game()
{	
	var categories = [];
	var completed = [];
	var correctAnswer;
	var corNum
	var valpoints;
	var nudata;
	for(var i = 0; i < 6; i++)
		completed[i] = new Array(6);
	var points = 0;
	
	function listen()
	{
		$("#getQuestion").click(function(){newGame();});
		$("td").each(function(){
			$(this).click(function(){
				//Class count is the Category number
				var classCount = $(this).attr('class');
				
				//Extract the category number using regex
				var regexC = new RegExp("\\d");
				
				classCount = parseInt(regexC.exec(classCount))-1;
				var valueQ = parseInt($(this).text());
				var valueD = valueQ/200;
				
				//Check if question is eliminated from board
				//parse list of question objects
				if(completed[classCount][valueD]==1)
				{
					$(".error>span").text("ERROR: THIS IS A REPEAT QUESTION!");
					return;
				}
				getQuestion(valueQ,classCount);
				
				//Eliminate the question from the board
				completed[classCount][valueD]=1;
				$(this).css( "background-color","grey" );
			});//end of this.click()
		})
		$("#bigButton").click(function()
		{
			if(correctAnswer!=null)
				answerQuestion();
		});
	}//end of listen()
	
	function newGame()
	{
		populateGameCategories();
		$("td").each(function(){
			$(this).css( "background-color","#659bf2" );})
		completed = new Array(6);
		for(var i = 0; i < 6; i++)
			completed[i] = new Array(6);
		points = 0;
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
	
	function getQuestion(val,catId)
	{
		//console.log("In getQuestion(val, catId: val is: "+val+" and catID is: "+catId)
		var catID = categories[catId].id;
		$.get("http://jservice.io/api/clues",{ value:val, category:catID})
		.done(function(data)
		{
			valpoints = val;
			getClueSetup(data);
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			showError(errorThrown);
		});
	}
	
	function populateGameCategories()
	{
		//call for categories(6)
		$.get("http://jservice.io/api/random",{count:6})
		.done(function(data)
		{
			//displaySingleResult(data);
			//fill categories
			
			for(var i = 0; i < data.length; i++)
			{
				let category = {title:data[i].category.title , id:data[i].category.id}
				categories[i] = category;
			}
			//psuedo code: for each header:
				//-
			var i = 0;
			$("th").each(function()
			{
				$(this).text(categories[i].title.toUpperCase());
				i++;
			});
			
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			showError(errorThrown);
		});
	}
	
	function getClueSetup(data)
	{
		var jData = data[0];
		
		try
		{
			$(".question>span").text(jData.question);
			$(".category>span").text(jData.category.title);
			$(".value>span").text((jData.value).toString());
			$(".answer>span").text(null);
			correctAnswer = jData.answer;
		}
		catch(err)
		{
			$(".error>span").text("ERROR: QUESTION OF CATEGORY WORTH "+valpoints+" WAS NOT FOUND");
			return;
		}
		console.log("correct answer is: "+correctAnswer);
		corNum = Math.floor(Math.random()*(3-1)+1);
		var ii = corNum-1;
		var temp;
		var tempfull;
		var tempanswer;
		$("input:radio").each(function()
		{	
			temp = $(this).val();
			tempfull = $(this);
			console.log(temp);
			//if($(this).attr("value")==corNum)
			if(temp==corNum)
			{
				//console.log("The value of this button is : "+$(this).attr("value")+", matching corNum @ "+corNum);
				console.log("The value of this button is : "+temp+", matching corNum @ "+corNum);
				$("label[for='"+tempfull.attr("id")+"']").text(correctAnswer);
				//console.log("Correct answer added! What is "+correctAnswer+"? This is value "+corNum);
			}
			else
			{
				//console.log("One fake answer is: "+ndata[0].answer+", at value "+$(this).attr("value"));
					//console.log("One fake answer is: "+nudata[0].answer+", at value "+temp);
					tempanswer = getRandomAnswer(jData.category_id,tempfull);
					console.log("temp: "+tempanswer);
					$("label[for='"+tempfull.attr("id")+"']").text(tempanswer);
			}
			ii++;
		})
	}
	
	function getRandomAnswer(id,htmm)
	{
		var tmpNum = Math.floor(Math.random()*(9-1)+1);
		$.get("http://jservice.io/api/clues",{ category:id, offset:tmpNum})
		.done(function(ndata)
		{
			console.log("good data return"+ndata[0].answer);
			$("label[for='"+htmm.attr("id")+"']").text(ndata[0].answer);
			return ndata[0].answer;
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			showError(errorThrown);
			return "";
		});
		return "";
		
	}
	
	function displaySingleResult(data)
	{
		var jData = data[0];
		$(".question>span").text(jData.question);
		$(".answer>span").text(jData.answer);
		$(".category>span").text(jData.category.title);
		$(".value>span").text((jData.value).toString());
	}
	
	function answerQuestion()
	{
		console.log("radio selected value is "+$("input:radio:checked").val());
		//if selected radio button is correct
		if($("input:radio:checked").val()==corNum)
			pointsUpdate(valpoints,true);
		else			
			pointsUpdate(valpoints,false)
		$(".answer>span").text(correctAnswer);
		correctAnswer = null;
	}
	
	function pointsUpdate(update, add)
	{
		if(add==true)
			points += update;
		else
			points -= update;
		$("#yourpoints>span").text(points);
	}
	
	function showError(error)
	{
		alert("Error: Try Again!")
	}
	
	this.start = function()
	{
		newGame();
		listen();
	};
}

$(function() {
	window.game = new Game();
	window.game.start();
});