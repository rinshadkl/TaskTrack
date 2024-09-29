const inputBox = document.getElementById("inputBox");
const listWrapper = document.getElementById("list-wrapper");

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (inputBox.value === '') {
        alert("You must add something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listWrapper.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "<i class='bx bx-x'></i>";
        li.appendChild(span);
        li.classList.add("flex", "flex-row", "justify-between", "items-center");
        span.classList.add("hover:bg-[#3b3e4180]", "duration-700", "px-2", "py-1", "rounded-[50%]", "text-[#555", "text-3xl");

        // Save task to local storage
        saveTaskToLocalStorage(inputBox.value);

        inputBox.value = ''; // Clear the input box
    }
}

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

listWrapper.addEventListener("click", function(e) {
    // If the target is a <li>
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
    } 
    // If the target is the <span> or any child element inside <span> (like <i>)
    else if (e.target.tagName === "SPAN" || e.target.parentElement.tagName === "SPAN") {
        const taskText = e.target.closest('li').innerText.replace('×', '').trim();
        e.target.closest('li').remove();
        removeTaskFromLocalStorage(taskText); // Update local storage on delete
    }
}, false);

// Save task to local storage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task;
        listWrapper.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "<i class='bx bx-x'></i>";
        li.appendChild(span);
        li.classList.add("flex", "flex-row", "justify-between", "items-center");
        span.classList.add("hover:bg-[#3b3e4180]", "duration-700", "px-2", "py-1", "rounded-[50%]", "text-[#555", "text-3xl");
    });
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        return JSON.parse(tasks);
    } else {
        return [];
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
