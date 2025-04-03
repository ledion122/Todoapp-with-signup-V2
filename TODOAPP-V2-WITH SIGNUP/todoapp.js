const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

const todoSchema = new mongoose.Schema({
    text: String,
    priority:String,
    progress:String
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        text: req.body.text,
        priority: req.body.priority,
        progress: req.body.progress
    });
    await newTodo.save();
    res.json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Task updated", todo: updatedTodo });
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/todos`);
});

module.exports = app;
