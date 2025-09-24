const dev = {
	app: {
		port: process.env.DEV_APP_PORT || 3000,
	},
	db: {
		host: process.env.DEV_DB_HOST || "localhost",
		port: process.env.DEV_DB_PORT || 27017,
		userDb: process.env.DEV_DB_USER,
		passDb: process.env.DEV_DB_PASS,
		name: process.env.DEV_DB_NAME || "toDoApiDev",
	},
};

const pro = {
	app: {
		port: process.env.PRO_APP_PORT || 3052,
	},
	db: {
		host: process.env.PRO_DB_HOST || "localhost",
		port: process.env.PRO_DB_PORT || 27017,
		userDb: process.env.PRO_DB_USER,
		passDb: process.env.PRO_DB_PASS,
		name: process.env.PRO_D_NAME || "toDoApiPro",
	},
};

const config = { dev, pro };
const env = process.NODE_ENV || "dev";

module.exports = config[env];
