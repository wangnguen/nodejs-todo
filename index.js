require("dotenv").config();

const app = require("./src/app");

const {
	app: { port },
} = require("./src/configs/config.mongodb");
const PORT = port || 3000;

require("./src/configs/database.mongodb");

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
