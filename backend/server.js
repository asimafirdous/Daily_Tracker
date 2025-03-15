const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/taskDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Task updated' });
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));