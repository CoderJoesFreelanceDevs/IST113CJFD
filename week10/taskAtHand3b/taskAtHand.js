"use strict";
//NOTE: I followed the book's guide to this lab so my code looks similar, but I took the time to understand what I was doing, and explored alternative syntax and logic (that usually didn't work)
// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0",
	appStorage = new AppStorage("taskAtHand");
	taskList = new TaskList();
	timeoutId = 0;
	
	// creating a private function
	function setStatus(message, noFade)
	{
		$("#app>footer").text(message).show();
		if (!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
		//$("#app>footer").text(message);
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
		loadTheme();
		//FIX: moved themecall to addToList
		//hindsight 20/20: clearly need to load theme on start, create listener in addToList
	};
	
	function newTask()
	{
		var task = $("#taskentry").val();
		//alert();
		if(task)
		{
			var taskName = new Task(task);
			taskList.addTask(taskName);
			appStorage.setValue("nextTaskID", Task.nextTaskId);
			//alert("newTask isnt null");
			addToList(task);
			$("#newTask").val("").focus();
		}
		saveTaskList();
	}
	
	function addToList(taskName)
	{
		//Note: old function was replaced to incorporate template
		var $task = $("#task-template .task").clone();
		$taskName.data("task-id",task.id);
		$("span.task-name", $task).text(taskName.name);
		$("#task-list").append($task);
		$task.click(function() { onSelectTask($task); });
		$("#theme").change(onChangeTheme);
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
		$("button.toggle-details", $task).click(function(){
			toggleDetails($task);
		});
		$(".details input, .details select", $task).each(function() {
		var $input = $(this);
		var fieldName = $input.data("field");
		$input.val(task[fieldName]);
		});
		$(".details input, .details select", $task).change(function() {
		onChangeTaskDetails(task.id, $(this));
		});
		$("span.task-name", $task).blur(function() {
		$(this).hide().siblings("span.task-name").show();
		});
	}
	
	function deleteTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	
	function moveUpTask($task)
	{
		$task.insertBefore($task.prev());
		saveTaskList();
	}
	
	function moveDownTask($task)
	{
		$task.insertAfter($task.next());
		saveTaskList();
	}
	
	function editTask($name)
	{
		$name.hide()
			.siblings("input.task-name")
			.val($name.text())
			.show()
			.focus();
		saveTaskList();
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
		saveTaskList();
	}

	function onChangeTaskDetails(taskId, $input)
	{
		var task = taskList.getTask(taskId)
		if (task)
		{
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}
	}
	
	function saveTaskList()
	{
		if (timeoutId) clearTimeout(timeoutId);
			setStatus("saving changes...", true);
		timeoutId = setTimeout(function()
		{
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}
	
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
	}
	
	function rebuildTaskList()
	{
		$("#task-list").empty();	
		taskList.each(function(task)
		{
			addTaskElement(task);
		});
	}
	
	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		//NOTE: theme fails to save, or load?
		appStorage.setValue("theme", theme);
	}
	
	function setTheme(theme)
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}

	
	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if (theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]")
			.attr("selected","selected");
		}
	}
	
	function onSelectTask($task)
	{
		if ($task)
		{
			// Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			// Select this task
			$task.addClass("selected");
		}
	}
	
	function toggleDetails($task)
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}
	
	
	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text());
		});
		appStorage.setValue("taskList", tasks);
		//alert(tasks);
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