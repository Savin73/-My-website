const tasks = [];
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();
  if (!taskName) {
    alert("Название не может быть пустым!");
    return;
  };
  tasks.push({ name: taskName, completed: false });
  taskInput.value = "";
  displayTasks();
}
function displayTasks(filter = 'all') {
  const taskListElement = document.getElementById('taskList')
  taskListElement.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    if (task.completed) {
      taskText.classList.add('completed')
    };
    taskText.onclick = () => completeTask(index);
    taskText.ondblclick = () => editTask(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = (event) => {
      event.stopPropagation();
      deleteTask(index);
    };

    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton);
    taskListElement.appendChild(listItem);
  });
}

function completeTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
function editTask(index) {
  const newTaskName = prompt("Редактировать задачу:", tasks[index].name);
  if (newTaskName !== null && newTaskName.trim() !== "")
    tasks[index].name = newTaskName.trim();
  displayTasks()
}
document.getElementById('addTaskBtn').onclick = () => addTask();
document.getElementById('showAllBtn').onclick = () => displayTasks('all');
document.getElementById('showCompletedBtn').onclick = () => displayTasks('completed');
document.getElementById('showPendingBtn').onclick = () => displayTasks('pending');

// Сериализуем массив сохраняем его в localStorage
localStorage.setItem('taskList', JSON.stringify(tasks));

// Извлекаем массив из localStorage и десериализуем его
tasks = JSON.parse(localStorage.getItem('taskList'));
