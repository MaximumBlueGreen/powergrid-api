const express = require("express");
const router = express.Router();

module.exports = function (knex) {
	router.post("/", (req, res) => {
		knex("t_clues")
			.insert(req.body)
			.then(() => res.sendStatus(200));
	});

	router.get("/:id", (req, res) => {
		knex("t_clues")
			.where({ id: req.params.id })
			.first()
			.then(clue => {
				if (clue) {
					res.json(clue);
				} else {
					res.sendStatus(404);
				}
			});
	});

	router.put("/:id", (req, res) => {
		knex("t_clues")
			.where({ id: req.params.id })
			.update(req.body)
			.then(() => res.sendStatus(200));
	});

	router.get("/", (req, res) => {
		knex("t_clues")
			.where({ entry: req.query.entry })
			.then(clues => {
				if (clues) {
					res.json(clues);
				} else {
					res.sendStatus(404);
				}
			});
	});

	return router;
};
