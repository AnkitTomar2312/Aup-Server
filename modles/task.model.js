const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  status: {
    type: String,
    enum: ['Done', 'Doing', 'ToDo'],
    default: 'ToDo',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  comments: [
    {
      type: Object,
    }
  ],
});

module.exports = mongoose.model("Task", TaskSchema);
