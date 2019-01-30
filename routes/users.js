const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();

module.exports = function (knex) {
	router.get("/me", authentication.authenticate, (req, res) => {
		knex("t_users")
			.where({ id: req.user_id })
			.first()
			.then(user => {
				if (user) {
					res.json(user);
				} else {
					res.sendStatus(404);
				}
			});
	});

	router.post("/me", (req, res) => {
		knex("t_users")
			.insert({
				email: req.body.email,
				handle: req.body.handle,
				name: req.body.name,
			})
			.then(() => res.sendStatus(201));
	});

	router.post("/me/authenticationToken", (req, res) => {
		knex("t_users")
			.where({ email: req.body.email })
			.first()
			.then(user => {
				if (user) {
					res.json({
						token: authentication.generate({ id: user.id }),
					});
				} else {
					res.sendStatus(404);
				}
			});
	});

	return router;
};
