"use strict";
//NOTE: I followed the book's guide to this lab so my code looks similar, but I took the time to understand what I was doing, and explored alternative syntax and logic (that usually didn't work)
// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
				
		$("#newtask").keypress(function(e) {
		if (e.which == 13) 
		{
			//alert("keypress is detected!");
			newTask();
			return false;
		}
	})	.focus();
	};
	
	function newTask()
	{
		var task = $("#taskentry").val();
		//alert();
		if(task)
		{
			//alert("newTask isnt null");
			addToList(task);
			$("#newTask").val("").focus();
		}
	}
	
	function addToList(task)
	{
		var $item = $("<li></li>");
		$item.text(task);
		$("#taskslist").append($item);
		var $del = $("<button class='del'>X</button>");
		var $up = $("<button class='up'>^</button>");
		var $down = $("<button class='down'>_</button>");
		$item.append($del);
		$item.append($up);
		$item.append($down);
			//.append("<span class='taskslist'>" + task + "</span>");
		$up.click(function(){
			$item.insertBefore($item.prev());
		}); 
		$down.click(function(){
			$item.insertAfter($item.next());
		}); 
		$del.click(function(){
			$item.remove();
		}); 
		
	}
	
	function removeFromList(item)
	{
		
		
	}
	
	
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.taskAtHand = new TaskAtHandApp();
	window.taskAtHand.start();
});
