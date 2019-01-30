const request = require("supertest");
const { app, knex } = require("../index");

if (process.env.NODE_ENV != "test") {
	process.exit(1);
}

let token;

beforeEach(() => knex.migrate.rollback()
	.then(() => knex.migrate.latest())
	.then(() => knex.seed.run())
	.then(() =>
		request(app)
			.post("/users/me/authenticationToken")
			.send({ email: "foo@foo.com" })
			.then(res => {
				token = res.body.token;
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
