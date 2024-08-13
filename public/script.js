// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const tasksList = document.getElementById('tasks');

    const fetchTasks = async () => {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        tasksList.innerHTML = tasks.map((task, index) => `
            <li>
                ${task.text}
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `).join('');
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = { text: taskInput.value };
        await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        taskInput.value = '';
        fetchTasks();
    });

    window.deleteTask = async (id) => {
        await fetch(`/tasks/${id}`, {
            method: 'DELETE',
        });
        fetchTasks();
    };

    fetchTasks();
});
