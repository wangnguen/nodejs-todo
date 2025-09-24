const Task = require("../models/task.model");

const getAllTasks = async () => {
	const tasks = await Task.find({}).lean();
	return tasks;
};

const createTask = async (newTask) => {
	const newRecord = new Task(newTask);
	const savedRecord = await newRecord.save();
	return savedRecord;
};

const getTaskById = async (id) => {
	const existTask = await Task.findOne({
		_id: id,
	}).lean();
	return existTask;
};

const updateTask = async (updateTask) => {
	const existTask = await Task.findOneAndUpdate(
		{ _id: updateTask.id },
		updateTask,
	);
	return existTask;
};

const deleteTask = async (id) => {
	const existTask = Task.findOne({
		_id: id,
	});
	if (!existTask) return false;
	await Task.deleteOne({ _id: id });
	return true;
};

module.exports = {
	getAllTasks,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
