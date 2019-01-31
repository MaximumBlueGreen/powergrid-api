const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();

module.exports = function (knex) {
	router.post("/", authentication.authenticate, (req, res) => {
		knex("t_puzzles")
			.insert(Object.assign({ creator_id: req.user_id }, req.body))
			.then(() => res.sendStatus(200));
	});

	router.get("/:id", authentication.authenticate, (req, res) => {
		knex("t_puzzles")
			.where({ id: req.params.id })
			.first()
			.then(puzzle => {
				if (puzzle) {
					if (!req.query.format || req.query.format === "POWERGRID") {
						res.json(puzzle);
					} else {
						res.sendStatus(400);
					}
				} else {
					res.sendStatus(404);
				}
			}

			);
	});

	router.put("/:id", authentication.authenticate, (req, res) => {
		knex("t_puzzles")
			.where({ id: req.params.id })
			.update(req.body)
			.then(() => res.sendStatus(200));
	});

	router.delete("/:id", authentication.authenticate, (req, res) => {
		knex("t_puzzles")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.sendStatus(200));
	});

	router.get("/:id/accessors", authentication.authenticate, (req, res) => {
		knex("t_puzzles_permissions")
			.where({ puzzle_id: req.params.id })
			.then(puzzle_permissions => {
				if (puzzle_permissions) {
					res.json(puzzle_permissions.user_id);
				} else {
					res.sendStatus(404);
				}
			});
	});

	router.post("/:id/accessors", authentication.authenticate, (req, res) => {
		knex("t_puzzles_permissions")
			.where({ puzzle_id: req.params.id })
			.insert(req.body)
			.then(() => res.sendStatus(200));
	});

	router.put("/:id/accessors/:accessor_id", authentication.authenticate, (req, res) => {
		knex("t_puzzles_permissions")
			.where({ puzzle_id: req.params.id,
				user_id: req.params.accessor_id })
			.update(req.body)
			.then(() => res.sendStatus(201));
	});

	router.delete("/:id/accessors/:accessor_id", authentication.authenticate, (req, res) => {
		knex("t_puzzles_permissions")
			.where({ puzzle_id: req.params.id,
				user_id: req.params.accessor_id })
			.delete()
			.then(() => res.sendStatus(200));
	});

	router.delete("/:id/accessors/:accessor_id", authentication.authenticate, (req, res) => {
		knex("t_puzzles_permissions")
			.where({ puzzle_id: req.params.id,
				user_id: req.params.accessor_id })
			.delete()
			.then(() => res.sendStatus(200));
	});

	return router;
};
