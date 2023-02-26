const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose
  .connect(
    "mongodb+srv://todo-list:W4OzSCC2NoetK8X5@cluster0.qiohof3.mongodb.net/devtown?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to MongoDB"))
  .catch(console.error);
const Todo = require('./models/Todo');

app.get('/todos',async(req,res)=>{
  const todo = await Todo.find();
  res.json(todo);
})

app.post('/todo/new',(req,res)=>{
  const todo = new Todo({
    text:req.body.text
  });
  todo.save();

  res.json(todo);
});

app.delete('/todo/delete/:id',async(req,res)=>{
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.get('/todo/complete/:id',async(req,res)=>{
  const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})

app.listen(3001 , () => console.log("server started on port 3001"));
