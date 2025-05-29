const inputBox = document.getElementById("inputBox");
const listWrapper = document.getElementById("list-wrapper");

// Load tasks and initialize drag-and-drop
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    // Enable drag-and-drop sorting
    new Sortable(listWrapper, {
        animation: 150,
        onEnd: saveSortedTasks
    });
});

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must add something");
    } else {
        const task = inputBox.value.trim();
        const existingTasks = getTasksFromLocalStorage();
        existingTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        createTaskElement(task);
        inputBox.value = '';
    }
}

// Add task on Enter key
inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Handle task checking and deletion
listWrapper.addEventListener("click", function (e) {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.tagName === 'LI' || e.target.closest('li') === li) {
        li.classList.toggle("line-through");
        li.classList.toggle("text-gray-500");
    }

    if (e.target.tagName === "SPAN" || e.target.parentElement.tagName === "SPAN") {
        const taskText = li.getAttribute('data-task');
        li.remove();
        removeTaskFromLocalStorage(taskText);
    }
});

// Create and append a task <li>
function createTaskElement(task) {
    let li = document.createElement("li");
    li.textContent = task;
    li.setAttribute("data-task", task);
    li.classList.add("flex", "flex-row", "justify-between", "items-center", "cursor-move", "bg-gray-100", "p-2", "rounded-md", "mb-1");

    let span = document.createElement("span");
    span.innerHTML = "<i class='bx bx-x'></i>";
    span.classList.add("hover:bg-[#3b3e4180]", "duration-700", "px-2", "py-1", "rounded-[50%]", "text-[#555]", "text-3xl");

    li.appendChild(span);
    listWrapper.appendChild(li);
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => createTaskElement(task));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Remove a task from localStorage
function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Save the new order after reordering tasks
function saveSortedTasks() {
    const reorderedTasks = [];
    const listItems = listWrapper.querySelectorAll('li');

    listItems.forEach(item => {
        reorderedTasks.push(item.getAttribute('data-task'));
    });

    localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
}
