const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "db", "tasks.json");

const saveTasksToFile = async (tasks) => {
	const dataJson = JSON.stringify(tasks, null, 2);
	await fs.writeFile(filePath, dataJson, "utf8");
	// Không swallow lỗi, để lỗi propagate lên caller
};

const loadTasksFromFile = async () => {
	const data = await fs.readFile(filePath, "utf8");
	return JSON.parse(data);
	// Nếu lỗi sẽ throw lên caller
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
	const existTask = tasks.filePath((t) => t.id === +id);
	if (!existTask) return false;
	const newTasks = tasks.filter((t) => t.id !== +id);
	await saveTasksToFile(newTasks);
	return true;
};

module.exports = {
	loadTasksFromFile,
	saveTasksToFile,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
