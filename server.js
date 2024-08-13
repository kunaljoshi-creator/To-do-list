// server.js
const express = require('express');
const app = express();
const port = 3111;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    tasks = tasks.filter((task, index) => index != id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
