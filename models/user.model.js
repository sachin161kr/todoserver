const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    todos: [
      {
        title: String,
        desc: String,
      },
    ],
  },
  { collection: "userData" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
