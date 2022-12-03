const express = require("express");
const process = require("process");
const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const User = require("./models/user.model");
const TodoData = require("./models/tododata");

app.use(cors());

app.use(express.json());

mongoose.connect(
  "mongodb+srv://vercel-admin-user:geR3PRAgOuKgAxqB@cluster0.q85uvgx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
//mongoose.connect("mongodb://localhost:27017/todolist");

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.json({
      status: "error",
      error: "Duplicate email",
    });
  } else {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.json({
      status: "ok",
    });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/addTodo", async (req, res) => {
  const todo = await TodoData.create({
    email: req.body.email,
    title: req.body.title,
    desc: req.body.desc,
  });

  res.json({
    status: "ok",
  });
});

app.get("/api/getTodos", async (req, res) => {
  const todos = await TodoData.find({
    email: req.body.email,
  });

  if (todos) {
    res.json(todos);
  } else {
    res.json({
      status: "error",
      error: "no record found",
    });
  }
});

app.post("/api/deleteTodo", async (req, res) => {
  const todo = await TodoData.findOne({
    email: req.body.email,
    title: req.body.title,
  });

  if (todo) {
    const todo = await TodoData.deleteOne({
      email: req.body.email,
      title: req.body.title,
    });

    res.json({
      status: "ok",
    });
  } else {
    res.json({
      status: "error",
      error: "No Record Found",
    });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    return res.json({
      status: "ok",
      user: true,
    });
  } else {
    return res.json({
      status: "error",
      user: false,
    });
  }
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log("Server started @ port 1337");
});
