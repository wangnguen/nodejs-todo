const mongoose = require("mongoose");

const {
	db: { host, port, name, userDb, passDb },
} = require("../configs/config.mongodb");

const connectStringLocal = `mongodb://${host}:${port}/${name}`;

const connectStringAtlas = `mongodb+srv://${userDb}:${passDb}/${name}`;

class Database {
	constructor() {
		this.connect();
	}

	async connect() {
		try {
			await mongoose.connect(connectStringAtlas);
			console.log("DB connection successful !");
		} catch (error) {
			console.log("DB connection failed !", error);
		}
	}
	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
