
exports.seed = function(knex) {
	return knex("t_users").del()
		.then(function () {
			return knex("t_users").insert([
				{ email: "foo@foo.com", handle: "foo", name: "Foo Goo"},
			]);
		});
};
