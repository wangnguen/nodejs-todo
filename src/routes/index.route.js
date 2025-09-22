const express = require("express");
const httpStatusCode = require("http-status-codes");
const router = express.Router();

const homeRoute = require("./home.route");
const taskRoute = require("./task.route");

router.use("/", homeRoute);
router.use("/task", taskRoute);

router.use((req, res) => {
	res.status(httpStatusCode.NOT_FOUND).json({
		message: "404 NOT FOUND",
	});
});

module.exports = router;
