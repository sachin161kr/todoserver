const mongoose = require("mongoose");

const TodoData = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    todos: { type: Object, require: true, unique: false },
  },
  { collection: "userTodosData" }
);

const model = mongoose.model("TodoData", TodoData);

module.exports = model;
