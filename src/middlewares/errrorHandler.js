module.exports = (err, req, res, next) => {
	console.error("Error caught by middleware:", err.stack);

	res.status(err.status || 500).json({
		status: err.status || 500,
		message: err.message || "Internal Server Error",
	});
};
