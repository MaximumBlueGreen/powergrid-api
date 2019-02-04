const request = require("supertest");
const { app, knex } = require("../index");

if (process.env.NODE_ENV != "test") {
	process.exit(1);
}

let token, token2;

beforeEach(() => knex.migrate.rollback()
	.then(() => knex.migrate.latest())
	.then(() => knex.seed.run())
	.then(() =>
		request(app)
			.post("/users/me/authenticationToken")
			.send({ email: "foo@foo.com", password: "powergrid" })
			.then(res => {
				token = res.body.token;
			})
	)
	.then(() =>
		request(app)
			.post("/users/me/authenticationToken")
			.send({ email: "bar@bar.com", password: "powergrid" })
			.then(res => {
				token2 = res.body.token;
			})
	)
);

describe("GET /users/me", function () {
	it("gets the user", function (done) {
		request(app)
			.get("/users/me")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${token}`)
			.expect(200, done);
	});
});

describe("POST /puzzles", function () {
	it("posts a new example puzzle", function (done) {
		request(app)
			.post("/puzzles")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${token}`)
			.send({ puzzle: "this is a great crossword" })
			.expect(200, done);
	});
});

describe("POST /clues", function () {
	it("posts a new example clue", function (done) {
		request(app)
			.post("/clues")
			.set("Accept", "application/json")
			.send({ clue: "this isn't null are you happy", entry: "clue" })
			.expect(200, done);
	});
});

describe("POST /entries", function () {
	it("posts a new example entry from the second user", function (done) {
		request(app)
			.post("/entries")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${token2}`)
			.send({ entry: "clue", score: 10000 })
			.expect(200, done);
	});
});
