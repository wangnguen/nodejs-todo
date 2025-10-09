module.exports = {
	testEnvironment: "node",
	coveragePathIgnorePatterns: ["/node_modules/"],
	moduleFileExtensions: ["js", "json"],
	testMatch: ["**/tests/**/*.js", "**/?(*.)+(spec|test).js"],
	verbose: true,
	clearMocks: true,
};
