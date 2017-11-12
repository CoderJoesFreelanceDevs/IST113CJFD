function Task(name)
{
	this.name = name;
	this.id = Task.nextTaskId++;
	this.created = new Date();
	this.priority = Task.priorities.normal;
	this.status = Task.statuses.notStarted;
	this.pctComplete = 0;
	this.startDate = null;
	this.dueDate = null;


	Task.nextTaskID = 1;

	Task.priorities = {
		none: 0,
		minimal: 1,
		normal:2,
		high:3,
		wickedhigh:4,
		lifeordeath:5,
	};

	Task.statuses = {
		none: 0,
		notStarted: 1,
		inProgress: 2,
		nearlyDone: 3,
		done: 4
	};
}

function TaskList (tasks)
{
	tasks = tasks || [];
	
	function getTasks()
	{
		return tasks;
	}
	
	function addTask()
	{
		tasks.push(task);
		return this;
	}
	
	function removeTask(taskID)
	{
		var i = getTaskIndex(taskId);
		if (i >=0)
		{
			var task = tasks[i];
			tasks.splice(i,1);
			return task;
		}
		return null;
	}
	
	function getTaskIndex(taskId)
	{
		for(var i in tsaks)
		{
			if(tasks[i].id == taskId)
				return parseInt(i);
		}
		return null;
	}
	
	function each(callback)
	{
		for(var i in tasks)
			callback(tasks[i]);
	}
}

