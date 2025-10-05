const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	},
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
