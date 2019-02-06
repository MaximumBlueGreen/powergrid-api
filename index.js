require("dotenv").config();

const express = require("express");
const app = express();

const knex = require("knex")(require("./knexfile"));

app.listen(process.env.PORT);
app.use(express.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", require("./routes/users")(knex));
app.use("/puzzles", require("./routes/puzzles")(knex));

module.exports = { app, knex };
