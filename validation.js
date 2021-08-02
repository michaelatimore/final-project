const newTaskNameInput = document.getElementById("newTaskNameInput");
const newTaskDescription = document.getElementById("newTaskDescription");
const newTaskAssignedTo = document.getElementById("newTaskAssignedTo");
const newTaskDueDate = document.getElementById("newTaskDueDate");
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
