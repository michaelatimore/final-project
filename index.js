const taskManager = new TaskManager(0);

taskManager.load();

taskManager.render();

const newTaskForm = document.querySelector('#newTaskForm');

newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const errorElement = document.getElementById("error");

newTaskForm.addEventListener("submit", (e) => {
  let messages = [];
  if (newTaskNameInput.value === "" || newTaskNameInput == null) {
    messages.push("Name is required")
  }

  if (newTaskDescription.value === "" || newTaskDescription.value.length > 20) {
    messages.push("Description is required and not longer than 20 characters")
  }

  if (newTaskAssignedTo.value === "" && newTaskAssignedTo.value < 3) {
    messages.push("Enter Assignee for Task")
  }

  if (newTaskDueDate.value === "" || newTaskDueDate.value != number) {
    messages.push("Enter Due Date")
  }
  
  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join("; ")
  }
});

    /*
        Validation code here
    */

    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;

    taskManager.addTask(name, description, assignedTo, dueDate);

    taskManager.save();

    taskManager.render();

    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
});

const tasksList = document.querySelector('#tasksList');

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.parentElement.parentElement;

        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        task.status = 'DONE';

        taskManager.save();

        taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task
        taskManager.deleteTask(taskId);

        // Save the tasks to localStorage
        taskManager.save();

        // Render the tasks
        taskManager.render();
    }
});