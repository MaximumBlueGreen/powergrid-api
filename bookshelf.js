const knex = require("knex")(require("./knexfile"));

module.exports = 	require("bookshelf")(knex).plugin("visibility");
