const { loadTasksFromFile, saveTasksToFile } = require("../models/task.model");

const getAllTasks = async () => {
	const tasks = await loadTasksFromFile();
	return tasks;
};

const createTask = async (newTask) => {
	const tasks = await loadTasksFromFile();
	const newId = +newTask.id;
	const existTask = tasks.find((task) => +task.id === newId);
	if (existTask) {
		throw new Error("Id đã tồn tại !");
	}
	const taskToStore = Object.assign({}, newTask, { id: newId });
	tasks.push(taskToStore);
	await saveTasksToFile(tasks);
	return taskToStore;
};

const getTaskById = async (id) => {
	const tasks = await loadTasksFromFile();
	const existTask = tasks.find((task) => +task.id === +id);
	return existTask || null;
};

const updateTask = async (updateTask) => {
	const tasks = await loadTasksFromFile();
	const id = +updateTask.id;
	const existTask = tasks.find((task) => +task.id === id);
	if (existTask) {
		Object.assign(existTask, Object.assign({}, updateTask, { id }));
		await saveTasksToFile(tasks);
		return existTask;
	}
	return null;
};

const deleteTask = async (id) => {
	const tasks = await loadTasksFromFile();
	const existTask = tasks.find((t) => t.id === +id);
	if (!existTask) return false;
	const newTasks = tasks.filter((t) => t.id !== +id);
	await saveTasksToFile(newTasks);
	return true;
};

module.exports = {
	getAllTasks,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
