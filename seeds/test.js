const { encrypt } = require("../middleware/encryption");

exports.seed = function(knex) {
	return knex("t_users").del()
		.then(() => encrypt("powergrid"))
		.then( ({ hash, salt }) =>
			knex("t_users").insert([
				{ email: "foo@foo.com", handle: "foo", name: "Foo Goo", password: hash, salt },
			])
		);
};
