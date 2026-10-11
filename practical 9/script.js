const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");

let tasks = [];
let nextId = 1;

function renderTasks() {
    list.replaceChildren();

    tasks.forEach(task => {
        const item = document.createElement("li");
        item.className = task.completed ? "task done" : "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const title = document.createElement("span");
        title.textContent = task.title;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        item.append(checkbox, title, deleteButton);
        list.append(item);
    });

    const remaining = tasks.filter(t => !t.completed).length;
    count.textContent = `${remaining} task${remaining === 1 ? "" : "s"} remaining`;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const title = input.value.trim();
    if (!title) return;

    tasks.push({
        id: nextId++,
        title: title,
        completed: false
    });

    input.value = "";
    renderTasks();
});

renderTasks();
