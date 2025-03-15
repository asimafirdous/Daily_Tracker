function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const taskText = item.textContent.replace("Delete", "").trim();
        const isChecked = checkbox.checked;
        tasks.push({ text: taskText, checked: isChecked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.checked;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            listItem.remove();
            saveTasks();
        };

        listItem.textContent = task.text;
        listItem.prepend(checkbox);
        listItem.appendChild(deleteButton);
        document.getElementById('task-list').appendChild(listItem);

        checkbox.addEventListener('change', saveTasks);
    });
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskTime = document.getElementById("task-time");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() !== "") {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.fontSize = "12px";
        deleteButton.onclick = () => {
            taskList.removeChild(listItem);
            saveTasks();
        };

        listItem.textContent = `${taskDate.value} ${taskTime.value} - ${taskInput.value}`;
        listItem.prepend(checkbox);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Save the task to local storage
        saveTasks();

        // Set reminder if time is given
        if (taskTime.value) {
            const reminderTime = new Date(`${taskDate.value}T${taskTime.value}`);
            const now = new Date();
            const delay = reminderTime - now;

            if (delay > 0) {
                setTimeout(() => {
                    alert(`${taskInput.value} ${taskTime.value} Reminder`);
                }, delay);
            }
        }

        // Clear input fields
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
    }
}

// Load tasks on page load
window.onload = loadTasks;