const request = require("supertest");
const { app, knex } = require("../index");

if (process.env.NODE_ENV != "test") {
	process.exit(1);
}

beforeEach(() => knex.migrate.rollback()
	.then(() => knex.migrate.latest())
	.then(() => knex.seed.run())
);

describe("GET /users/me", function () {
	it("gets the user", function (done) {
		request(app)
			.get("/users/me")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer: foo")
			.expect(400, done);
	});
});
