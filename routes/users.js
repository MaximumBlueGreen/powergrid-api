const express = require("express");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authentication").authenticate;
const router = express.Router();

module.exports = function (knex) {
	router.get("/me", authorize, (req, res) => {
		const userId = req.user_id;

		knex("t_users").where({
			id: userId
		}).then(res.json.bind(res));
	});

	router.delete("/me", authorize, (req, res) => {
		const userId = req.user_id;
		knex("t_users").where({
			id: userId
		}).del().then(numRows => {
			if (numRows == 1) {
				res.send(200);
			} else {
				res.send(500);
			}
		});
	});

	router.post("/me/authenticationToken", (req, res) => {
		res.json({
			token: jwt.sign({
				id: 321
			}, "SECRETSANTA", {
				expiresIn: "24h"
			})
		});
	});

	return router;
};
