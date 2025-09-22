const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data", "tasks.json");

const saveTasksToFile = async (tasks) => {
	const dataJson = JSON.stringify(tasks, null, 2);
	await fs.writeFile(filePath, dataJson, "utf8");
};

const loadTasksFromFile = async () => {
	const data = await fs.readFile(filePath, "utf8");
	return JSON.parse(data);
};

module.exports = { saveTasksToFile, loadTasksFromFile };
