const mongoose = require("mongoose");
const Task = require("../models/task.model");

const seed = async () => {
	const totalRecord = await Task.countDocuments({});
	if (totalRecord > 0) {
		console.log("=========> DATA  ALREADY EXISTS");
	} else {
		await Task.insertMany([
			{
				name: "Mua rau",
				description: "Mua rau, thịt, trứng và sữa cho tuần này.",
			},
			{
				name: "Dọn phòng",
				description: "Dọn dẹp phòng, lau bàn, sắp xếp tủ quần áo.",
			},
			{
				name: "Hoàn thành bài tập",
				description: "Hoàn thành bài tập môn Toán và Lập trình.",
			},
			{
				name: "Tập thể dục",
				description: "Chạy bộ 30 phút và tập thể dục buổi sáng.",
			},
			{
				name: "Đọc sách",
				description: "Đọc ít nhất 30 trang sách kỹ năng cá nhân.",
			},
			{
				name: "Đi chợ",
				description: "Đi mua nhiều đồ",
			},
		]);
		console.log("=========> DATA INITIALIZED SUCCESSFULLY");
	}
};

module.exports = seed;
