"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0",
	appStorage = new AppStorage("taskAtHand");

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		loadTaskList();
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
		saveTaskList(1);
		var task = $("#taskentry").val();
		//alert();
		if(task)
		{
			//alert("newTask isnt null");
			addToList(task);
			$("#taskentry").val("").focus();
		}
		saveTaskList();
	}
	
	function addToList(taskName)
	{
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		$("#taskslist").append($task);
		$("button.delete", $task).click(function() {
			deleteTask($task);
		});
		$("button.move-up", $task).click(function() {
			moveUpTask($task);
		});
		$("button.move-down", $task).click(function() {
			moveDownTask($task);
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
		$("#undo").click(function() {
			bigUndo();
		});
	}
	
	function deleteTask($task)
	{
		saveTaskList(1);
		$task.remove();
		saveTaskList();
	}
	
	function bigUndo()
	{
		//getElement oldList
		var tasks = appStorage.getValue("taskList");
		//clear current list
		$("#taskslist").empty();
		//add old list
		if (tasks)
		{
			for (var i in tasks)
			{
				addToList(tasks[i]);
			}
		}
		saveTaskList();
	}
	
	function moveUpTask($task)
	{
		saveTaskList(1);
		$task.insertBefore($task.prev());
		saveTaskList();
	}
	
	function moveDownTask($task)
	{
		saveTaskList(1);
		$task.insertAfter($task.next());
		saveTaskList();
	}
	
	function editTask($name)
	{
		saveTaskList(1);
		$name.hide()
			.siblings("input.task-name")
			.val($name.text())
			.show()
			.focus();
		saveTaskList();
	}
	
	function changeTaskName($input)
	{
		saveTaskList(1);
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
	}
	
	function saveTaskList(num)
	{
		var tasks = [];
		$("#taskslist .task span.task-name").each(function() {
		tasks.push($(this).text());
		});
		if(num == 1)
		{
			appStorage.setValue("taskList", tasks);
		}
		else
		{
			appStorage.setValue("taskOld", tasks);
		}
		
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if (tasks)
		{
			for (var i in tasks)
			{
				addToList(tasks[i]);
			}
		}
	}
		// end MyApp
}
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
