const express = require("express");
const { loadTasksFromFile } = require("./task");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	res.json("Home Page");
});

app.listen(PORT, () => {
	console.log(`Server đang chạy trên port ${PORT}`);
});
