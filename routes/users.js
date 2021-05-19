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

	// {
	// 	"squares":[{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"},{"value": "A"}],
	// 	"size": {
	// 		"height": 3,
	// 		"width": 3
	// 	}
	// }

	router.get("/me/puzzles", authenticate, (req, res) => {
		knex("t_puzzles")
			.where({ creator_id: req.user_id })
			.orderBy("updated_at", "desc")
			.then(rows => rows.map(row => {
				const newPuzzle = Object.assign(JSON.parse(row.puzzle), row);
				delete newPuzzle.puzzle;
				return newPuzzle;
			}))
			.then(data => res.json(data));
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
			.then(() => res.sendStatus(204))
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
			.catch((err) => {
				//eslint-disable-next-line
				console.log(err);
				res.sendStatus(404);
			});
	});

	return router;
};
