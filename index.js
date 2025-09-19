const fs = require("fs");

const filePath = "./db/users.json";

if (!filePath) {
	console.error("Lỗi đường JSON");
	process.exit(1);
}

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Lỗi khi đọc file: ", err.message);
		return;
	}
	try {
		const jsonData = JSON.parse(data);
		console.log(JSON.stringify(jsonData, null, 2));
	} catch (parseErr) {
		console.error("File không phải JSON hợp lệ!");
	}
});
