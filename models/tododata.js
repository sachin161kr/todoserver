const mongoose = require("mongoose");

const TodoData = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: false },
    title: { type: String, require: true, unique: false },
    desc: { type: String, require: true, unique: false },
  },
  { collection: "userTodosData" }
);

const model = mongoose.model("TodoData", TodoData);

module.exports = model;
