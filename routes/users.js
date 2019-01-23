const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();

module.exports = function (knex) {
	router.get("/me", authentication.authenticate, (req, res) => {
		const userId = req.user_id;

		knex("t_users").where({
			id: userId
		}).then(res.json.bind(res));
	});

	router.delete("/me", authentication.authenticate, (req, res) => {
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
			token: authentication.generate({id: 321})
		});
	});

	return router;
};
