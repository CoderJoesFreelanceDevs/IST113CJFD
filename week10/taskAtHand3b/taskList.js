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
}

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


function TaskList(tasks)
{
	tasks = tasks || [];
	
	this.getTasks = function()
	{
		return tasks;
	};
	
	this.addTask = function(task)
	{
		tasks.push(task);
		return this;
	};
	
	this.removeTask = function(taskId)
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
	
	this.getTask = function(taskId)
    {
        var index = getTaskIndex(taskId);
        return (index >= 0 ? tasks[index] : null);
    };

	
	this.each = function(callback)
	{
		for(var i in tasks)
			callback(tasks[i]);
	};
	
	function getTaskIndex(taskId)
	{
		for(var i in tasks)
		{
			if(tasks[i].id == taskId)
				return parseInt(i);
		}
		return -1;
	}
	
	
}

