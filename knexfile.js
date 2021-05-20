require("dotenv").config();
const path = require("path");

module.exports = {
	client: "pg",
	connection: process.env.DATABASE_URL,
	migrations: {
		directory: path.normalize(path.join(__dirname, "/migrations")),
		tableName: "knex_migrations",
	},
};
