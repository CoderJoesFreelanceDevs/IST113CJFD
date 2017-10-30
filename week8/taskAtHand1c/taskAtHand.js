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
	
	function addToList(taskName)
	{
		//Note: old function was replaced to incorporate template
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		$("#taskslist").append($task);
		$("button.delete", $task).click(function() {
		$task.remove();
		});
		$("button.move-up", $task).click(function() {
		$task.insertBefore($task.prev());
		});
		$("button.move-down", $task).click(function() {
		$task.insertAfter($task.next());
		});
		$("span.task-name", $task).click(function() {
		editTask($(this));
		});
		$("input.task-name", $task).change(function() {
		changeTaskName($(this));
		});
		$("span.task-name", $task).blur(function() {
		$(this).hide().siblings("span.task-name").show();
		});
	}
	
	function editTask($name)
	{
		$name.hide()
			.siblings("input.task-name")
			.val($name.text())
			.show()
			.focus();
	}
	
	function changeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
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
