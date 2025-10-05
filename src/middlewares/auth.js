const httpStatusCode = require("http-status-codes");
const jwt = require("jsonwebtoken");
const ErrorRespone = require("../helpers/ErrorRespone");
const User = require("../models/user.model");
const catchAsync = require("../utils/catchError");

const isAuth = catchAsync(async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		throw new ErrorRespone(
			httpStatusCode.UNAUTHORIZED,
			"Không tìm thấy access token!",
		);
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
	let decoded;
	try {
		decoded = jwt.verify(token, accessTokenSecret);
	} catch (err) {
		throw new ErrorRespone(
			httpStatusCode.UNAUTHORIZED,
			"Access token không hợp lệ hoặc đã hết hạn!",
		);
	}

	const user = await User.findOne({ username: decoded.username });
	if (!user) {
		throw new ErrorRespone(httpStatusCode.UNAUTHORIZED, "User không tồn tại!");
	}

	req.user = user;
	next();
});

module.exports = {
	isAuth,
};
