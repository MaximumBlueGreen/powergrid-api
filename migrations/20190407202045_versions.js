
exports.up = function(knex) {
	return knex.schema.alterTable("t_puzzles", function (t) {
		t.integer("parent_id");
		t.foreign("parent_id").references("t_puzzles.id");
	});
};

exports.down = function(knex) {
	return knex.schema.alterTable("t_puzzles", function (t) {
		t.dropColumn("parent_id");
	});
};
