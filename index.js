const express = require("express");

const {
	loadTasksFromFile,
	updateTask,
	createTask,
	getTaskById,
	deleteTask,
} = require("./task");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.json("Home Page");
});

app.get("/tasks", async (req, res, next) => {
	try {
		const tasks = await loadTasksFromFile();
		res.status(200).json({ tasks });
	} catch (err) {
		next(err);
	}
});

app.get("/tasks/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const task = await getTaskById(id);
		if (task) {
			res.status(200).json({ task });
		} else {
			res.status(404).json({ message: "Không tìm thấy task !" });
		}
	} catch (err) {
		next(err);
	}
});

app.post("/tasks/create-task", async (req, res, next) => {
	try {
		const newTask = req.body;
		const created = await createTask(newTask);
		res
			.status(201)
			.json({ message: "Tạo mới task thành công !", task: created });
	} catch (err) {
		next(err);
	}
});

app.patch("/tasks/update-task", async (req, res, next) => {
	try {
		const updatedTask = req.body;
		const result = await updateTask(updatedTask);
		if (result) {
			res.status(200).json({ message: "Cập nhật task thành công !", result });
		} else {
			res.status(404).json({ message: "Không tìm thấy task !" });
		}
	} catch (err) {
		next(err);
	}
});

app.delete("/tasks/delete-task/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const ok = await deleteTask(id);
		if (ok) {
			res.status(200).json({ message: "Xóa task thành công !" });
		} else {
			res.status(404).json({ message: "Không tìm thấy task !" });
		}
	} catch (err) {
		next(err);
	}
});

app.use((err, req, res, next) => {
	console.error(err);
	const status = err.status || 500;
	res
		.status(status)
		.json({ error: { message: err.message || "Internal Server Error" } });
});

app.listen(PORT, () => {
	console.log(`Server đang chạy trên port ${PORT}`);
});
