const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();
const Puzzle = require("../models");

module.exports = function (knex) {
	router.post("/", authentication.authenticate, (req, res) => {

		const { puzzle, title, parent_id } = req.body;

		if (req.body.puzzleToCopyId) {
			knex("t_puzzles")
				.where({ id: req.body.puzzleToCopyId })
				.select("puzzle")
				.first()
				.then(({ puzzle: puzzleToCopy }) =>
					knex("t_puzzles").insert({ creator_id: req.user_id, parent_id, puzzle: puzzleToCopy, title }, ["id", "parent_id"])
				)
				.tap(([{ id, parent_id }]) => {
					return knex("t_puzzles").where({ id }).update({ parent_id: parent_id || id });
				})
				.then(([{ id }]) => res.status(201).json(({ id })));
		} else {
			knex("t_puzzles")
				.insert({ creator_id: req.user_id, parent_id, puzzle, title }, ["id", "parent_id"])
				.tap(([{ id, parent_id }]) => {
					return knex("t_puzzles").where({ id }).update({ parent_id: parent_id || id });
				})
				.then(([{ id }]) => res.status(201).json({ id }));
		}
	});

	// router.get("/:id", authentication.authenticate, (req, res) => {
	// 	knex("t_puzzles")
	// 		.leftJoin("t_puzzles_permissions", "t_puzzles_permissions.puzzle_id", "t_puzzles.id")
	// 		.where({ id: req.params.id })
	// 		.andWhere(builder =>
	// 			builder
	// 				.where("t_puzzles_permissions.user_id", req.user_id)
	// 				.orWhere( "t_puzzles.creator_id", req.user_id)
	// 		)
	// 		.first()
	// 		.then(row => {
	// 			if (!row) {
	// 				throw new Error();
	// 			}
	// 			const newPuzzle = Object.assign(JSON.parse(row.puzzle), row);
	// 			delete newPuzzle.puzzle;
	// 			return newPuzzle;
	// 		})
	// 		.then(data => res.json(data))
	// 		.catch(() => res.sendStatus(404));
	// });

	router.get("/:id", authentication.authenticate, (req, res) => {
		Puzzle.where({ id: req.params.id }).fetch({ withRelated: ["accessors", "creator"] }).then(result => res.json(result));
	});

	router.put("/:id", authentication.authenticate, (req, res) => {
		const { title, notepad, notes, puzzle } = req.body;
		knex("t_puzzles")
			.where({ id: req.params.id })
			.update({ notepad, notes, puzzle, title })
			.then(() => res.sendStatus(204));
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
					res.json(puzzle_permissions);
				} else {
					res.sendStatus(404);
				}
			});
	});

	router.post("/:id/accessors/:name", authentication.authenticate, (req, res) => {
		knex("t_users")
			.where({
				handle: req.params.name,
			})
			.orWhere({
				name: req.params.name,
			})
			.first()
			.then(user => {
				if (!user) {
					throw new Error();
				}
				return knex("t_puzzles_permissions").insert({
					permission_level: req.body.permission_level,
					puzzle_id: req.params.id,
					user_id: user.id,
				});})
			.then(() => res.sendStatus(204))
			.catch(() => res.sendStatus(400));
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
			.then(() => res.sendStatus(204));
	});

	return router;
};
