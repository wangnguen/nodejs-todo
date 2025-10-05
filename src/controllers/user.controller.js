const httpStatusCode = require("http-status-codes");

const catchError = require("../utils/catchError");
const {
	loginService,
	registerService,
	refreshTokenService,
	logoutService,
} = require("../services/user.service");

const loginPost = catchError(async (req, res) => {
	const { username, password } = req.body;

	const { accessToken, refreshToken } = await loginService({
		username,
		password,
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: false,
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});

	return res.json({
		status: httpStatusCode.OK,
		message: "Đăng nhập thành công !",
		accessToken,
	});
});

const registerPost = catchError(async (req, res) => {
	const { username, email, password } = req.body;

	const newUser = await registerService({ username, email, password });

	return res.json({
		status: httpStatusCode.CREATED,
		message: "Đăng ký thành công !",
		user: {
			id: newUser._id,
			username: newUser.username,
			email: newUser.email,
		},
	});
});

// Refresh Token
const refreshToken = catchError(async (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	const accessToken = await refreshTokenService(refreshToken);

	res.json({
		status: httpStatusCode.OK,
		message: "Cấp access token thành công !",
		accessToken,
	});
});

const logout = catchError(async (req, res) => {
	const currentUser = req.user;
	const result = await logoutService(currentUser);

	res.clearCookie("refreshToken");

	res.json({
		status: httpStatusCode.OK,
		message: "Đăng xuất thành công !",
		data: result,
	});
});

module.exports = {
	loginPost,
	registerPost,
	refreshToken,
	logout,
};
