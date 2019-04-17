
require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const knex = require("knex")(require("./knexfile"));

app.listen(process.env.PORT);
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", require("./routes/users")(knex));
app.use("/puzzles", require("./routes/puzzles")(knex));
app.use("/clues", require("./routes/clues")(knex));
app.use("/entries", require("./routes/entries")(knex));


module.exports = { app, knex };
