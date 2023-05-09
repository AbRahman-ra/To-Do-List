// [1] Initialization
// [1.1] Input Section Initialization
let inputSection = document.getElementById("input-section");
let inputTextField = inputSection.querySelector("input[type=text]");
let addButton = inputSection.querySelector("input[type=button]");

// [1.2] Output Section Initialization
let outputSection = document.getElementById("output-section");
let tasks = [];
let tasksHTML;

// [1.3] Webpage Initialization
window.addEventListener("DOMContentLoaded", () => {
  inputTextField.focus();
});

// [2] Reloading Page
window.addEventListener("DOMContentLoaded", function () {
  let localStorageTasks = localStorage.getItem("tasks");

  // [2.1] If there are existing tasks in local storage
  if (localStorageTasks !== null) {
    // [2.2] Get the tasks as an array
    tasks = JSON.parse(window.localStorage["tasks"]);

    // [2.3] Print the tasks on document
    printAllTasks();
  }
});

// [3] When Click on "Add" Button, Insert a Task
addButton.addEventListener("click", () => {
  insertTask();
});

// [4] When Press "Enter" In The Text Field, Insert a Task
inputTextField.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let clickOnAddButton = new Event("click");
    addButton.dispatchEvent(clickOnAddButton);
    // Prevent the "Enter" key itself from submitting the task (this will be done by "Add" button)
    e.preventDefault();
  }
});

// [5 - FUNCTION] Print All Existing Tasks On Page Load
let printAllTasks = function () {
  tasks.forEach(function (t, i) {
    // [5.1] Create a section for each output task
    let tSection = document.createElement("section");
    tSection.classList.add("output-task");

    // [5.2] Create a container that handles each output task text with checkbox
    let checkboxDiv = document.createElement("div");

    // [5.3] Create an unchecked checkbox for each output task
    // [5.3.1] The checkbox
    let outputTask = document.createElement("input");
    outputTask.type = "checkbox";
    outputTask.id = `task-${tasks.length - i}-checkbox`;
    outputTask.checked = false;
    outputTask.classList.add("output-task-text");

    // [5.3.2] The checkbox label
    let outputTaskLabel = document.createElement("label");
    outputTaskLabel.setAttribute("for", outputTask.id);
    outputTaskLabel.classList.add("output-task-text");
    outputTaskLabel.innerHTML = t;

    // [5.3.3] Append the checkbox to the container
    checkboxDiv.appendChild(outputTask);
    checkboxDiv.appendChild(outputTaskLabel);

    // [5.4] Create a delete button
    let delButton = document.createElement("button");
    delButton.classList.add("del-button");
    delButton.innerHTML = `×`;

    // [5.5] Append checkbox container and button to task section
    tSection.appendChild(checkboxDiv);
    tSection.appendChild(delButton);

    // [5.6] Append task section to the big output section
    outputSection.append(tSection);
  });

  // [5.6] Activate the delete button for each printed task
  tasksHTML = document.querySelectorAll(".output-task");
  activateDeleteButton(tasksHTML);
};

// [6 - FUNCTION] Input a Task
let insertTask = function () {
  // [6.1] Obtain the task
  let userInput = inputTextField.value;
  if (userInput.length !== 0) {
    inputTextField.setAttribute("placeholder", "Add another task");
    // [6.2] Push it to an "tasks" array (descending order)
    tasks.unshift(userInput);
    // [6.3] Update the local storage
    window.localStorage.tasks = JSON.stringify(tasks);
    // [6.4] Print the tasks on the document (Section 7)
    printTask();
    // [6.5] Clear the input text field and focus again
    inputTextField.value = "";
    inputTextField.focus();
  } else {
    // [6.6] For empty tasks, display a message to the user
    inputTextField.setAttribute("placeholder", "Can't add an empty task");
  }
};

// [7 - FUNCTION] Print the last (added) task on the document
let printTask = function () {
  let userInput = inputTextField.value;

  // [7.1] Create a section for each output task
  let tSection = document.createElement("section");
  tSection.classList.add("output-task");

  // [7.2] Create a container that handles each output task text with its checkbox
  let checkboxDiv = document.createElement("div");

  // [7.3] Create an unchecked checkbox for each output task
  // [7.3.1] The checkbox
  let outputTask = document.createElement("input");
  outputTask.type = "checkbox";
  outputTask.id = tasks.length;

  // [7.3.2] The label
  let outputTaskLabel = document.createElement("label");
  outputTaskLabel.setAttribute("for", outputTask.id);
  outputTaskLabel.classList.add("output-task-text");
  outputTaskLabel.innerHTML = userInput;

  // [7.4] Create a delete button
  let delButton = document.createElement("button");
  delButton.classList.add("del-button");
  delButton.innerHTML = `×`;

  // [7.5] Append checkbox to its container
  checkboxDiv.appendChild(outputTask);
  checkboxDiv.appendChild(outputTaskLabel);

  // [7.6] Append checkbox container and delete button to the output task section
  tSection.appendChild(checkboxDiv);
  tSection.appendChild(delButton);

  // [7.7] Prepend task section to the big output section (to be ordered descendingly)
  outputSection.prepend(tSection);

  // [7.8] Update the tasks HTMLs
  tasksHTML = outputSection.querySelectorAll(".output-task");

  // [7.9] Activate the delete button for printed tasks
  activateDeleteButton(tasksHTML);
};

// [8 - FUNCTION] Delete the recorded tasks
let activateDeleteButton = function (sectionsWithDelBtn) {
  // [8.1] Get every delete button
  sectionsWithDelBtn.forEach(function (t) {
    let delButton = t.querySelector("button");
    let taskToBeRm = t.querySelector("label").textContent;

    // [8.2] Event trigger
    delButton.onclick = function () {
      // [8.2.1] Remove the whole HTML Section
      t.remove();

      // [8.2.2] Remove the value from the tasks array
      tasks.splice(tasks.indexOf(taskToBeRm), 1);

      // [8.2.3] Update the local storage with the new array
      window.localStorage.tasks = JSON.stringify(tasks);

      // [8.2.4] If the deleted task is the only one, remove the whole array from the local storage
      if (tasks.length === 0) {
        window.localStorage.removeItem("tasks");
      }
    };
  });

  // [8.3] If no tasks exist on webpage load, remove the array (if exists) from the local storage
  if (tasks.length === 0) {
    window.localStorage.removeItem("tasks");
  }
};
