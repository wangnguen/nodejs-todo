require("dotenv").config();

const app = require("./src/app");

const {
	app: { port },
} = require("./src/configs/config.mongodb");

const seed = require("./src/configs/seed.mongodb");

const PORT = port || 3000;

require("./src/configs/database.mongodb");

seed();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
