const { StatusCodes } = require("http-status-codes");
const Task = require("../models/Task");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId }).sort("-updatedAt");
  res
    .status(StatusCodes.OK)
    .json({ tasks, count: tasks.length, status: StatusCodes.OK });
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findById({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task found with id: ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task, status: StatusCodes.OK });
};
const createTask = async (req, res) => {
  req.body.userId = req.user.userId;
  console.log(req.body);
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task, status: StatusCodes.CREATED });
};

const updateTask = async (req, res) => {
  const {
    body: { title, status, desc, dueDate },
    user: { userId },
    params: { id: taskId },
  } = req;

  if (title === "" || status === "" || dueDate === "" || desc === "") {
    throw new BadRequestError(" task fields cannot be empty");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    throw new NotFoundError(`No updatedTask found with id: ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ updatedTask, status: StatusCodes.OK });
};

const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findByIdAndRemove({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task found with id: ${taskId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Deleted succesfully", status: StatusCodes.OK });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
