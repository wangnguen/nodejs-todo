const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "db", "tasks.json");

const saveTasksToFile = async (tasks) => {
	try {
		const dataJson = JSON.stringify(tasks, null, 2);
		await fs.writeFile(filePath, dataJson, "utf8");
		console.log("Ghi file thành công !");
	} catch (err) {
		console.log("Lỗi không ghi được: " + err);
	}
};

const loadTasksFromFile = async () => {
	try {
		const data = await fs.readFile(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.log("Lỗi không đọc được: " + err);
		return [];
	}
};

const createTask = async (newTask) => {
	const tasks = await loadTasksFromFile();
	const existTask = tasks.find((task) => task.id === newTask.id);
	if (!existTask) {
		tasks.push(newTask);
		await saveTasksToFile(tasks);
		console.log("Tạo mới task thành công !");
	}
};

const getTaskById = async (id) => {
	const tasks = await loadTasksFromFile();
	const existTask = tasks.find((task) => task.id === id);

	if (existTask) {
		console.log(existTask);
		return existTask;
	} else {
		console.log("Không tìm thấy task !");
		return null;
	}
};

const updateTask = async (updateTask) => {
	const tasks = await loadTasksFromFile();
	const existTask = tasks.find((task) => task.id === updateTask.id);

	if (existTask) {
		Object.assign(existTask, updateTask);
		saveTasksToFile(tasks);
		console.log("Update task thành công !");
	}
};

const deleteTask = async (deleteTask) => {
	const tasks = await loadTasksFromFile();
	const newTasks = tasks.filter((task) => task.id != deleteTask.id);

	if (newTasks) {
		saveTasksToFile(newTasks);
		console.log("Xóa task thành công !");
	}
};

module.exports = {
	loadTasksFromFile,
	saveTasksToFile,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
