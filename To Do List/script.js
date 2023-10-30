const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;
  createTask(taskText);
  storeTasks();
  taskInput.value = "";
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addTask();
});

function createTask(taskText) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;

  const deleteButton = taskItem.querySelector(".deleteBtn");
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    storeTasks();
  });

  taskList.appendChild(taskItem);
}

function storeTasks() {
  const tasks = Array.from(taskList.children).map((taskItem) => ({
    text: taskItem.querySelector("span").textContent,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

storedTasks.forEach((task) => createTask(task.text));
