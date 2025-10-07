const rateLimit = require("express-rate-limit");

const createRateLimiter = ({
	max = 100,
	minutes = 15,
	message = "Quá nhiều yêu cầu, vui lòng thử lại sau!",
} = {}) => {
	return rateLimit({
		windowMs: minutes * 60 * 1000,
		max,
		message,
		standardHeaders: true, // Gửi header chuẩn
		legacyHeaders: false, // Tắt header cũ
	});
};

// Một số limiter có sẵn để tái dùng
const apiLimiter = createRateLimiter({
	max: 100,
	minutes: 15,
	handler: function (req, res) {
		res.status(429).send({
			status: 500,
			message: "Giới hạn 100 request / 15 phút cho toàn bộ API",
		});
	},
});

const loginLimiter = createRateLimiter({
	max: 5,
	minutes: 1,
	handler: function (req, res) {
		res.status(429).send({
			status: 500,
			message: "Đăng nhập quá nhiều lần. Vui lòng thử lại sau 1 phút!",
		});
	},
});

const registerLimiter = createRateLimiter({
	max: 10,
	minutes: 10,
	handler: function (req, res) {
		res.status(429).send({
			status: 500,
			message: "Tạo tài khoản quá nhiều lần. Vui lòng thử lại sau!",
		});
	},
});

module.exports = {
	createRateLimiter,
	apiLimiter,
	loginLimiter,
	registerLimiter,
};
