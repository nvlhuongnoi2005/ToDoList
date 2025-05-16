document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('input-task');
  const addTaskButton = document.getElementById('add-task');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  const loadTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  };

  // Save current task list to localStorage
  const saveTasks = () => {
    const tasks = [];
    taskList.querySelectorAll('li span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTaskElement = (text) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    // Button Edit with icon
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.className = 'edit';
    editBtn.title = 'Edit';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task:', span.textContent);
      if (newText !== null && newText.trim() !== '') {
        span.textContent = newText.trim();
        saveTasks(); // Save after editing
      }
    });

    // Button Delete with icon
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.className = 'delete';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasks(); // Save after deleting
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    return li;
  };

  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      const taskItem = createTaskElement(taskText);
      taskList.appendChild(taskItem);
      taskInput.value = '';
      saveTasks(); // Save after adding
    }
  };

  // Load existing tasks on page load
  const tasks = loadTasks();
  tasks.forEach(taskText => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });

  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(event);
    }
  });
});
