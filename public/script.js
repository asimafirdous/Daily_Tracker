function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim() !== "") {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        listItem.textContent = `${taskDate.value} - ${taskInput.value}`;
        listItem.prepend(checkbox);
        taskList.appendChild(listItem);

        taskInput.value = "";
        taskDate.value = "";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listItem.style.textDecoration = "line-through";
            } else {
                listItem.style.textDecoration = "none";
            }
        });
    }
}