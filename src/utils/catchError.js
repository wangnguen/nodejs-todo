module.exports = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync = (fn) => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (error) {
		next(error);
	}
};
