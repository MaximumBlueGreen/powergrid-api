require("dotenv").config();
const path = require("path");

module.exports = {
	client: "pg",
	connection: { 
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	},
	migrations: {
		directory: path.normalize(path.join(__dirname, "/migrations")),
		tableName: "knex_migrations",
	},
	ssl: true,
};
