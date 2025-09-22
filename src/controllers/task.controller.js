const httpStatusCode = require("http-status-codes");

const taskService = require("../services/task.service");

const getAllTasks = async (req, res) => {
	const tasks = await taskService.getAllTasks();
	res.status(httpStatusCode.OK).json({ tasks });
};

const getTaskById = async (req, res) => {
	const { id } = req.params;
	const task = await taskService.getTaskById(id);
	if (task) {
		res.status(httpStatusCode.OK).json({ task });
	} else {
		res
			.status(httpStatusCode.NOT_FOUND)
			.json({ message: "Không tìm thấy task !" });
	}
};

const postCreateTask = async (req, res) => {
	const newTask = req.body;
	const created = await taskService.createTask(newTask);
	res
		.status(httpStatusCode.CREATED)
		.json({ message: "Tạo mới task thành công !", task: created });
};

const patchUpdateTask = async (req, res) => {
	const updatedTask = req.body;
	const result = await taskService.updateTask(updatedTask);
	if (result) {
		res
			.status(httpStatusCode.OK)
			.json({ message: "Cập nhật task thành công !", result });
	} else {
		res
			.status(httpStatusCode.NOT_FOUND)
			.json({ message: "Không tìm thấy task !" });
	}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	const ok = await taskService.deleteTask(id);
	if (ok) {
		res.status(httpStatusCode.OK).json({ message: "Xóa task thành công !" });
	} else {
		res
			.status(httpStatusCode.NOT_FOUND)
			.json({ message: "Không tìm thấy task !" });
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	postCreateTask,
	patchUpdateTask,
	deleteTask,
};
