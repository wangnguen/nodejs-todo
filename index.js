const app = require("./src/app");
const db = require("./src/database/models/index");

const PORT = 3000;

(async () => {
	try {
		await db.sequelize.authenticate();
		console.log("Kết nối DB thành công !");
	} catch (error) {
		console.log("Kết nối thất bại: " + error.message);
	}
})();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
