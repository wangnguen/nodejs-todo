const { where } = require("sequelize");
const { task } = require("../database/models");

const getAllTasks = async () => {
	const tasks = await task.findAll();
	return tasks;
};

const createTask = async (newTask) => {
	const taskToStore = await task.create(newTask);
	return taskToStore;
};

const getTaskById = async (id) => {
	const existTask = await task.findOne({
		where: {
			id,
		},
	});
	return existTask || null;
};

const updateTask = async (data) => {
	const { id, ...updateData } = data;

	const [affectedRows] = await task.update(updateData, {
		where: { id: +id },
	});

	if (affectedRows === 0) return null;

	return await task.findByPk(id);
};

const deleteTask = async (id) => {
	const existTask = await task.findOne({
		while: {
			id: +id,
		},
	});
	if (!existTask) return false;
	await task.destroy({ where: { id: +id } });
	return true;
};

module.exports = {
	getAllTasks,
	createTask,
	getTaskById,
	updateTask,
	deleteTask,
};
