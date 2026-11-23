
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = " " + task.name;

        if (task.done) li.classList.add("done");

        li.append(checkbox, span);
        list.appendChild(li);
    });

    updateProgress();
}

function addTask() {
    const input = document.getElementById("task-input");
    const name = input.value.trim();

    if (name === "") return;

    tasks.push({ name: name, done: false });

    input.value = "";
    saveTasks();
    renderTasks();
}

function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.done).length;

    const percent = total === 0
        ? 0
        : Math.round(completed / total * 100);

    document.getElementById("progress-text").textContent =
        percent + "% completed";

    document.getElementById("progress-fill").style.width =
        percent + "%";
}

renderTasks();
