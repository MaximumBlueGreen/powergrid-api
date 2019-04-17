require("dotenv").config();
const path = require("path");

const knex = require("knex")({
	client: "pg",
	connection: process.env.DATABASE_URL,
	migrations: {
		directory: path.normalize(path.join(__dirname, "/migrations")),
		tableName: "knex_migrations",
	},
});

module.exports = {
	bookshelf: require("bookshelf")(knex).plugin("visibility"),
	knex,
};
