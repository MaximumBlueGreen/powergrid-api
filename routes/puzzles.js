const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();
const FileReader = require("filereader");
// const IncomingForm = require("formidable").IncomingForm;
// const form = new IncomingForm();

module.exports = function (knex) {
	router.post("/", authentication.authenticate, (req, res) => {
		knex("t_puzzles")
			.insert(Object.assign({ creator_id: req.user_id }, req.body))
			.then(() => res.sendStatus(204));
	});

	router.post("/upload", authentication.authenticate, (req, res) => {
		console.log(req);
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			const content = fileReader.result;
			const height = Buffer.from(content.slice(0x2c, 0x2c + 0x01)).readInt8(0); // .readInt8(0);
			const width = Buffer.from(content.slice(0x2d, 0x2d + 0x01)).readInt8(0);
			const puzzle = Buffer.from(content.slice(0x34, height * width + 0x34)).toString();

			knex("t_puzzles")
				.insert(Object.assign({ creator_id: req.user_id }, { size: { height, width } } ))
				.then(() => res.sendStatus(204));
		};
		fileReader.readAsBinaryString(req);
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
