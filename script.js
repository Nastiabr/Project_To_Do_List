document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const clearAllButton = document.getElementById("clearAll");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task
    function addTask(taskText) {
        if (taskText.trim() === "") return;

        const task = {
            text: taskText,
            completed: false,
        };

        tasks.push(task);
        saveTasks();
        displayTasks();
        taskInput.value = "";
    }

    // Function to display tasks on the page
    function displayTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete" data-index="${index}">Delete</button>
                <button class="complete" data-index="${index}">Complete</button>
            `;

            if (task.completed) {
                listItem.classList.add("completed");
            }

            taskList.appendChild(listItem);
        });
    }

    // Function to mark a task as completed
    function completeTask(index) {
        tasks[index].completed = true;
        saveTasks();
        displayTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        displayTasks();
    }

    // Event listener to add a new task
    addTaskButton.addEventListener("click", function () {
        addTask(taskInput.value);
    });

    // Event listener for Enter key press in the input field
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Event delegation for task complete and delete buttons
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("complete")) {
            const index = e.target.getAttribute("data-index");
            completeTask(index);
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            deleteTask(index);
        }
    });

    // Event listener to clear all tasks
    clearAllButton.addEventListener("click", function () {
        if (confirm("Are you sure you want to clear all tasks?")) {
            tasks.length = 0;
            saveTasks();
            displayTasks();
        }
    });

    // Display tasks on page load
    displayTasks();
});
