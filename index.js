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
  const title = req.body.title;
  const desc = req.body.desc;

  const todo = await TodoData.insert({
    email: req.body.email,
    todo: { title, desc },
  });

  res.json({
    status: "ok",
  });
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
