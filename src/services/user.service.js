const httpStatusCode = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ErrorRespone = require("../helpers/ErrorRespone");

const hashPassword = async (plainText) => {
	return await bcrypt.hash(plainText, 10);
};

const loginService = async ({ username, password }) => {
	const existUser = await User.findOne({ username });
	if (!existUser) {
		throw new ErrorRespone(httpStatusCode.NOT_FOUND, "Username không tồn tại!");
	}

	const isPasswordValid = await bcrypt.compare(password, existUser.password);
	if (!isPasswordValid) {
		throw new ErrorRespone(httpStatusCode.UNAUTHORIZED, "Mật khẩu không đúng!");
	}

	const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

	const accessToken = jwt.sign(
		{ id: existUser._id, username },
		accessTokenSecret,
		{
			algorithm: "HS256",
			expiresIn: "10m",
		},
	);

	const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

	let refreshToken = existUser.refreshToken;
	if (!refreshToken) {
		refreshToken = jwt.sign(
			{ id: existUser._id, username },
			refreshTokenSecret,
			{
				algorithm: "HS256",
				expiresIn: "30d",
			},
		);
		await User.updateOne({ _id: existUser._id }, { refreshToken });
	}

	return { accessToken, refreshToken };
};

const registerService = async ({ username, email, password }) => {
	const exisUser = await User.findOne({ username });
	if (exisUser) {
		throw new ErrorRespone(httpStatusCode.CONFLICT, "Username đã tồn tại !");
	}
	const hashedPassword = await hashPassword(password);

	const newUser = await User({
		username,
		email,
		password: hashedPassword,
	});
	await newUser.save();
	return newUser;
};

const refreshTokenService = async (refreshToken) => {
	if (!refreshToken)
		throw new ErrorRespone(
			httpStatusCode.UNAUTHORIZED,
			"RefreshToken không tồn tại !",
		);

	// Verify refresh token
	const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	const username = decoded.username;

	const user = await User.findOne({ username, refreshToken });
	if (!user)
		throw new ErrorRespone(
			httpStatusCode.FORBIDDEN,
			"RefreshToken không tồn tại !",
		);

	// Tạo access token mới
	const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "10m",
	});

	return accessToken;
};

const logoutService = async (user) => {
	const existUser = await User.findOne({ username: user.username });
	if (!existUser) {
		throw new ErrorRespone(httpStatusCode.UNAUTHORIZED, "User không tồn tại");
	}

	const updatedUser = await User.updateOne(
		{ _id: user._id },
		{ refreshToken: null },
	);

	return updatedUser;
};

module.exports = {
	loginService,
	registerService,
	refreshTokenService,
	loginService,
	logoutService,
};
