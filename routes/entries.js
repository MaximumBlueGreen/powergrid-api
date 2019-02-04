const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();

module.exports = function (knex) {
	router.post("/", authentication.authenticate, (req, res) => {
		knex("t_entries")
			.insert(Object.assign({ user_id: req.user_id }, req.body))
			.then(() => res.sendStatus(200));
	});

	router.get("/:id", authentication.authenticate, (req, res) => {
		knex("t_entries")
			.where({ id: req.params.id })
			.first()
			.then(entry => {
				if (entry) {
					res.json(entry);
				} else {
					res.sendStatus(404);
				}
			});
	});

	router.put("/:id", authentication.authenticate, (req, res) => {
		knex("t_entries")
			.where({ id: req.params.id })
			.update(req.body)
			.then(() => res.sendStatus(200));
	});

	router.delete("/:id", authentication.authenticate, (req, res) => {
		knex("t_entries")
			.where({ id: req.params.id })
			.delete()
			.then(() => res.sendStatus(200));
	});

	router.get("/", authentication.authenticate, (req, res) => {
		knex("t_entries")
			.where("entry", "ilike", req.query.pattern)
			.orderby("score", "desc")
			.then(entries => {
				if (entries) {
					res.json(entries);
				} else {
					res.sendStatus(404);
				}
			});
	});

	return router;
};
