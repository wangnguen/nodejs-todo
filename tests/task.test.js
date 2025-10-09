// tests/task.service.test.js
const Task = require("../src/models/task.model");
const taskService = require("../src/services/task.service");

jest.mock("../src/models/task.model");

describe("Task Service", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllTasks", () => {
		it("Trả về danh sách tất cả task", async () => {
			const mockTasks = [{ _id: "1", title: "Task 1" }];
			Task.find.mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockTasks),
			});

			const result = await taskService.getAllTasks();

			expect(Task.find).toHaveBeenCalledWith({});
			expect(result).toEqual(mockTasks);
		});
	});

	describe("createTask", () => {
		it("Tạo và trả về task mới", async () => {
			const newTask = { title: "Task A" };
			const mockSaved = { _id: "123", title: "Task A" };

			Task.mockImplementation(() => ({
				save: jest.fn().mockResolvedValue(mockSaved),
			}));

			const result = await taskService.createTask(newTask);

			expect(result).toEqual(mockSaved);
		});
	});

	describe("getTaskById", () => {
		it("Trả về task theo id", async () => {
			const mockTask = { _id: "1", title: "Task 1" };
			Task.findOne.mockReturnValue({
				lean: jest.fn().mockResolvedValue(mockTask),
			});

			const result = await taskService.getTaskById("1");

			expect(Task.findOne).toHaveBeenCalledWith({ _id: "1" });
			expect(result).toEqual(mockTask);
		});
	});

	describe("updateTask", () => {
		it("Cập nhật và trả về task mới", async () => {
			const updateData = { id: "1", title: "Updated" };
			const mockUpdated = { _id: "1", title: "Updated" };

			Task.findOneAndUpdate.mockResolvedValue(mockUpdated);

			const result = await taskService.updateTask(updateData);

			expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
				{ _id: "1" },
				updateData,
				{ new: true },
			);
			expect(result).toEqual(mockUpdated);
		});
	});

	describe("deleteTask", () => {
		it("Xóa task nếu tồn tại", async () => {
			Task.findOne.mockResolvedValue({ _id: "1" });
			Task.deleteOne.mockResolvedValue({});

			const result = await taskService.deleteTask("1");

			expect(Task.findOne).toHaveBeenCalledWith({ _id: "1" });
			expect(Task.deleteOne).toHaveBeenCalledWith({ _id: "1" });
			expect(result).toBe(true);
		});

		it("Trả về false nếu task không tồn tại", async () => {
			Task.findOne.mockResolvedValue(null);

			const result = await taskService.deleteTask("999");

			expect(Task.deleteOne).not.toHaveBeenCalled();
			expect(result).toBe(false);
		});
	});
});
