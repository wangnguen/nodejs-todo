const {
	loginService,
	registerService,
} = require("../src/services/user.service");
const User = require("../src/models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ErrorRespone = require("../src/helpers/ErrorRespone");

jest.mock("../src/models/user.model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

beforeEach(() => {
	jest.clearAllMocks();
});

describe("loginService", () => {
	const mockUser = {
		_id: "user123",
		username: "test",
		password: "abc123",
		refreshToken: null,
	};

	it("Không tìm thấy username ném ra not found", async () => {
		User.findOne.mockResolvedValue(null);

		await expect(
			loginService({ username: "notfound", password: "123" }),
		).rejects.toThrow(ErrorRespone);

		expect(User.findOne).toHaveBeenCalledWith({ username: "notfound" });
	});

	it("Ném ra mật khẩu nếu lỗi ", async () => {
		User.findOne.mockResolvedValue(mockUser);
		bcrypt.compare.mockResolvedValue(false);

		await expect(
			loginService({ username: "test", password: "wrongpw" }),
		).rejects.toThrow(ErrorRespone);
	});

	it("Đăng nhập thành công khi thông tin hợp lệ", async () => {
		User.findOne.mockResolvedValue(mockUser);
		bcrypt.compare.mockResolvedValue(true);
		jwt.sign
			.mockReturnValueOnce("access_token") // access token
			.mockReturnValueOnce("refresh_token"); // refresh token
		User.updateOne = jest.fn().mockResolvedValue({ acknowledged: true });

		const result = await loginService({
			username: "test",
			password: "abc123",
		});

		expect(User.findOne).toHaveBeenCalledWith({ username: "test" });
		expect(bcrypt.compare).toHaveBeenCalledWith("abc123", "abc123");
		expect(jwt.sign).toHaveBeenCalledTimes(2);
		expect(User.updateOne).toHaveBeenCalledWith(
			{ _id: "user123" },
			{ refreshToken: "refresh_token" },
		);

		expect(result).toEqual({
			accessToken: "access_token",
			refreshToken: "refresh_token",
		});
	});
});

describe("registerService", () => {
	it("Ném ra lỗi Conflict nếu username đã tồn tại", async () => {
		const mockUser = {
			username: "test",
			email: "test@gmail.com",
			password: "abc123",
		};
		User.findOne.mockResolvedValue({ username: "test" });

		await expect(registerService(mockUser)).rejects.toThrow(ErrorRespone);

		expect(User.findOne).toHaveBeenCalledWith({ username: "test" });
	});

	it("Đăng ký thành công !", async () => {
		User.findOne.mockResolvedValue(null);
		bcrypt.hash.mockResolvedValue("hashed");

		const mockSavedUser = {
			_id: "user123",
			username: "test",
			email: "test@gmail.com",
			password: "hashedPassword",
		};

		const mockSave = jest.fn().mockResolvedValue(mockSavedUser);

		User.mockImplementation(() => ({
			...mockSavedUser,
			save: mockSave,
		}));

		const result = await registerService({
			username: "test",
			email: "test@gmail.com",
			password: "abc123",
		});

		expect(User.findOne).toHaveBeenCalledWith({ username: "test" });
		expect(bcrypt.hash).toHaveBeenCalledWith("abc123", 10);
		expect(mockSave).toHaveBeenCalledTimes(1);
		expect(result).toMatchObject({
			_id: "user123",
			username: "test",
			email: "test@gmail.com",
			password: "hashedPassword",
		});
	});
});
