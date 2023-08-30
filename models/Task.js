const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    desc: {
      type: String,
      required: [true, "Description is required."],
    },
    dueDate: {
      type: String,
      required: [true, "A due date is required."],
    },
    status: {
      type: String,
      enum: ["Completed", "In progress", "Not started"],
      default: "In progress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
