require("dotenv").config();

const express = require("express");
const app = express();

const knex = require("knex")(require("./knexfile"));

app.listen(process.env.PORT);
app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/users", require("./routes/users")(knex));
