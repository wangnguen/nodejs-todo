const mongoose = require("mongoose");

var taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const Task = mongoose.model("Task", taskSchema, "tasks");

module.exports = Task;
