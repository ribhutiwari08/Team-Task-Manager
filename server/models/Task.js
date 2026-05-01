// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending"
  },
  dueDate: Date,
  projectId: String
});

module.exports = mongoose.model("Task", taskSchema);