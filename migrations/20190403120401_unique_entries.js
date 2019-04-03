
exports.up = function(knex) {
	return knex.schema.alterTable("t_entries", function(t) {
		t.unique(["entry", "user_id"]);
	});
};

exports.down = function(knex) {
	return knex.schema.alterTable("t_entries", function(t) {
		t.dropUnique(["entry", "user_id"]);
	});
};
