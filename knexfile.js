require("dotenv").config();
const path = require("path");

module.exports = {
	client: "pg",
	connection: process.env.DATABASE_URL,
	ssl: true,
	migrations: {
		directory: path.normalize(path.join(__dirname, "/migrations")),
		tableName: "knex_migrations",
	},
};
