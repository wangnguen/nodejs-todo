const express = require("express");
const {
	getAllTasks,
	getTaskById,
	postCreateTask,
	patchUpdateTask,
	deleteTask,
} = require("../controllers/task.controller");
const catchError = require("../utils/catchError");
const router = express.Router();

router.get("/", catchError(getAllTasks));

router.get("/:id", catchError(getTaskById));

router.post("/create", catchError(postCreateTask));

router.patch("/update", catchError(patchUpdateTask));

router.delete("/delete/:id", catchError(deleteTask));

module.exports = router;
