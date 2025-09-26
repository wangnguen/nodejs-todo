"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"tasks",
			[
				{
					name: "Học Sequelize",
					description: "Tìm hiểu về migration và seed",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Viết báo cáo",
					description: "Báo cáo về project Node.js",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("tasks", null, {});
	},
};
