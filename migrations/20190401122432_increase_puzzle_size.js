
exports.up = function(knex) {
	return knex.schema.alterTable("t_puzzles", function(t) {
		t.string("puzzle", 32768).alter();
	});
};

exports.down = function(knex) {
	return knex.schema.alterTable("t_puzzles", function(t) {
		t.string("puzzle", 2048).alter();
	});
};
