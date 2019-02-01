const express = require("express");
const { authenticate, generate } = require("../middleware/authentication");
const { encrypt, validate } = require("../middleware/encryption");
const router = express.Router();

module.exports = function (knex) {
	router.get("/me", authenticate, (req, res) => {
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

	router.post("/", (req, res) => {
		encrypt(req.body.password)
			.then(({ hash, salt }) =>
				knex("t_users")
					.insert({
						email: req.body.email,
						handle: req.body.handle,
						name: req.body.name,
						password: hash,
						salt,
					})
			)
			.then(() => res.sendStatus(201))
			.catch(() => res.sendStatus(500));
	});

	router.post("/me/authenticationToken", (req, res) => {
		knex("t_users")
			.where({
				email: req.body.email,
			})
			.first()
			.tap(user => validate(req.body.password, user.salt, user.password))
			.then(user => {
				res.json({
					token: generate({ id: user.id }),
				});
			})
			.catch(() => res.sendStatus(404));
	});

	return router;
};
