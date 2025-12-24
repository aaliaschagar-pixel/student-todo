let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.priority} ${task.done ? 'done' : ''}">
        ${task.text}
      </span>
      <input type="checkbox" ${task.done ? "checked" : ""} 
        onchange="toggleDone(${index})">
    `;

    taskList.appendChild(li);
  });

  saveTasks();
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const priority = document.getElementById("priority").value;

  if (text === "") return;

  tasks.push({
    text: text,
    priority: priority,
    done: false
  });

  document.getElementById("taskInput").value = "";
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function suggestTask() {
  const pending = tasks.filter(t => !t.done);

  if (pending.length === 0) {
    document.getElementById("suggestionText").innerText =
      "You’re done! Chill time.";
    return;
  }

  const highPriority = pending.find(t => t.priority === "high");
  const suggestion = highPriority || pending[0];

  document.getElementById("suggestionText").innerText =
    `Do this now: ${suggestion.text}`;
}

renderTasks();
